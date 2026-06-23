const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// ============ DADOS EM MEMÓRIA ============

let tiposCusto = [
  {
    id: uuidv4(),
    nome: 'MÍDIA',
    subcategorias: [
      { id: uuidv4(), nome: 'Google' },
      { id: uuidv4(), nome: 'Meta' },
      { id: uuidv4(), nome: 'Tik Tok' }
    ]
  },
  {
    id: uuidv4(),
    nome: 'CLASSIFICADOS',
    subcategorias: [
      { id: uuidv4(), nome: 'WebMotors' },
      { id: uuidv4(), nome: 'iCarro' },
      { id: uuidv4(), nome: 'Mercado Livre' },
      { id: uuidv4(), nome: 'Mobiauto' }
    ]
  },
  {
    id: uuidv4(),
    nome: 'INFLUENCER',
    subcategorias: []
  },
  {
    id: uuidv4(),
    nome: 'BRINDES',
    subcategorias: []
  },
  {
    id: uuidv4(),
    nome: 'EVENTOS',
    subcategorias: []
  }
];

const setores = [
  { codigo: 101, nome: 'NOVOS' },
  { codigo: 201, nome: 'SEMINOVOS' },
  { codigo: 401, nome: 'PÓS VENDAS' },
  { codigo: 501, nome: 'VENDA DIRETA' }
];

const gruposEMarcas = [
  {
    grupo: 'Original',
    marcas: [
      {
        nome: 'Volkswagen',
        lojas: [
          { nome: 'São Miguel', cnpj: '60.894.136/0001-14' },
          { nome: 'São José dos Campos', cnpj: '60.894.136/0004-67' },
          { nome: 'Taubaté', cnpj: '60.894.136/0007-00' },
          { nome: 'Mogi', cnpj: '60.894.136/0008-90' },
          { nome: 'Arujá', cnpj: '60.894.136/0009-71' },
          { nome: 'Suzano', cnpj: '60.894.136/0012-77' },
          { nome: 'Guarulhos', cnpj: '60.894.136/0014-39' },
          { nome: 'São Bernardo do Campo', cnpj: '60.894.136/0016-09' },
          { nome: 'Caraguatatuba', cnpj: '60.894.136/0038-06' }
        ]
      },
      {
        nome: 'Fiat',
        lojas: [
          { nome: 'Pires do Rio - Itaquera', cnpj: '08.373.156/0001-20' },
          { nome: 'Vila Prudente', cnpj: '08.373.156/0005-53' },
          { nome: 'Timóteo', cnpj: '08.373.156/0006-34' },
          { nome: 'Complexo - Guarulhos', cnpj: '08.373.156/0012-82' },
          { nome: 'Av São Miguel', cnpj: '08.373.156/0017-97' }
        ]
      },
      {
        nome: 'GAC',
        lojas: [
          { nome: 'Mogi das Cruzes', cnpj: '45.180.696/0001-13' },
          { nome: 'Guarulhos', cnpj: '45.180.696/0003-85' },
          { nome: 'São José dos Campos', cnpj: '45.180.696/0004-66' }
        ]
      },
      {
        nome: 'BYD',
        lojas: [
          { nome: 'Guarulhos (Matriz)', cnpj: '46.010.923/0001-25' },
          { nome: 'São José dos Campos', cnpj: '46.010.923/0002-06' },
          { nome: 'São Paulo - Pacaembu', cnpj: '46.010.923/0004-78' }
        ]
      },
      {
        nome: 'GWM',
        lojas: [
          { nome: 'Guarulhos', cnpj: '46.973.672/0001-84' },
          { nome: 'São José dos Campos', cnpj: '46.973.672/0002-65' },
          { nome: 'Mogi das Cruzes', cnpj: '46.973.672/0003-46' },
          { nome: 'Taubaté', cnpj: '46.973.672/0004-27' }
        ]
      },
      {
        nome: 'Citroen',
        lojas: [
          { nome: 'Guarulhos', cnpj: '45.179.871/0003-14' },
          { nome: 'Vila Prudente', cnpj: '45.179.871/0011-24' }
        ]
      },
      {
        nome: 'Peugeot',
        lojas: [
          { nome: 'Guarulhos', cnpj: '45.179.871/0002-33' }
        ]
      }
    ]
  },
  {
    grupo: 'Alta',
    marcas: [
      {
        nome: 'Volkswagen',
        lojas: [
          { nome: 'Jafet', cnpj: '60.894.138/0040-20' },
          { nome: 'Braz Leme', cnpj: '60.894.136/0044-54' },
          { nome: 'Vergueiro', cnpj: '60.894.136/0045-35' }
        ]
      },
      {
        nome: 'GWM',
        lojas: [
          { nome: 'Saúde São Paulo', cnpj: '46.973.672/0008-50' },
          { nome: 'Nações', cnpj: '46.973.672/0009-31' },
          { nome: 'Ibirapuera', cnpj: '46.973.672/0006-99' },
          { nome: 'Morumbi', cnpj: '46.973.672/0007-70' }
        ]
      }
    ]
  },
  {
    grupo: 'Green',
    marcas: [
      {
        nome: 'Volkswagen',
        lojas: [
          { nome: 'Aricanduva', cnpj: '60.894.136/0046-16' },
          { nome: 'Gomes Cardin', cnpj: '60.894.136/0047-05' },
          { nome: 'Morumbi', cnpj: '60.894.136/0048-88' },
          { nome: 'Nações', cnpj: '60.894.136/0049-69' }
        ]
      },
      {
        nome: 'Citroen',
        lojas: [
          { nome: 'Interlagos - Nações', cnpj: '24.526.123/0001-29' },
          { nome: 'Giovanni Gronchi - Vila Andrade', cnpj: '24.526.123/0003-90' },
          { nome: 'Aricanduva', cnpj: '24.526.123/0004-71' }
        ]
      },
      {
        nome: 'Peugeot',
        lojas: [
          { nome: 'Interlagos - Nações', cnpj: '24.526.123/0001-29' },
          { nome: 'Giovanni Gronchi - Vila Andrade', cnpj: '24.526.123/0003-90' },
          { nome: 'Aricanduva', cnpj: '24.526.123/0004-71' }
        ]
      }
    ]
  },
  {
    grupo: 'Autostar',
    marcas: [
      {
        nome: 'JEEP',
        lojas: [
          { nome: 'Butantã', cnpj: '15.243.624/0001-07' }
        ]
      },
      {
        nome: 'RAM',
        lojas: [
          { nome: 'Butantã', cnpj: '15.243.624/0001-07' }
        ]
      }
    ]
  },
  {
    grupo: 'Sonervig',
    marcas: [
      {
        nome: 'Ford',
        lojas: [
          { nome: 'VILA GUILHERME', cnpj: '03.388.388/0001-38' },
          { nome: 'Ipiranga', cnpj: '03.388.388/0005-61' }
        ]
      }
    ]
  },
  {
    grupo: 'RPoint',
    marcas: [
      {
        nome: 'Renault',
        lojas: [
          { nome: 'IPIRANGA', cnpj: '10.924.808/0001-19' },
          { nome: 'VILA PRUDENTE', cnpj: '10.924.808/0002-08' },
          { nome: 'VILA GUILHERME', cnpj: '10.924.808/0004-61' },
          { nome: 'BRAZ LEME', cnpj: '10.924.808/0005-42' }
        ]
      }
    ]
  }
];

