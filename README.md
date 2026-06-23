# Automob - Controle de Gastos de Marketing

Sistema web completo para controle e rateio de gastos de marketing da Automob, com relatórios, gráficos interativos e exportação para Excel.

## 📋 Funcionalidades

### 1. **Entrada de Custos**
- Valor do gasto
- CNPJ do fornecedor
- Nome do fornecedor
- Número da Nota Fiscal
- Tipo de custo (Mídia, Classificados, Influencer, Brindes, Eventos)
- Seleção de marca e loja/unidade
- Sistema de rateio automático

### 2. **Tipos de Custo (Editáveis)**

#### MÍDIA
- Google
- Meta
- Tik Tok

#### CLASSIFICADOS
- WebMotors
- iCarro
- Mercado Livre
- Mobiauto

#### INFLUENCER
- Nome do influenciador (campo aberto)

#### BRINDES
- Descrição do brinde (campo aberto)

#### EVENTOS
- Nome do evento
- Data de início e fim
- Itens do evento (Iluminação, Mobiliário, Promoter, Outros)

### 3. **Sistema de Rateio**
1. Selecionar Marcas (com opção "Por Igual")
2. Selecionar Lojas das marcas (com opção "Por Igual")
3. Selecionar Setores (101-NOVOS, 201-SEMINOVOS, 401-PÓS VENDAS, 501-VENDA DIRETA)
4. Definir % por marca → loja → setor
5. Centro Contábil fixo: 6122002

### 4. **Relatórios e Gráficos**
- Gráficos por marca
- Gráficos por loja
- Gráficos por tipo de custo
- Filtros por período, marca, loja, tipo, evento, fornecedor
- Download de gráficos (PNG/SVG)
- Download de planilha Excel com rateio para controladoria

## 🏗️ Stack Tecnológico

- **Backend:** Node.js + Express + PostgreSQL
- **Frontend:** React + Recharts (gráficos)
- **Exportação:** XLSX (Excel), html2canvas (imagens)
- **Containerização:** Docker (opcional)

## 📦 Instalação Rápida

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

**Desenvolvido para Automob** 🚗
