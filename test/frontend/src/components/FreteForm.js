import React, { useState } from 'react';
import axios from 'axios';

const FreteForm = () => {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setResultado(null);

    try {
      const response = await axios.post('/fretes/simular', { origem, destino });
      setResultado(response.data);
    } catch (error) {
      setErro('Erro ao calcular frete. Tente novamente.');
    }
  };

  return (
    <div>
      <h2>Simulação de Frete</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Origem:</label>
          <input
            type="text"
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Destino:</label>
          <input
            type="text"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calcular Frete</button>
      </form>
      {resultado && (
        <div>
          <h3>Resultado:</h3>
          <p>Distância: {resultado.distanciaKm} km</p>
          <p>Preço: R$ {resultado.preco.toFixed(2)}</p>
        </div>
      )}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
};

export default FreteForm;