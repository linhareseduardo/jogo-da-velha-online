# Jogo da Velha - Deploy Vercel

## 🚀 Como fazer deploy no Vercel

### Opção 1: Via Interface Web (Mais Fácil)

1. **Preparar o repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Jogo da Velha Online"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/jogo-da-velha.git
   git push -u origin main
   ```

2. **Deploy no Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "Add New Project"
   - Selecione seu repositório "jogo-da-velha"
   - Clique em "Deploy"
   - Pronto! 🎉

### Opção 2: Via CLI

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Fazer login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Deploy em produção:**
   ```bash
   vercel --prod
   ```

## ⚙️ Configuração Automática

O projeto já está configurado para funcionar no Vercel:

✅ `vercel.json` - Configuração do Vercel
✅ Socket.IO configurado para produção
✅ Build otimizado do Vite
✅ Detecção automática de ambiente (dev/prod)

## 🔧 O que acontece no deploy

1. **Backend (Socket.IO):**
   - Roda como função serverless na Vercel
   - URL automática: `https://seu-projeto.vercel.app`

2. **Frontend (Vue):**
   - Build estático otimizado
   - Se conecta automaticamente ao backend

3. **WebSockets:**
   - Funciona perfeitamente via Socket.IO
   - Conexão automática em tempo real

## 📝 Variáveis de Ambiente (Opcional)

Se precisar de configurações adicionais:

1. No Vercel Dashboard → Settings → Environment Variables
2. Adicione as variáveis necessárias
3. Faça redeploy

## 🎮 Testando após Deploy

1. Abra a URL fornecida pelo Vercel
2. Abra em duas abas ou dois dispositivos diferentes
3. Teste o modo online!

## 🔄 Atualizações Futuras

Sempre que fizer mudanças:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

O Vercel fará deploy automático! 🚀

## ⚠️ Limitações da Vercel (Plano Free)

- Funções serverless têm timeout de 10 segundos
- Para jogos com muitos usuários simultâneos, considere:
  - Railway.app (melhor para WebSockets)
  - Render.com
  - Fly.io

## 🆘 Troubleshooting

### Socket.IO não conecta?
- Verifique se o `vercel.json` está correto
- Cheque os logs no Vercel Dashboard

### Build falha?
- Rode `npm run build` localmente primeiro
- Verifique se todas as dependências estão no `package.json`

### Jogo funciona local mas não em produção?
- Abra o Console do navegador (F12)
- Procure por erros de conexão
- Verifique se o Socket.IO está ativo no Vercel Functions

## 📚 Recursos

- [Documentação Vercel](https://vercel.com/docs)
- [Socket.IO com Vercel](https://socket.io/docs/v4/server-initialization/#with-express)
- [Vue Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

