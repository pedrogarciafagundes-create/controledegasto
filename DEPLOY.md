# 🚀 DEPLOY NA NUVEM - PASSO A PASSO

## ✅ OPÇÃO 1: Deploy GRÁTIS no Render (RECOMENDADO)

### BACKEND - Render

1. **Acesse:** https://render.com
2. **Clique em "Sign Up"** (ou faça login com GitHub)
3. **Conecte seu repositório GitHub:**
   - Clique em "New +"
   - Selecione "Web Service"
   - Procure por "controledegasto"
   - Selecione

4. **Configure:**
   - **Name:** `controledegasto-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run dev` ou `node src/server.js`
   - **Region:** Escolha mais próximo (ex: Ohio)

5. **Deploy!** Clique em "Create Web Service"

6. **Copie a URL** que aparecer (ex: `https://controledegasto-backend.onrender.com`)

---

### FRONTEND - Vercel

1. **Acesse:** https://vercel.com
2. **Clique em "Sign Up"** (ou faça login com GitHub)
3. **Importe o projeto:**
   - Clique em "New Project"
   - Selecione "Import Git Repository"
   - Procure por "controledegasto"
   - Selecione

4. **Configure:**
   - **Framework Preset:** React
   - **Root Directory:** `frontend`

5. **Variáveis de Ambiente:**
   - Clique em "Environment Variables"
   - Adicione:
     ```
     REACT_APP_API_URL=https://controledegasto-backend.onrender.com/api
     ```
   - (Substitua pela URL do seu backend do Render)

6. **Deploy!** Clique em "Deploy"

7. **Copie a URL** que aparecer (ex: `https://controledegasto.vercel.app`)

---

## 🎯 PRONTO! Seu app está online!

**Frontend:** https://seu-app.vercel.app  
**Backend:** https://seu-backend.onrender.com

---

## ❓ Problemas?

### Backend não conecta
- Verifique a URL do API no Frontend
- Variável `REACT_APP_API_URL` está correta?

### Frontend mostra erro branco
- Verifique se backend está rodando
- Abre o console (F12) e vê o erro

### Porta 5000 já em uso
- No Render, a porta é automática
- No arquivo `server.js`, deixe com `process.env.PORT || 5000`

---

## 📱 Compartilhe com sua equipe!

Agora qualquer pessoa acessa:
```
https://seu-app.vercel.app
```

Sem precisar instalar nada! 🎊

---

## 🔄 Como fazer updates?

1. Faça alterações localmente
2. Commit e push no GitHub
3. Render e Vercel fazem deploy **automaticamente**!

```bash
git add .
git commit -m "Nova feature"
git push origin main
```

Pronto! Está online em poucos minutos! 🚀