let custos = [];

// ============ ROTAS ============

// GET - Tipos de Custo
app.get('/api/tipos-custo', (req, res) => {
  res.json(tiposCusto);
});

// GET - Setores
app.get('/api/setores', (req, res) => {
  res.json(setores);
});

// GET - Grupos e Marcas
app.get('/api/grupos-marcas', (req, res) => {
  res.json(gruposEMarcas);
});

// GET - Marcas
app.get('/api/marcas', (req, res) => {
  const marcas = [];
  gruposEMarcas.forEach(grupo => {
    grupo.marcas.forEach(marca => {
      marcas.push({
        nome: marca.nome,
        grupo: grupo.grupo
      });
    });
  });
  res.json(marcas);
});

// GET - Lojas por marca
app.get('/api/lojas/:marca', (req, res) => {
  const { marca } = req.params;
  for (let grupo of gruposEMarcas) {
    for (let m of grupo.marcas) {
      if (m.nome === marca) {
        return res.json(m.lojas);
      }
    }
  }
  res.status(404).json({ erro: 'Marca não encontrada' });
});

// POST - Criar custo
app.post('/api/custos', (req, res) => {
  const novoGasto = {
    id: uuidv4(),
    ...req.body,
    dataCriacao: new Date()
  };
  custos.push(novoGasto);
  res.status(201).json(novoGasto);
});

// GET - Todos os custos
app.get('/api/custos', (req, res) => {
  res.json(custos);
});

// GET - Custo por ID
app.get('/api/custos/:id', (req, res) => {
  const custo = custos.find(c => c.id === req.params.id);
  if (!custo) {
    return res.status(404).json({ erro: 'Custo não encontrado' });
  }
  res.json(custo);
});

// DELETE - Custo
app.delete('/api/custos/:id', (req, res) => {
  const index = custos.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Custo não encontrado' });
  }
  const deletado = custos.splice(index, 1);
  res.json(deletado[0]);
});

// PUT - Adicionar subcategoria
app.put('/api/tipos-custo/:tipoId/subcategorias', (req, res) => {
  const { tipoId } = req.params;
  const { nome } = req.body;
  
  const tipo = tiposCusto.find(t => t.id === tipoId);
  if (!tipo) {
    return res.status(404).json({ erro: 'Tipo de custo não encontrado' });
  }
  
  const novaSubcategoria = { id: uuidv4(), nome };
  tipo.subcategorias.push(novaSubcategoria);
  res.json(tipo);
});

// DELETE - Subcategoria
app.delete('/api/tipos-custo/:tipoId/subcategorias/:subId', (req, res) => {
  const { tipoId, subId } = req.params;
  const tipo = tiposCusto.find(t => t.id === tipoId);
  
  if (!tipo) {
    return res.status(404).json({ erro: 'Tipo de custo não encontrado' });
  }
  
  const index = tipo.subcategorias.findIndex(s => s.id === subId);
  if (index === -1) {
    return res.status(404).json({ erro: 'Subcategoria não encontrada' });
  }
  
  const deletada = tipo.subcategorias.splice(index, 1);
  res.json(deletada[0]);
});

// ============ INICIAR SERVIDOR ============

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
