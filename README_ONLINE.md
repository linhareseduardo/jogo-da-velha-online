# Jogo da Velha Online - Instruções

## 📋 O que foi implementado

Agora o jogo possui **3 modos completos**:

1. **🤖 Contra IA** - Jogue contra uma inteligência artificial com 4 níveis de dificuldade
2. **👥 Local** - Dois jogadores na mesma máquina
3. **🌐 Online** - Jogue contra outro jogador em computadores diferentes

### Modos Online

#### 🌐 Online (Aleatório)
- Encontra automaticamente um oponente disponível
- Sistema de matchmaking automático
- Ideal para jogar rapidamente

#### 🔒 Sala Privada
- Crie uma sala e compartilhe o código com um amigo
- Código de 6 caracteres único
- Apenas quem tem o código pode entrar

## 🚀 Como rodar

### 1. Instalar dependências (se ainda não instalou)
```bash
npm install
```

### 2. Iniciar o servidor backend
Em um terminal, execute:
```bash
npm run server
```

O servidor estará rodando na porta 3001.

### 3. Iniciar o frontend
Em OUTRO terminal, execute:
```bash
npm run dev
```

O jogo estará disponível em `http://localhost:5173`

### 4. Ou iniciar tudo de uma vez
```bash
npm run dev:all
```

Este comando inicia o servidor e o frontend simultaneamente.

## 🎮 Como jogar online

### Partida Aleatória
1. Selecione "🌐 Online (Aleatório)"
2. Aguarde encontrar um oponente
3. Quando encontrado, o jogo começa automaticamente!

### Sala Privada
1. Selecione "🔒 Sala Privada"
2. **Criar sala:**
   - Clique em "➕ Criar Sala"
   - Copie o código gerado
   - Compartilhe com seu amigo
3. **Entrar em sala:**
   - Digite o código da sala
   - Clique em "↪️ Entrar"
4. Quando ambos estiverem conectados, o jogo começa!

## 🎨 Cores

- **X (Jogador 1)** - Vermelho
- **O (Jogador 2/IA)** - Azul
- **Vitória Jogador X** - Destaque Azul
- **Vitória Jogador O** - Destaque Vermelho
- **Interface** - Tons de azul

## 🔧 Tecnologias

- **Frontend:** Vue 3 + Vite
- **Backend:** Node.js + Express + Socket.IO
- **Comunicação:** WebSockets (tempo real)

## 📝 Notas

- Para jogar online, **ambos os jogadores precisam estar conectados ao mesmo servidor**
- Em desenvolvimento local, funciona perfeitamente
- Para deploy em produção, ajuste a URL do servidor em `App.vue` (linha do `io('http://localhost:3001')`)

