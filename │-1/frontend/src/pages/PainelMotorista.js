import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const PainelMotorista = () => {
  const [fretes, setFretes] = useState([]);

  useEffect(() => {
    const fetchFretes = async () => {
      try {
        const response = await api.get('/fretes');
        setFretes(response.data);
      } catch (error) {
        console.error('Erro ao buscar fretes:', error);
      }
    };

    fetchFretes();
  }, []);

  return (
    <div>
      <h1>Painel do Motorista</h1>
      <Link to="/frete/simular">Simular Frete</Link>
      <h2>Fretes Disponíveis</h2>
      <ul>
        {fretes.map(frete => (
          <li key={frete.id}>
            <p>Origem: {frete.origem}</p>
            <p>Destino: {frete.destino}</p>
            <p>Preço: R$ {frete.preco}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PainelMotorista;