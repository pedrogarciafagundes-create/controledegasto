# 📁 Estrutura do Projeto

## Backend
- `server.js` - Servidor Express com APIs em memória
- Rotas:
  - GET `/api/tipos-custo` - Listar tipos de custo
  - GET `/api/setores` - Listar setores (101, 201, 401, 501)
  - GET `/api/grupos-marcas` - Estrutura completa de grupos/marcas/lojas
  - POST `/api/custos` - Criar novo custo
  - GET `/api/custos` - Listar todos os custos
  - DELETE `/api/custos/:id` - Deletar custo
  - PUT `/api/tipos-custo/:tipoId/subcategorias` - Adicionar subcategoria
  - DELETE `/api/tipos-custo/:tipoId/subcategorias/:subId` - Deletar subcategoria

## Frontend
- **EntradaCusto.js** - Formulário de entrada de custos
- **RateioCusto.js** - Interface de rateio com percentuais
- **Relatorios.js** - Gráficos e análises
- **GerenciadorTiposCusto.js** - Gerenciador de tipos/subcategorias

## Dados em Memória (Temporário)
- Tipos de custo (Mídia, Classificados, Influencer, Brindes, Eventos)
- Setores (101, 201, 401, 501)
- Grupos e Marcas (Original, Alta, Green, Autostar, Sonervig, RPoint)
- Lojas por marca
- Custos registrados

## Campos para Logo
- `/public/logos/automob/` - Logo Automob
- `/public/logos/grupos/` - Logos dos grupos
- `/public/logos/marcas/` - Logos das marcas

Todos os campos de logo estão preparados na interface para receber as imagens.
