import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './RateioCusto.css';

function RateioCusto({ gruposMarcas, marcasSelecionadas, onConcluido, onVoltar }) {
  const [setores, setSetores] = useState([]);
  const [rateios, setRateios] = useState({});
  const [percentualMarca, setPercentualMarca] = useState({});
  const [percentualLoja, setPercentualLoja] = useState({});
  const [percentualSetor, setPercentualSetor] = useState({});

  useEffect(() => {
    carregarSetores();
    inicializarRateios();
  }, [marcasSelecionadas]);

  const carregarSetores = async () => {
    try {
      const res = await api.get('/setores');
      setSetores(res.data);
    } catch (error) {
      console.error('Erro ao carregar setores:', error);
    }
  };

  const inicializarRateios = () => {
    const marcasCount = marcasSelecionadas.length;
    const percentualPorMarca = 100 / marcasCount;

    const novoPercentualMarca = {};
    marcasSelecionadas.forEach((marca) => {
      novoPercentualMarca[marca] = percentualPorMarca;
    });
    setPercentualMarca(novoPercentualMarca);
  };

  const getLojasDaMarca = (marca) => {
    for (let grupo of gruposMarcas) {
      for (let m of grupo.marcas) {
        if (m.nome === marca) {
          return m.lojas;
        }
      }
    }
    return [];
  };

  const handlePercentualMarca = (marca, valor) => {
    setPercentualMarca({ ...percentualMarca, [marca]: parseFloat(valor) || 0 });
  };

  const handlePercentualLoja = (marca, loja, valor) => {
    const chave = `${marca}-${loja}`;
    setPercentualLoja({ ...percentualLoja, [chave]: parseFloat(valor) || 0 });
  };

  const handlePercentualSetor = (marca, loja, setor, valor) => {
    const chave = `${marca}-${loja}-${setor}`;
    setPercentualSetor({ ...percentualSetor, [chave]: parseFloat(valor) || 0 });
  };

  const aplicarPorIgualMarca = () => {
    const marcasCount = marcasSelecionadas.length;
    const percentualPorMarca = 100 / marcasCount;

    const novoPercentual = {};
    marcasSelecionadas.forEach((marca) => {
      novoPercentual[marca] = percentualPorMarca;
    });
    setPercentualMarca(novoPercentual);
  };

  const aplicarPorIgualLoja = (marca) => {
    const lojas = getLojasDaMarca(marca);
    const marcaPercentual = percentualMarca[marca] || 0;
    const percentualPorLoja = marcaPercentual / lojas.length;

    const novoPercentual = { ...percentualLoja };
    lojas.forEach((loja) => {
      const chave = `${marca}-${loja.nome}`;
      novoPercentual[chave] = percentualPorLoja;
    });
    setPercentualLoja(novoPercentual);
  };

  const aplicarPorIgualSetor = (marca, loja) => {
    const chaveLojaPercentual = `${marca}-${loja}`;
    const lojaPercentual = percentualLoja[chaveLojaPercentual] || 0;
    const percentualPorSetor = lojaPercentual / setores.length;

    const novoPercentual = { ...percentualSetor };
    setores.forEach((setor) => {
      const chave = `${marca}-${loja}-${setor.codigo}`;
      novoPercentual[chave] = percentualPorSetor;
    });
    setPercentualSetor(novoPercentual);
  };

  const handleConcluir = () => {
    onConcluido({
      percentualMarca,
      percentualLoja,
      percentualSetor,
    });
  };

  return (
    <div className="rateio-custo">
      <h2>Definir Rateio de Custos</h2>
      <p className="info-texto">
        Defina os percentuais para cada marca, loja e setor. O total deve somar 100%.
      </p>

      {/* PERCENTUAL POR MARCA */}
      <section className="rateio-section">
        <div className="section-header">
          <h3>1️⃣ Percentual por Marca</h3>
          <button type="button" onClick={aplicarPorIgualMarca} className="btn-igual">
            Por Igual
          </button>
        </div>

        <div className="rateio-grid">
          {marcasSelecionadas.map((marca) => (
            <div key={marca} className="rateio-item">
              <label>{marca}</label>
              <div className="input-container">
                <input
                  type="number"
                  value={percentualMarca[marca] || 0}
                  onChange={(e) => handlePercentualMarca(marca, e.target.value)}
                  step="0.01"
                  min="0"
                  max="100"
                />
                <span className="unit">%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PERCENTUAL POR LOJA */}
      <section className="rateio-section">
        <h3>2️⃣ Percentual por Loja (de cada marca)</h3>

        {marcasSelecionadas.map((marca) => {
          const lojas = getLojasDaMarca(marca);
          return (
            <div key={marca} className="marca-rateio">
              <div className="marca-header">
                <h4>Lojas de {marca}</h4>
                <button
                  type="button"
                  onClick={() => aplicarPorIgualLoja(marca)}
                  className="btn-igual-pequeno"
                >
                  Por Igual
                </button>
              </div>
              <div className="lojas-grid">
                {lojas.map((loja) => (
                  <div key={loja.nome} className="rateio-item">
                    <label>{loja.nome}</label>
                    <div className="input-container">
                      <input
                        type="number"
                        value={percentualLoja[`${marca}-${loja.nome}`] || 0}
                        onChange={(e) => handlePercentualLoja(marca, loja.nome, e.target.value)}
                        step="0.01"
                        min="0"
                        max="100"
                      />
                      <span className="unit">%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* PERCENTUAL POR SETOR */}
      <section className="rateio-section">
        <h3>3️⃣ Percentual por Setor (de cada loja)</h3>

        {marcasSelecionadas.map((marca) => {
          const lojas = getLojasDaMarca(marca);
          return (
            <div key={marca}>
              {lojas.map((loja) => (
                <div key={loja.nome} className="loja-setor">
                  <div className="loja-setor-header">
                    <h5>{marca} - {loja.nome}</h5>
                    <button
                      type="button"
                      onClick={() => aplicarPorIgualSetor(marca, loja.nome)}
                      className="btn-igual-pequeno"
                    >
                      Por Igual
                    </button>
                  </div>
                  <div className="setores-grid">
                    {setores.map((setor) => (
                      <div key={setor.codigo} className="rateio-item">
                        <label>{setor.codigo} - {setor.nome}</label>
                        <div className="input-container">
                          <input
                            type="number"
                            value={percentualSetor[`${marca}-${loja.nome}-${setor.codigo}`] || 0}
                            onChange={(e) =>
                              handlePercentualSetor(marca, loja.nome, setor.codigo, e.target.value)
                            }
                            step="0.01"
                            min="0"
                            max="100"
                          />
                          <span className="unit">%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </section>

      {/* BOTÕES DE AÇÃO */}
      <div className="rateio-acoes">
        <button type="button" onClick={onVoltar} className="btn-secondary">
          Voltar
        </button>
        <button type="button" onClick={handleConcluir} className="btn-primary">
          Concluir Rateio
        </button>
      </div>
    </div>
  );
}

export default RateioCusto;
