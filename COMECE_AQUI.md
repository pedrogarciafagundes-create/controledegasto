# 🚀 COMECE AQUI - GUIA SIMPLIFICADO

## ⚠️ VOCÊ NÃO PRECISA INSTALAR NADA COMPLEXO!

---

## OPÇÃO 1: Usar Online (RECOMENDADO) ✅

### Passo 1: Baixe o Node.js
1. Acesse: https://nodejs.org
2. Baixe a versão **LTS** (recomendado)
3. Instale normalmente

### Passo 2: Abra o Terminal/Prompt de Comando

**Windows:**
- Clique em `Iniciar`
- Digite `cmd` ou `PowerShell`
- Abra

**Mac:**
- Abra `Aplicativos` > `Utilitários` > `Terminal`

**Linux:**
- Abra o Terminal

### Passo 3: Navegue para a pasta do projeto
```bash
cd C:\Users\SeuUsuario\Downloads\controledegasto
```
(Ajuste o caminho conforme onde você baixou/clonou)

### Passo 4: Instale as dependências
```bash
cd backend
npm install
```
(Vai demorar um pouco, é normal)

### Passo 5: Inicie o Backend
```bash
npm run dev
```

Você verá:
```
🚀 Servidor rodando em http://localhost:5000
```

### Passo 6: Abra OUTRO Terminal e faça:
```bash
cd frontend
npm install
npm start
```

Você verá:
```
webpack compiled successfully
```

E o navegador abrirá automaticamente em: **http://localhost:3000**

---

## 🎯 PRONTO! Agora você pode:

1. ✅ **Entrada de Custos** - Adicionar novos gastos
2. ✅ **Rateio** - Distribuir custos entre marcas/lojas/setores
3. ✅ **Relatórios** - Ver gráficos e análises
4. ✅ **Gerenciar Tipos** - Adicionar/remover tipos de custo

---

## ❓ Se der erro:

### Erro: "npm: comando não encontrado"
- **Solução:** Node.js não foi instalado corretamente
- Desinstale e instale novamente

### Erro: "Port already in use"
- **Solução:** Feche outros programas que usam porta 3000 ou 5000

### Erro: "Cannot find module"
- **Solução:** Rode `npm install` de novo em ambas as pastas

---

## 📱 Usando a Aplicação

### 1️⃣ Entrada de Custos
- Preencha Valor, Fornecedor, NF
- Selecione Tipo de Custo
- Escolha as Marcas
- Clique em "Próximo: Definir Rateio"

### 2️⃣ Rateio
- Defina % por Marca (use "Por Igual" para distribuir automaticamente)
- Defina % por Loja (de cada marca)
- Defina % por Setor (de cada loja)
- Clique em "Concluir Rateio"

### 3️⃣ Relatórios
- Veja gráficos de custos
- Use filtros para análises
- Veja lista de gastos registrados

### 4️⃣ Gerenciar Tipos
- Adicione novas subcategorias
- Remova subcategorias
- Edite tipos de custo

---

## 🎨 PRÓXIMAS ETAPAS

Depois de rodar tudo funcionando, podemos:

1. ✅ **Adicionar logos** (você envia as imagens)
2. ✅ **Banco de dados real** (dados não desaparecem ao fechar)
3. ✅ **Exportar Excel** (com rateio para controladoria)
4. ✅ **Deploy online** (todo mundo acessar sem instalar)

---

## 💬 Precisa de ajuda?

Se der qualquer erro, me manda:
- O erro exato que aparece
- Qual sistema você está usando (Windows/Mac/Linux)
- O que você estava fazendo quando deu erro

Pronto? Vamos lá! 🚀

