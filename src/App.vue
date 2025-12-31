<template>
  <div class="game-container">
    <div class="game-card">
      <h1>🎮 Jogo da Velha</h1>
      <p class="subtitle">
        {{ gameMode === 'ai' ? 'Enfrente a IA Imbatível!' :
           gameMode === 'player' ? 'Jogue com um Amigo!' :
           'Jogue Online!' }}
      </p>

      <div class="game-mode">
        <label>Modo de Jogo:</label>
        <div class="mode-buttons">
          <button
            @click="setGameMode('ai')"
            :class="{ active: gameMode === 'ai' }"
            class="mode-btn"
          >
            🤖 Contra IA
          </button>
          <button
            @click="setGameMode('player')"
            :class="{ active: gameMode === 'player' }"
            class="mode-btn"
          >
            👥 Local
          </button>
          <button
            @click="setGameMode('online-random')"
            :class="{ active: gameMode === 'online-random' }"
            class="mode-btn"
          >
            🌐 Online (Aleatório)
          </button>
          <button
            @click="setGameMode('online-private')"
            :class="{ active: gameMode === 'online-private' }"
            class="mode-btn"
          >
            🔒 Sala Privada
          </button>
        </div>
      </div>

      <!-- Online Game Interface -->
      <div v-if="gameMode.startsWith('online')" class="online-section">
        <!-- Waiting for match -->
        <div v-if="onlineState === 'searching'" class="searching">
          <div class="spinner"></div>
          <p>🔍 Procurando adversário...</p>
          <button @click="cancelSearch" class="cancel-btn">Cancelar</button>
        </div>

        <!-- Create or Join Room -->
        <div v-else-if="onlineState === 'menu' && gameMode === 'online-private'" class="room-menu">
          <button @click="createRoom" class="online-action-btn">
            ➕ Criar Sala
          </button>
          <div class="join-room">
            <input
              v-model="roomIdInput"
              placeholder="Código da Sala"
              maxlength="6"
              @input="roomIdInput = roomIdInput.toUpperCase()"
              class="room-input"
            />
            <button @click="joinRoom" class="online-action-btn">
              ↪️ Entrar
            </button>
          </div>
        </div>

        <!-- Room Created - Waiting for opponent -->
        <div v-else-if="onlineState === 'waiting-opponent'" class="waiting-room">
          <p class="room-code">Código da Sala: <strong>{{ roomId }}</strong></p>
          <p class="share-message">📋 Compartilhe este código com seu amigo!</p>
          <button @click="copyRoomCode" class="copy-btn">📄 Copiar Código</button>
          <p class="waiting-text">⏳ Aguardando o adversário...</p>
          <button @click="cancelRoom" class="cancel-btn">Cancelar</button>
        </div>

        <!-- Connected Info -->
        <div v-else-if="onlineState === 'playing'" class="online-info">
          <p class="connection-status">🟢 Conectado</p>
          <p class="player-role">
            Você é: <strong :style="{ color: mySymbol === 'X' ? '#d32f2f' : '#2e7d32' }">{{ mySymbol }}</strong>
          </p>
          <p v-if="roomId" class="room-id-display">Sala: {{ roomId }}</p>
        </div>

        <!-- Disconnected -->
        <div v-else-if="onlineState === 'disconnected'" class="disconnected">
          <p>❌ Oponente desconectado</p>
          <button @click="backToMenu" class="back-btn">Voltar ao Menu</button>
        </div>
      </div>

      <div class="status">
        <div v-if="winner" class="winner-message" :class="{ 'winner-x': winner === 'X', 'winner-o': winner === 'O', 'winner-draw': winner === 'draw' }">
          <span v-if="winner === 'draw'">🤝 Empate!</span>
          <span v-else-if="winner === 'X' && gameMode === 'ai'">🎉 Você Venceu!</span>
          <span v-else-if="winner === 'O' && gameMode === 'ai'">🤖 IA Venceu!</span>
          <span v-else-if="winner === 'X' && gameMode === 'player'">🎉 Jogador 1 (X) Venceu!</span>
          <span v-else-if="winner === 'O' && gameMode === 'player'">🎉 Jogador 2 (O) Venceu!</span>
          <span v-else-if="gameMode.startsWith('online')">
            {{ winner === mySymbol ? '🎉 Você Venceu!' : '😢 Você Perdeu!' }}
          </span>
        </div>
        <div v-else class="turn-indicator">
          <span>
            {{ gameMode === 'ai' ? '👤 Você (X)' :
               gameMode === 'player' ? '👤 Jogador 1 (X)' :
               mySymbol === 'X' ? '👤 Você (X)' : '🌐 Oponente (X)' }}
          </span>
          <span class="vs">VS</span>
          <span>
            {{ gameMode === 'ai' ? '🤖 IA (O)' :
               gameMode === 'player' ? '👤 Jogador 2 (O)' :
               mySymbol === 'O' ? '👤 Você (O)' : '🌐 Oponente (O)' }}
          </span>
        </div>
      </div>

      <div class="board">
        <div
          v-for="(cell, index) in board"
          :key="index"
          class="cell"
          :class="{
            disabled: cell || winner ||
                      (gameMode === 'ai' && currentPlayer === 'O') ||
                      (gameMode.startsWith('online') && (currentPlayer !== mySymbol || onlineState !== 'playing'))
          }"
          @click="handleClick(index)"
        >
          <span v-if="cell" class="cell-content" :class="cell">
            {{ cell }}
          </span>
        </div>
      </div>

      <div class="difficulty">
        <label>Dificuldade da IA:</label>
        <div class="difficulty-buttons">
          <button
            @click="setDifficulty('easy')"
            :class="{ active: difficulty === 'easy' }"
            class="difficulty-btn"
          >
            Fácil
          </button>
          <button
            @click="setDifficulty('medium')"
            :class="{ active: difficulty === 'medium' }"
            class="difficulty-btn"
          >
            Médio
          </button>
          <button
            @click="setDifficulty('hard')"
            :class="{ active: difficulty === 'hard' }"
            class="difficulty-btn"
          >
            Difícil
          </button>
          <button
            @click="setDifficulty('impossible')"
            :class="{ active: difficulty === 'impossible' }"
            class="difficulty-btn"
          >
            Impossível
          </button>
        </div>
      </div>

      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">Vitórias</span>
          <span class="stat-value">{{ stats.player }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Empates</span>
          <span class="stat-value">{{ stats.draws }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Derrotas</span>
          <span class="stat-value">{{ stats.ai }}</span>
        </div>
      </div>

      <div class="buttons">
        <button @click="resetGame" class="reset-btn">
          🔄 Novo Jogo
        </button>
        <button @click="resetStats" class="reset-stats-btn">
          📊 Resetar Estatísticas
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { io } from 'socket.io-client'

const board = ref(Array(9).fill(null))
const currentPlayer = ref('X')
const winner = ref(null)
const winningLine = ref(null)
const difficulty = ref('impossible')
const gameMode = ref('ai')

// Online game state
const socket = ref(null)
const onlineState = ref('menu') // menu, searching, waiting-opponent, playing, disconnected
const roomId = ref(null)
const roomIdInput = ref('')
const mySymbol = ref(null)

const stats = reactive({
  player: 0,
  ai: 0,
  draws: 0
})

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
  [0, 4, 8], [2, 4, 6]             // diagonais
]

function checkWinner(currentBoard) {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo
    if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
      winningLine.value = combo
      return currentBoard[a]
    }
  }
  return currentBoard.every(cell => cell) ? 'draw' : null
}

