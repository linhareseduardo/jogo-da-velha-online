import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// Armazena as salas ativas
const rooms = new Map()
const waitingPlayers = []

io.on('connection', (socket) => {
  console.log('Jogador conectado:', socket.id)

  // Criar uma sala privada
  socket.on('create-room', (callback) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()
    rooms.set(roomId, {
      players: [socket.id],
      board: Array(9).fill(null),
      currentPlayer: 'X',
      playerX: socket.id,
      playerO: null
    })
    socket.join(roomId)
    socket.roomId = roomId
    console.log(`Sala criada: ${roomId}`)
    callback({ roomId, player: 'X' })
  })

  // Entrar em uma sala privada
  socket.on('join-room', (roomId, callback) => {
    const room = rooms.get(roomId)

    if (!room) {
      callback({ error: 'Sala não encontrada!' })
      return
    }

    if (room.players.length >= 2) {
      callback({ error: 'Sala cheia!' })
      return
    }

    room.players.push(socket.id)
    room.playerO = socket.id
    socket.join(roomId)
    socket.roomId = roomId

    console.log(`Jogador entrou na sala: ${roomId}`)

    // Notifica ambos os jogadores que o jogo pode começar
    io.to(roomId).emit('game-start', {
      playerX: room.playerX,
      playerO: room.playerO
    })

    callback({ roomId, player: 'O' })
  })

  // Buscar partida aleatória
  socket.on('find-match', (callback) => {
    // Verifica se há alguém esperando
    if (waitingPlayers.length > 0) {
      const opponent = waitingPlayers.shift()
      const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()

      rooms.set(roomId, {
        players: [opponent.id, socket.id],
        board: Array(9).fill(null),
        currentPlayer: 'X',
        playerX: opponent.id,
        playerO: socket.id
      })

      socket.join(roomId)
      opponent.join(roomId)
      socket.roomId = roomId
      opponent.roomId = roomId

      console.log(`Partida encontrada: ${roomId}`)

      // Notifica o primeiro jogador
      opponent.emit('match-found', {
        roomId,
        player: 'X',
        opponent: socket.id
      })

      // Notifica o segundo jogador
      callback({
        roomId,
        player: 'O',
        opponent: opponent.id
      })

      // Inicia o jogo para ambos
      io.to(roomId).emit('game-start', {
        playerX: opponent.id,
        playerO: socket.id
      })
    } else {
      // Adiciona à fila de espera
      waitingPlayers.push(socket)
      socket.waiting = true
      console.log('Jogador adicionado à fila de espera')
      callback({ waiting: true })
    }
  })

  // Cancelar busca
  socket.on('cancel-search', () => {
    const index = waitingPlayers.findIndex(p => p.id === socket.id)
    if (index !== -1) {
      waitingPlayers.splice(index, 1)
      socket.waiting = false
      console.log('Busca cancelada')
    }
  })

  // Fazer uma jogada
  socket.on('make-move', ({ roomId, index, player }) => {
    const room = rooms.get(roomId)

    if (!room) return

    // Verifica se é o turno do jogador
    const isPlayerTurn = (room.currentPlayer === 'X' && socket.id === room.playerX) ||
                         (room.currentPlayer === 'O' && socket.id === room.playerO)

    if (!isPlayerTurn || room.board[index]) return

    room.board[index] = player
    room.currentPlayer = room.currentPlayer === 'X' ? 'O' : 'X'

    // Envia a atualização para ambos os jogadores
    io.to(roomId).emit('board-update', {
      board: room.board,
      currentPlayer: room.currentPlayer
    })
  })

  // Resetar o jogo
  socket.on('reset-game', (roomId) => {
    const room = rooms.get(roomId)
    if (!room) return

    room.board = Array(9).fill(null)
    room.currentPlayer = 'X'

    io.to(roomId).emit('game-reset', {
      board: room.board,
      currentPlayer: room.currentPlayer
    })
  })

  // Desconexão
  socket.on('disconnect', () => {
    console.log('Jogador desconectado:', socket.id)

    // Remove da fila de espera
    const waitingIndex = waitingPlayers.findIndex(p => p.id === socket.id)
    if (waitingIndex !== -1) {
      waitingPlayers.splice(waitingIndex, 1)
    }

    // Notifica o oponente se estava em uma sala
    if (socket.roomId) {
      socket.to(socket.roomId).emit('opponent-disconnected')

      // Remove a sala se ambos os jogadores saíram
      const room = rooms.get(socket.roomId)
      if (room) {
        room.players = room.players.filter(id => id !== socket.id)
        if (room.players.length === 0) {
          rooms.delete(socket.roomId)
          console.log(`Sala removida: ${socket.roomId}`)
        }
      }
    }
  })
})

const PORT = process.env.PORT || 3001

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
  })
}

// Exporta para Vercel
export default httpServer

