import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Relatorios.css';

function Relatorios({ custos, gruposMarcas }) {
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');

  const CORES = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30b0fe'];

  // Filtrar custos
  const custosFiltrados = custos.filter((custo) => {
    const passaMarca = !filtroMarca || custo.marcasSelecionadas?.includes(filtroMarca);
    const passaTipo = !filtroTipo || custo.tipoCusto === filtroTipo;
    return passaMarca && passaTipo;
  });

  // Dados por marca
  const dadosMarca = [];
  const marcaMap = {};

  custosFiltrados.forEach((custo) => {
    custo.marcasSelecionadas?.forEach((marca) => {
      if (!marcaMap[marca]) {
        marcaMap[marca] = 0;
      }
      marcaMap[marca] += parseFloat(custo.valor) || 0;
    });
  });

  Object.entries(marcaMap).forEach(([marca, valor]) => {
    dadosMarca.push({ nome: marca, valor: valor.toFixed(2) });
  });

  // Dados por tipo
  const dadosTipo = [];
  const tipoMap = {};

  custosFiltrados.forEach((custo) => {
    const tipo = custo.tipoCusto || 'Sem tipo';
    if (!tipoMap[tipo]) {
      tipoMap[tipo] = 0;
    }
    tipoMap[tipo] += parseFloat(custo.valor) || 0;
  });

  Object.entries(tipoMap).forEach(([tipo, valor]) => {
    dadosTipo.push({ nome: tipo, valor: valor.toFixed(2) });
  });

  const totalGastos = custosFiltrados.reduce((sum, c) => sum + (parseFloat(c.valor) || 0), 0);

  const getMarcas = () => {
    const marcas = new Set();
    gruposMarcas.forEach((grupo) => {
      grupo.marcas.forEach((marca) => {
        marcas.add(marca.nome);
      });
    });
    return Array.from(marcas);
  };

  const getTipos = () => {
    const tipos = new Set();
    custos.forEach((c) => {
      if (c.tipoCusto) tipos.add(c.tipoCusto);
    });
    return Array.from(tipos);
  };

  return (
    <div className="relatorios">
      <h2>Relatórios e Análises</h2>

      {/* FILTROS */}
      <div className="filtros">
        <div className="filtro-item">
          <label>Marca</label>
          <select value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)}>
            <option value="">Todas</option>
            {getMarcas().map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-item">
          <label>Tipo de Custo</label>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="">Todos</option>
            {getTipos().map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-item">
          <label>Data Início</label>
          <input
            type="date"
            value={filtroDataInicio}
            onChange={(e) => setFiltroDataInicio(e.target.value)}
          />
        </div>

        <div className="filtro-item">
          <label>Data Fim</label>
          <input
            type="date"
            value={filtroDataFim}
            onChange={(e) => setFiltroDataFim(e.target.value)}
          />
        </div>
      </div>

      {/* RESUMO */}
      <div className="resumo">
        <div className="resumo-card">
          <h3>Total de Gastos</h3>
          <p className="valor">R$ {totalGastos.toFixed(2)}</p>
        </div>
        <div className="resumo-card">
          <h3>Número de Registros</h3>
          <p className="valor">{custosFiltrados.length}</p>
        </div>
        <div className="resumo-card">
          <h3>Número de Marcas</h3>
          <p className="valor">{new Set(custosFiltrados.flatMap(c => c.marcasSelecionadas || [])).size}</p>
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="graficos">
        {/* GRÁFICO DE MARCA */}
        {dadosMarca.length > 0 && (
          <div className="grafico-container">
            <h3>Custos por Marca</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosMarca}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valor" fill="#667eea" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* GRÁFICO DE TIPO */}
        {dadosTipo.length > 0 && (
          <div className="grafico-container">
            <h3>Custos por Tipo</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosTipo}
                  dataKey="valor"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {dadosTipo.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* LISTA DE CUSTOS */}
      <div className="lista-custos">
        <h3>Custos Registrados</h3>
        <table>
          <thead>
            <tr>
              <th>Fornecedor</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Marcas</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {custosFiltrados.map((custo) => (
              <tr key={custo.id}>
                <td>{custo.nomeFornecedor}</td>
                <td>{custo.tipoCusto}</td>
                <td>R$ {parseFloat(custo.valor).toFixed(2)}</td>
                <td>{custo.marcasSelecionadas?.join(', ')}</td>
                <td>{new Date(custo.dataCriacao).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Relatorios;