// Algoritmo Minimax - IA Impossível de vencer
function minimax(currentBoard, depth, isMaximizing, alpha = -Infinity, beta = Infinity) {
  const result = checkWinner(currentBoard)

  if (result === 'O') return 10 - depth
  if (result === 'X') return depth - 10
  if (result === 'draw') return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        currentBoard[i] = 'O'
        const score = minimax(currentBoard, depth + 1, false, alpha, beta)
        currentBoard[i] = null
        bestScore = Math.max(score, bestScore)
        alpha = Math.max(alpha, score)
        if (beta <= alpha) break // Poda alpha-beta
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        currentBoard[i] = 'X'
        const score = minimax(currentBoard, depth + 1, true, alpha, beta)
        currentBoard[i] = null
        bestScore = Math.min(score, bestScore)
        beta = Math.min(beta, score)
        if (beta <= alpha) break // Poda alpha-beta
      }
    }
    return bestScore
  }
}

function getBestMove() {
  const emptyIndices = board.value.map((cell, i) => cell === null ? i : null).filter(i => i !== null)

  // Dificuldade impossível - Minimax puro
  if (difficulty.value === 'impossible') {
    let bestScore = -Infinity
    let bestMove = null

    for (let i of emptyIndices) {
      board.value[i] = 'O'
      const score = minimax([...board.value], 0, false)
      board.value[i] = null

      if (score > bestScore) {
        bestScore = score
        bestMove = i
      }
    }
    return bestMove
  }

  // Dificuldade difícil - 80% minimax, 20% aleatório
  if (difficulty.value === 'hard') {
    if (Math.random() < 0.8) {
      let bestScore = -Infinity
      let bestMove = null

      for (let i of emptyIndices) {
        board.value[i] = 'O'
        const score = minimax([...board.value], 0, false)
        board.value[i] = null

        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      }
      return bestMove
    }
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
  }

  // Dificuldade média - joga estratégico mas com erros
  if (difficulty.value === 'medium') {
    // Tenta ganhar
    for (let i of emptyIndices) {
      board.value[i] = 'O'
      if (checkWinner(board.value) === 'O') {
        board.value[i] = null
        return i
      }
      board.value[i] = null
    }

    // Tenta bloquear (70% das vezes)
    if (Math.random() < 0.7) {
      for (let i of emptyIndices) {
        board.value[i] = 'X'
        if (checkWinner(board.value) === 'X') {
          board.value[i] = null
          return i
        }
        board.value[i] = null
      }
    }

    // Centro ou aleatório
    if (board.value[4] === null && Math.random() < 0.5) return 4
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
  }

  // Dificuldade fácil - joga aleatório
  if (difficulty.value === 'easy') {
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
  }
}

