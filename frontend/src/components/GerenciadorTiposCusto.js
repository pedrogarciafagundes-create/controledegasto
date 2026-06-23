import React, { useState } from 'react';
import api from '../services/api';
import './GerenciadorTiposCusto.css';

function GerenciadorTiposCusto({ tiposCusto, onAtualizarTipos }) {
  const [novaSubcategoria, setNovaSubcategoria] = useState({});

  const handleAdicionarSubcategoria = async (tipoId) => {
    const nome = novaSubcategoria[tipoId];
    if (!nome || nome.trim() === '') {
      alert('Digite o nome da subcategoria');
      return;
    }

    try {
      const res = await api.put(`/tipos-custo/${tipoId}/subcategorias`, { nome });
      onAtualizarTipos(
        tiposCusto.map((t) => (t.id === tipoId ? res.data : t))
      );
      setNovaSubcategoria({ ...novaSubcategoria, [tipoId]: '' });
    } catch (error) {
      console.error('Erro ao adicionar subcategoria:', error);
      alert('Erro ao adicionar subcategoria');
    }
  };

  const handleDeletarSubcategoria = async (tipoId, subId) => {
    if (!window.confirm('Tem certeza que deseja deletar?')) return;

    try {
      const res = await api.delete(`/tipos-custo/${tipoId}/subcategorias/${subId}`);
      onAtualizarTipos(
        tiposCusto.map((t) =>
          t.id === tipoId
            ? { ...t, subcategorias: t.subcategorias.filter((s) => s.id !== subId) }
            : t
        )
      );
    } catch (error) {
      console.error('Erro ao deletar subcategoria:', error);
      alert('Erro ao deletar subcategoria');
    }
  };

  return (
    <div className="gerenciador-tipos">
      <h2>Gerenciar Tipos de Custo</h2>
      <p className="info">Adicione ou remova subcategorias dos tipos de custo</p>

      <div className="tipos-container">
        {tiposCusto.map((tipo) => (
          <div key={tipo.id} className="tipo-card">
            <h3>{tipo.nome}</h3>

            {tipo.subcategorias.length > 0 && (
              <div className="subcategorias-list">
                {tipo.subcategorias.map((sub) => (
                  <div key={sub.id} className="subcategoria-item">
                    <span>{sub.nome}</span>
                    <button
                      onClick={() => handleDeletarSubcategoria(tipo.id, sub.id)}
                      className="btn-deletar"
                      title="Deletar"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="adicionar-subcategoria">
              <input
                type="text"
                placeholder="Nova subcategoria"
                value={novaSubcategoria[tipo.id] || ''}
                onChange={(e) =>
                  setNovaSubcategoria({
                    ...novaSubcategoria,
                    [tipo.id]: e.target.value,
                  })
                }
              />
              <button
                onClick={() => handleAdicionarSubcategoria(tipo.id)}
                className="btn-adicionar"
              >
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GerenciadorTiposCusto;
