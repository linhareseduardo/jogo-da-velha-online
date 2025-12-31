# 🔧 Configuração do Git - Guia Completo

## ❌ Situação Atual: Git não detectado

O Git não foi encontrado no seu sistema. Precisamos instalá-lo e configurá-lo.

---

## 📥 PASSO 1: Instalar o Git

### Opção 1: Download Direto
1. Acesse: https://git-scm.com/download/win
2. Baixe o instalador (Git-2.43.0-64-bit.exe ou similar)
3. Execute o instalador
4. **IMPORTANTE**: Durante a instalação, mantenha as opções padrão
5. Reinicie o terminal após a instalação

### Opção 2: Via Winget (se tiver)
```powershell
winget install --id Git.Git -e --source winget
```

---

## ⚙️ PASSO 2: Configurar o Git com seu GitHub

Após instalar, **abra um NOVO terminal** e execute:

### 1. Configure seu nome (use o nome do seu perfil GitHub):
```bash
git config --global user.name "SEU_NOME_AQUI"
```
Exemplo:
```bash
git config --global user.name "João Silva"
```

### 2. Configure seu email (use o email da sua conta GitHub):
```bash
git config --global user.email "seu.email@exemplo.com"
```
Exemplo:
```bash
git config --global user.email "joao.silva@gmail.com"
```

### 3. Verificar configuração:
```bash
git config --global user.name
git config --global user.email
```

---

## 🔍 Como Encontrar suas Informações do GitHub

### Seu Nome no GitHub:
1. Acesse: https://github.com
2. Clique na sua foto no canto superior direito
3. Veja seu nome embaixo da foto

### Seu Email no GitHub:
1. Acesse: https://github.com/settings/emails
2. Use o email primário listado
3. **OU** use o email noreply do GitHub: `USERNAME@users.noreply.github.com`

---

## ✅ PASSO 3: Verificar se funcionou

Abra um **NOVO terminal** e execute:

```bash
git --version
git config --global user.name
git config --global user.email
```

Se aparecer a versão do Git e suas informações, está tudo certo! ✅

---

## 🚀 PASSO 4: Subir para o GitHub

Após a configuração, siga estes comandos:

```bash
# Navegue até a pasta do projeto
cd "C:\Users\linha\OneDrive\Área de Trabalho\jogo da velha"

# Inicialize o repositório
git init

# Adicione todos os arquivos
git add .

# Faça o primeiro commit
git commit -m "🎮 Jogo da Velha Online - Versão Final"

# Renomeie a branch para main
git branch -M main

# Adicione o repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/jogo-da-velha-online.git

# Envie para o GitHub
git push -u origin main
```

---

## ⚠️ Possíveis Problemas

### Erro: "git não é reconhecido"
**Solução**: Reinicie o terminal após instalar o Git

### Erro ao fazer push
**Solução**: O GitHub pode pedir autenticação. Use um Personal Access Token:
1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Dê permissões de "repo"
4. Copie o token
5. Use o token como senha quando o Git pedir

### Erro: "remote origin already exists"
**Solução**:
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/jogo-da-velha-online.git
```

---

## 📋 Checklist

- [ ] Git instalado
- [ ] Terminal reiniciado
- [ ] `git --version` funciona
- [ ] Nome configurado (`git config --global user.name "Seu Nome"`)
- [ ] Email configurado (`git config --global user.email "seu@email.com"`)
- [ ] Configurações verificadas
- [ ] Repositório criado no GitHub
- [ ] Comandos de push executados
- [ ] Código no GitHub

---

## 🆘 Precisa de Ajuda?

1. **Git não instala**: Tente baixar como administrador
2. **Comandos não funcionam**: Certifique-se de estar na pasta correta
3. **Push falha**: Verifique se o repositório foi criado no GitHub
4. **Autenticação falha**: Use um Personal Access Token

---

## 📚 Links Úteis

- Git Download: https://git-scm.com/download/win
- GitHub: https://github.com
- Criar Token: https://github.com/settings/tokens
- Tutorial Git: https://git-scm.com/book/pt-br/v2

---

**Após configurar o Git, volte para o arquivo `GITHUB_VERCEL.md` e siga o passo a passo!** 🚀

