import React, { useState, useEffect } from 'react';
import './App.css';
import api from './services/api';
import EntradaCusto from './components/EntradaCusto';
import RateioCusto from './components/RateioCusto';
import Relatorios from './components/Relatorios';
import GerenciadorTiposCusto from './components/GerenciadorTiposCusto';

function App() {
  const [abas, setAbas] = useState('entrada');
  const [custos, setCustos] = useState([]);
  const [tiposCusto, setTiposCusto] = useState([]);
  const [gruposMarcas, setGruposMarcas] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [custoRes, tiposRes, gruposRes] = await Promise.all([
        api.get('/custos'),
        api.get('/tipos-custo'),
        api.get('/grupos-marcas')
      ]);
      setCustos(custoRes.data);
      setTiposCusto(tiposRes.data);
      setGruposMarcas(gruposRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const adicionarCusto = (novoCusto) => {
    setCustos([...custos, novoCusto]);
  };

  const atualizarTiposCusto = (novosTipos) => {
    setTiposCusto(novosTipos);
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo-container">
          {/* Espaço para logo Automob */}
          <div className="logo-placeholder">🏢 AUTOMOB</div>
        </div>
        <h1>Controle de Gastos de Marketing</h1>
      </header>

      {/* NAVEGAÇÃO */}
      <nav className="navbar">
        <button
          className={`nav-btn ${abas === 'entrada' ? 'ativo' : ''}`}
          onClick={() => setAbas('entrada')}
        >
          📝 Entrada de Custos
        </button>
        <button
          className={`nav-btn ${abas === 'rateio' ? 'ativo' : ''}`}
          onClick={() => setAbas('rateio')}
        >
          💰 Rateio
        </button>
        <button
          className={`nav-btn ${abas === 'relatorios' ? 'ativo' : ''}`}
          onClick={() => setAbas('relatorios')}
        >
          📊 Relatórios
        </button>
        <button
          className={`nav-btn ${abas === 'tipos' ? 'ativo' : ''}`}
          onClick={() => setAbas('tipos')}
        >
          ⚙️ Gerenciar Tipos
        </button>
      </nav>

      {/* CONTEÚDO */}
      <main className="container">
        {abas === 'entrada' && (
          <EntradaCusto
            gruposMarcas={gruposMarcas}
            tiposCusto={tiposCusto}
            onAdicionarCusto={adicionarCusto}
            onCarregarCustos={carregarDados}
          />
        )}

        {abas === 'rateio' && (
          <RateioCusto
            custos={custos}
            gruposMarcas={gruposMarcas}
          />
        )}

        {abas === 'relatorios' && (
          <Relatorios
            custos={custos}
            gruposMarcas={gruposMarcas}
          />
        )}

        {abas === 'tipos' && (
          <GerenciadorTiposCusto
            tiposCusto={tiposCusto}
            onAtualizarTipos={atualizarTiposCusto}
          />
        )}
      </main>
    </div>
  );
}

export default App;