function handleClick(index) {
  if (board.value[index] || winner.value) return

  // No modo IA, bloqueia jogadas quando é turno da IA
  if (gameMode.value === 'ai' && currentPlayer.value === 'O') return

  // No modo online, bloqueia se não for sua vez ou não estiver conectado
  if (gameMode.value.startsWith('online')) {
    if (onlineState.value !== 'playing' || currentPlayer.value !== mySymbol.value) return

    // Envia a jogada para o servidor
    socket.value.emit('make-move', {
      roomId: roomId.value,
      index,
      player: mySymbol.value
    })
    return
  }

  board.value[index] = currentPlayer.value
  const result = checkWinner(board.value)

  if (result) {
    winner.value = result
    updateStats(result)
    return
  }

  // Modo contra IA
  if (gameMode.value === 'ai') {
    currentPlayer.value = 'O'

    setTimeout(() => {
      const aiMove = getBestMove()
      if (aiMove !== null) {
        board.value[aiMove] = 'O'
        const aiResult = checkWinner(board.value)
        if (aiResult) {
          winner.value = aiResult
          updateStats(aiResult)
        } else {
          currentPlayer.value = 'X'
        }
      }
    }, 500)
  } else {
    // Modo dois jogadores
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }
}

function updateStats(result) {
  if (result === 'X') stats.player++
  else if (result === 'O') stats.ai++
  else if (result === 'draw') stats.draws++
}

function resetGame() {
  board.value = Array(9).fill(null)
  currentPlayer.value = 'X'
  winner.value = null
  winningLine.value = null
}

function setDifficulty(level) {
  difficulty.value = level
  resetGame()
}

function setGameMode(mode) {
  gameMode.value = mode
  resetGame()

  // Conecta ao servidor quando entra no modo online
  if (mode.startsWith('online')) {
    connectToServer()
    if (mode === 'online-random') {
      findRandomMatch()
    }
  } else {
    disconnectFromServer()
  }
}

function resetStats() {
  stats.player = 0
  stats.ai = 0
  stats.draws = 0
  resetGame()
}

// ========== ONLINE FUNCTIONS ==========

