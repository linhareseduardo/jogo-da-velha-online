# 🎮 Jogo da Velha com IA Inteligente

Um jogo da velha completo desenvolvido em Vue 3 com uma IA imbatível usando o algoritmo Minimax!

## 🚀 Características

### IA Inteligente
- **Algoritmo Minimax**: A IA analisa todas as jogadas possíveis
- **Poda Alpha-Beta**: Otimização para performance
- **3 Níveis de Dificuldade**:
  - **Impossível**: IA imbatível usando Minimax puro
  - **Difícil**: 80% estratégico, 20% aleatório
  - **Médio**: Joga bem mas comete erros

### Interface
- Design moderno e responsivo
- Animações suaves
- Indicador visual de vitória
- Sistema de estatísticas
- Feedback visual de turno

### Funcionalidades
- ✅ Jogue contra a IA
- ✅ Escolha o nível de dificuldade
- ✅ Acompanhe suas estatísticas (vitórias, empates, derrotas)
- ✅ Reset de jogo e estatísticas
- ✅ Animações e efeitos visuais

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🎯 Como Jogar

1. Você joga com "X" e sempre começa
2. A IA joga com "O"
3. Clique em uma célula vazia para fazer sua jogada
4. Vença fazendo 3 em linha (horizontal, vertical ou diagonal)
5. Desafie-se nos diferentes níveis de dificuldade!

## 🧠 Sobre o Algoritmo Minimax

O algoritmo Minimax é uma técnica de decisão usada em jogos de dois jogadores. Ele:

1. Simula todas as jogadas possíveis até o fim do jogo
2. Avalia cada resultado (vitória = +10, derrota = -10, empate = 0)
3. Escolhe a jogada que maximiza suas chances de vitória
4. Usa poda alpha-beta para otimizar a busca

Resultado: Uma IA **IMBATÍVEL** no modo Impossível!

## 🛠️ Tecnologias

- Vue 3 (Composition API)
- Vite
- CSS3 com animações

## 📄 Licença

MIT - Sinta-se livre para usar e modificar!

