# 🎮 Jogo da Velha Online

Um jogo da velha completo com **3 modos de jogo**: contra IA, local, e **multiplayer online em tempo real**!

![Vue.js](https://img.shields.io/badge/vue.js-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## ✨ Características

### 🤖 Modo Contra IA
- 4 níveis de dificuldade (Fácil, Médio, Difícil, Impossível)
- IA usando algoritmo **Minimax** no nível impossível
- IA adaptativa nos outros níveis

### 👥 Modo Local
- Dois jogadores na mesma máquina
- Perfeito para jogar com amigos pessoalmente

### 🌐 Modo Online
- **Matchmaking aleatório**: Encontre oponentes automaticamente
- **Salas privadas**: Crie códigos únicos e jogue com amigos específicos
- Comunicação em **tempo real** via WebSockets
- Sincronização instantânea de jogadas

### 🎨 Design
- Interface moderna em tons de azul
- X em vermelho, O em azul
- Animações suaves e responsivo
- Destaque de vitória com cores específicas

## 🚀 Tecnologias

- **Frontend**: Vue 3 + Vite
- **Backend**: Node.js + Express
- **Realtime**: Socket.IO
- **Styling**: CSS3 com gradientes

## 📦 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/jogo-da-velha-online.git
cd jogo-da-velha-online

# Instale as dependências
npm install

# Inicie o servidor backend
npm run server

# Em outro terminal, inicie o frontend
npm run dev

# Ou inicie tudo de uma vez
npm run dev:all
```

Acesse: `http://localhost:5173`

## 🌍 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub à Vercel
2. A Vercel detecta automaticamente a configuração
3. Deploy automático em cada push!

**[Guia completo de deploy](./GITHUB_VERCEL.md)**

### Alternativas
- Railway.app (melhor para WebSockets em alta escala)
- Render.com
- Fly.io

## 📖 Como Jogar Online

### Partida Aleatória
1. Selecione "🌐 Online (Aleatório)"
2. Aguarde encontrar um oponente
3. Jogue automaticamente!

### Sala Privada
1. Selecione "🔒 Sala Privada"
2. Crie uma sala e copie o código
3. Compartilhe com um amigo
4. Ambos conectam e jogam!

## 🎯 Funcionalidades

- ✅ 3 modos de jogo
- ✅ IA inteligente (Minimax)
- ✅ Multiplayer online tempo real
- ✅ Sistema de salas privadas
- ✅ Matchmaking automático
- ✅ Detecção de vitória e empate
- ✅ Estatísticas de jogos
- ✅ Design responsivo
- ✅ Sem animações desnecessárias
- ✅ Cores personalizadas

## 📁 Estrutura do Projeto

```
jogo-da-velha/
├── src/
│   ├── App.vue           # Componente principal do jogo
│   ├── main.js           # Entry point
│   └── style.css         # Estilos globais
├── server.js             # Servidor Socket.IO
├── vercel.json           # Configuração Vercel
├── vite.config.js        # Configuração Vite
└── package.json          # Dependências
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

Desenvolvido com ❤️ e Vue.js

## 🐛 Problemas Conhecidos

- Em planos gratuitos da Vercel, pode haver timeout em jogos muito longos (limite de 10s nas serverless functions)
- Para produção com muitos usuários, considere hospedar o backend em serviços especializados em WebSockets

## 📚 Documentação Adicional

- [Como rodar localmente](./README_ONLINE.md)
- [Guia de deploy GitHub + Vercel](./GITHUB_VERCEL.md)
- [Documentação detalhada de deploy](./DEPLOY.md)

---

⭐ Se gostou do projeto, deixe uma estrela no GitHub!