function connectToServer() {
  if (socket.value?.connected) return

  // Detecta se está em produção (Vercel) ou desenvolvimento (localhost)
  const serverUrl = import.meta.env.PROD
    ? window.location.origin  // Em produção, usa a mesma URL do site
    : 'http://localhost:3001' // Em desenvolvimento, usa localhost:3001

  socket.value = io(serverUrl)

  socket.value.on('connect', () => {
    console.log('Conectado ao servidor')
  })

  socket.value.on('match-found', ({ roomId: rid, player }) => {
    roomId.value = rid
    mySymbol.value = player
    onlineState.value = 'playing'
  })

  socket.value.on('game-start', () => {
    onlineState.value = 'playing'
    resetGame()
  })

  socket.value.on('board-update', ({ board: newBoard, currentPlayer: newPlayer }) => {
    board.value = newBoard
    currentPlayer.value = newPlayer

    const result = checkWinner(board.value)
    if (result) {
      winner.value = result
      updateStats(result)
    }
  })

  socket.value.on('game-reset', ({ board: newBoard, currentPlayer: newPlayer }) => {
    board.value = newBoard
    currentPlayer.value = newPlayer
    winner.value = null
    winningLine.value = null
  })

  socket.value.on('opponent-disconnected', () => {
    onlineState.value = 'disconnected'
  })
}

function disconnectFromServer() {
  if (socket.value?.connected) {
    socket.value.disconnect()
    socket.value = null
  }
  onlineState.value = 'menu'
  roomId.value = null
  mySymbol.value = null
}

function findRandomMatch() {
  onlineState.value = 'searching'
  socket.value.emit('find-match', (response) => {
    if (response.waiting) {
      // Aguardando adversário
    } else if (response.roomId) {
      roomId.value = response.roomId
      mySymbol.value = response.player
    }
  })
}

function cancelSearch() {
  socket.value.emit('cancel-search')
  onlineState.value = 'menu'
}

function createRoom() {
  socket.value.emit('create-room', (response) => {
    roomId.value = response.roomId
    mySymbol.value = response.player
    onlineState.value = 'waiting-opponent'
  })
}

function joinRoom() {
  if (!roomIdInput.value) return

  socket.value.emit('join-room', roomIdInput.value, (response) => {
    if (response.error) {
      alert(response.error)
      return
    }
    roomId.value = response.roomId
    mySymbol.value = response.player
  })
}

function copyRoomCode() {
  navigator.clipboard.writeText(roomId.value)
  alert('Código copiado!')
}

function cancelRoom() {
  disconnectFromServer()
  connectToServer()
}

function backToMenu() {
  onlineState.value = 'menu'
  roomId.value = null
  resetGame()
}

// Limpa conexão ao desmontar o componente
onUnmounted(() => {
  disconnectFromServer()
})

</script>

<style scoped>
.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e8ba3 100%);
}

.game-card {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  border: 3px solid #1976d2;
}

