import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const FreteDetalhes = () => {
  const { id } = useParams();
  const [frete, setFrete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreteDetalhes = async () => {
      try {
        const response = await api.get(`/fretes/${id}`);
        setFrete(response.data);
      } catch (err) {
        setError('Erro ao carregar os detalhes do frete.');
      } finally {
        setLoading(false);
      }
    };

    fetchFreteDetalhes();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Detalhes do Frete</h1>
      <p><strong>Origem:</strong> {frete.origem}</p>
      <p><strong>Destino:</strong> {frete.destino}</p>
      <p><strong>Preço:</strong> R$ {frete.preco}</p>
      <p><strong>Status:</strong> {frete.status}</p>
    </div>
  );
};

export default FreteDetalhes;