# 🚀 Guia Rápido - GitHub + Vercel

## Passo 1: Subir para o GitHub

### 1. Criar repositório no GitHub
- Vá para https://github.com/new
- Nome: `jogo-da-velha-online` (ou o que preferir)
- Deixe como **público**
- **NÃO** adicione README, .gitignore ou licença (já temos)
- Clique em "Create repository"

### 2. No terminal, execute (substitua SEU_USUARIO):

```bash
cd "C:\Users\linha\OneDrive\Área de Trabalho\jogo da velha"
git init
git add .
git commit -m "🎮 Jogo da Velha Online - 3 modos (IA, Local, Online)"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/jogo-da-velha-online.git
git push -u origin main
```

**✅ Feito! Código no GitHub!**

---

## Passo 2: Deploy no Vercel

### Opção A: Interface Web (Recomendado)

1. Acesse: https://vercel.com
2. Clique em **"Sign Up"** (ou Login se já tem conta)
3. Escolha **"Continue with GitHub"**
4. Após login, clique em **"Add New..."** → **"Project"**
5. Encontre e selecione **"jogo-da-velha-online"**
6. Clique em **"Deploy"**
7. Aguarde 1-2 minutos ⏳
8. **✅ Pronto! Jogo online no ar!**

A Vercel vai te dar uma URL tipo: `https://jogo-da-velha-online-xyz.vercel.app`

### Opção B: Via Terminal (Alternativa)

```bash
npm install -g vercel
vercel login
vercel
```

---

## ✨ Testando o Jogo Online

1. Abra a URL fornecida pelo Vercel
2. Abra em **duas abas** ou **dois celulares**
3. Escolha modo **"🌐 Online (Aleatório)"** ou **"🔒 Sala Privada"**
4. Jogue! 🎮

---

## 🔄 Fazendo Atualizações

Sempre que quiser atualizar o jogo:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

**A Vercel faz deploy automático!** 🚀

---

## ⚠️ Observação Importante

**Socket.IO + Vercel Grátis:**
- ✅ Funciona perfeitamente para testes e uso pessoal
- ⚠️ Para muitos usuários simultâneos (100+), considere:
  - **Railway.app** (melhor para WebSockets)
  - **Render.com** 
  - **Fly.io**

Mas para começar, **Vercel é perfeito!** 🎉

---

## 🆘 Problemas?

### Git não reconhecido?
```bash
# Instale o Git: https://git-scm.com/download/win
# Reinicie o terminal após instalar
```

### Erro ao fazer push?
```bash
# Configure seu nome e email:
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Build falha na Vercel?
- Verifique se todos os arquivos foram commitados
- Cheque o log de erro no Vercel Dashboard
- Contate-me com o erro específico

---

## 📋 Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Código no GitHub (`git push`)
- [ ] Projeto importado na Vercel
- [ ] Deploy realizado com sucesso
- [ ] Jogo testado em 2 abas/dispositivos
- [ ] Modo online funcionando

**Tudo certo? Parabéns! 🎉🎮**