h1 {
  color: #0d47a1;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.subtitle {
  text-align: center;
  color: #1565c0;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.status {
  min-height: 60px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.winner-message {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1976d2;
}

.winner-message.winner-x {
  color: #1976d2;
  text-shadow: 0 0 20px rgba(25, 118, 210, 0.5);
}

.winner-message.winner-o {
  color: #2e7d32;
  text-shadow: 0 0 20px rgba(46, 125, 50, 0.5);
}

.winner-message.winner-draw {
  color: #616161;
}

.turn-indicator {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.1rem;
  color: #1565c0;
}

.turn-indicator span {
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.vs {
  font-weight: bold;
  color: #64b5f6;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 2rem;
  aspect-ratio: 1;
}

.cell {
  aspect-ratio: 1;
  background: linear-gradient(135deg, #90caf9 0%, #64b5f6 100%);
  border: 3px solid #1976d2;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cell:hover:not(.disabled) {
  background: linear-gradient(135deg, #42a5f5 0%, #1976d2 100%);
  box-shadow: 0 5px 15px rgba(25, 118, 210, 0.4);
}

.cell.disabled {
  cursor: not-allowed;
}


.cell-content.X {
  color: #d32f2f;
}

.cell-content.O {
  color: #2e7d32;
}

.game-mode {
  margin-bottom: 1.5rem;
}

.game-mode label {
  display: block;
  font-size: 1rem;
  color: #0d47a1;
  font-weight: 600;
  margin-bottom: 0.8rem;
  text-align: center;
}

.mode-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

.mode-btn {
  padding: 12px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  border: 2px solid #1976d2;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #0d47a1;
}

.mode-btn:hover {
  background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
  box-shadow: 0 3px 10px rgba(25, 118, 210, 0.3);
}

.mode-btn.active {
  background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
  color: white;
  border-color: #0d47a1;
}

.difficulty {
  margin-bottom: 1.5rem;
}

.difficulty label {
  display: block;
  font-size: 1rem;
  color: #0d47a1;
  font-weight: 600;
  margin-bottom: 0.8rem;
  text-align: center;
}

.difficulty-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

.difficulty-btn {
  padding: 12px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  border: 2px solid #1976d2;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #0d47a1;
}

.difficulty-btn:hover {
  background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
  box-shadow: 0 3px 10px rgba(25, 118, 210, 0.3);
}

.difficulty-btn.active {
  background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
  color: white;
  border-color: #0d47a1;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
  border-radius: 12px;
  border: 2px solid #1976d2;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #0d47a1;
  font-weight: 600;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1565c0;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.reset-btn, .reset-stats-btn {
  flex: 1;
  padding: 14px 24px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.reset-btn {
  background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
  color: white;
}

.reset-btn:hover {
  background: linear-gradient(135deg, #1565c0 0%, #0a3d91 100%);
  box-shadow: 0 5px 15px rgba(25, 118, 210, 0.4);
}

.reset-stats-btn {
  background: linear-gradient(135deg, #42a5f5 0%, #1976d2 100%);
  color: white;
}

.reset-stats-btn:hover {
  background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
  box-shadow: 0 5px 15px rgba(66, 165, 245, 0.4);
}

.reset-stats-btn:hover {
  background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
  box-shadow: 0 5px 15px rgba(66, 165, 245, 0.4);
}

/* Online Game Styles */
.online-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 12px;
  border: 2px solid #1976d2;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.searching {
  text-align: center;
}

.spinner {
  border: 4px solid #bbdefb;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.room-menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.join-room {
  display: flex;
  gap: 0.5rem;
}

.room-input {
  flex: 1;
  padding: 10px;
  border: 2px solid #1976d2;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  background: white;
  color: #0d47a1;
}

.room-input:focus {
  outline: none;
  border-color: #0d47a1;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
}

.online-action-btn {
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
  color: white;
  transition: all 0.3s;
}

.online-action-btn:hover {
  background: linear-gradient(135deg, #1565c0 0%, #0a3d91 100%);
  box-shadow: 0 3px 10px rgba(25, 118, 210, 0.4);
}

.waiting-room {
  text-align: center;
  width: 100%;
}

.room-code {
  font-size: 1.2rem;
  color: #0d47a1;
  margin-bottom: 0.5rem;
}

.room-code strong {
  font-size: 1.5rem;
  color: #1976d2;
  letter-spacing: 2px;
}

.share-message {
  color: #1565c0;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.copy-btn {
  padding: 8px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 2px solid #1976d2;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  color: #1976d2;
  margin-bottom: 1rem;
  transition: all 0.3s;
}

.copy-btn:hover {
  background: #1976d2;
  color: white;
}

.waiting-text {
  color: #1565c0;
  margin-bottom: 1rem;
}

.cancel-btn, .back-btn {
  padding: 8px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 2px solid #d32f2f;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  color: #d32f2f;
  transition: all 0.3s;
}

.cancel-btn:hover, .back-btn:hover {
  background: #d32f2f;
  color: white;
}

.online-info {
  text-align: center;
  width: 100%;
}

.connection-status {
  font-size: 1rem;
  color: #2e7d32;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.player-role {
  font-size: 1.1rem;
  color: #0d47a1;
}

.room-id-display {
  font-size: 0.9rem;
  color: #1565c0;
  margin-top: 0.5rem;
}

.disconnected {
  text-align: center;
  width: 100%;
}

.disconnected p {
  font-size: 1.2rem;
  color: #d32f2f;
  font-weight: 600;
  margin-bottom: 1rem;
}

@media (max-width: 480px) {
  .game-card {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .cell {
    font-size: 2rem;
  }

  .buttons {
    flex-direction: column;
  }

  .difficulty-buttons {
    grid-template-columns: 1fr;
  }

  .mode-buttons {
    grid-template-columns: 1fr;
  }

  .join-room {
    flex-direction: column;
  }
}
</style>

