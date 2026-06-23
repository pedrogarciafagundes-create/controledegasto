import React, { useState, useEffect } from 'react';
import api from '../services/api';
import RateioCusto from './RateioCusto';
import './EntradaCusto.css';

function EntradaCusto({ gruposMarcas, tiposCusto, onAdicionarCusto, onCarregarCustos }) {
  const [formData, setFormData] = useState({
    valor: '',
    cnpjFornecedor: '',
    nomeFornecedor: '',
    nf: '',
    tipoCusto: '',
    subcategoria: '',
    nomeEvento: '',
    dataInicio: '',
    dataFim: '',
  });

  const [marcasSelecionadas, setMarcasSelecionadas] = useState([]);
  const [mostraRateio, setMostraRateio] = useState(false);
  const [setores, setSetores] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  useEffect(() => {
    carregarSetores();
  }, []);

  const carregarSetores = async () => {
    try {
      const res = await api.get('/setores');
      setSetores(res.data);
    } catch (error) {
      console.error('Erro ao carregar setores:', error);
    }
  };

  const handleTipoCustoChange = (e) => {
    const tipo = e.target.value;
    setFormData({ ...formData, tipoCusto: tipo, subcategoria: '' });

    if (tipo === 'EVENTOS') {
      setFormData((prev) => ({ ...prev, nomeEvento: '', dataInicio: '', dataFim: '' }));
    }

    const tipoSelecionado = tiposCusto.find((t) => t.nome === tipo);
    setSubcategorias(tipoSelecionado ? tipoSelecionado.subcategorias : []);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMarcaChange = (e) => {
    const marca = e.target.value;
    if (!marcasSelecionadas.includes(marca)) {
      setMarcasSelecionadas([...marcasSelecionadas, marca]);
    }
  };

  const removerMarca = (marca) => {
    setMarcasSelecionadas(marcasSelecionadas.filter((m) => m !== marca));
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    if (!formData.valor || !formData.nomeFornecedor || marcasSelecionadas.length === 0) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    setMostraRateio(true);
  };

  const handleRateioConcluido = async (rateios) => {
    try {
      const gasto = {
        ...formData,
        marcasSelecionadas,
        rateios,
      };
      const res = await api.post('/custos', gasto);
      onAdicionarCusto(res.data);
      setFormData({
        valor: '',
        cnpjFornecedor: '',
        nomeFornecedor: '',
        nf: '',
        tipoCusto: '',
        subcategoria: '',
        nomeEvento: '',
        dataInicio: '',
        dataFim: '',
      });
      setMarcasSelecionadas([]);
      setMostraRateio(false);
      onCarregarCustos();
      alert('Custo registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar custo:', error);
      alert('Erro ao salvar custo');
    }
  };

  return (
    <div className="entrada-custo">
      {!mostraRateio ? (
        <form onSubmit={enviarFormulario}>
          <h2>Registrar Novo Custo</h2>

          <div className="form-grid">
            {/* VALOR */}
            <div className="form-group">
              <label>Valor do Gasto *</label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleInputChange}
                placeholder="0,00"
                step="0.01"
                required
              />
            </div>

            {/* CNPJ FORNECEDOR */}
            <div className="form-group">
              <label>CNPJ do Fornecedor</label>
              <input
                type="text"
                name="cnpjFornecedor"
                value={formData.cnpjFornecedor}
                onChange={handleInputChange}
                placeholder="XX.XXX.XXX/XXXX-XX"
              />
            </div>

            {/* NOME FORNECEDOR */}
            <div className="form-group">
              <label>Nome do Fornecedor *</label>
              <input
                type="text"
                name="nomeFornecedor"
                value={formData.nomeFornecedor}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* NF */}
            <div className="form-group">
              <label>Número da NF</label>
              <input
                type="text"
                name="nf"
                value={formData.nf}
                onChange={handleInputChange}
                placeholder="Ex: 12345"
              />
            </div>

            {/* TIPO DE CUSTO */}
            <div className="form-group">
              <label>Tipo de Custo *</label>
              <select value={formData.tipoCusto} onChange={handleTipoCustoChange} required>
                <option value="">Selecione...</option>
                {tiposCusto.map((tipo) => (
                  <option key={tipo.id} value={tipo.nome}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* SUBCATEGORIA */}
            {subcategorias.length > 0 && (
              <div className="form-group">
                <label>Subcategoria</label>
                <select value={formData.subcategoria} onChange={(e) => setFormData({ ...formData, subcategoria: e.target.value })}>
                  <option value="">Selecione...</option>
                  {subcategorias.map((sub) => (
                    <option key={sub.id} value={sub.nome}>
                      {sub.nome}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* CAMPO LIVRE PARA INFLUENCER/BRINDE */}
            {(formData.tipoCusto === 'INFLUENCER' || formData.tipoCusto === 'BRINDES') && (
              <div className="form-group">
                <label>
                  {formData.tipoCusto === 'INFLUENCER' ? 'Nome do Influenciador' : 'Descrição do Brinde'}
                </label>
                <input
                  type="text"
                  name="descricao"
                  value={formData.descricao || ''}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                />
              </div>
            )}

            {/* EVENTO */}
            {formData.tipoCusto === 'EVENTOS' && (
              <>
                <div className="form-group">
                  <label>Nome do Evento</label>
                  <input
                    type="text"
                    name="nomeEvento"
                    value={formData.nomeEvento}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Data Início</label>
                  <input
                    type="date"
                    name="dataInicio"
                    value={formData.dataInicio}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Data Fim</label>
                  <input
                    type="date"
                    name="dataFim"
                    value={formData.dataFim}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
          </div>

          {/* SELEÇÃO DE MARCAS */}
          <div className="marca-selection">
            <label>Marcas *</label>
            <div className="marca-list">
              {gruposMarcas.map((grupo) =>
                grupo.marcas.map((marca) => (
                  <div key={marca.nome} className="marca-option">
                    <input
                      type="checkbox"
                      id={marca.nome}
                      value={marca.nome}
                      onChange={handleMarcaChange}
                    />
                    <label htmlFor={marca.nome}>
                      <span className="logo-placeholder-marca">🏷️</span> {marca.nome}
                    </label>
                  </div>
                ))
              )}
            </div>
            {marcasSelecionadas.length > 0 && (
              <div className="marcas-selecionadas">
                <p>Selecionadas:</p>
                {marcasSelecionadas.map((marca) => (
                  <div key={marca} className="marca-badge">
                    {marca}
                    <button type="button" onClick={() => removerMarca(marca)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="btn-primary">Próximo: Definir Rateio</button>
        </form>
      ) : (
        <RateioCusto
          gruposMarcas={gruposMarcas}
          marcasSelecionadas={marcasSelecionadas}
          onConcluido={handleRateioConcluido}
          onVoltar={() => setMostraRateio(false)}
        />
      )}
    </div>
  );
}

export default EntradaCusto;
