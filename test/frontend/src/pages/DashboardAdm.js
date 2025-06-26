import React from 'react';
import { useEffect, useState } from 'react';
import api from '../services/api';

const DashboardAdm = () => {
  const [clientes, setClientes] = useState([]);
  const [motoristas, setMotoristas] = useState([]);
  const [fretes, setFretes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesResponse = await api.get('/clientes');
        const motoristasResponse = await api.get('/motoristas');
        const fretesResponse = await api.get('/fretes');

        setClientes(clientesResponse.data);
        setMotoristas(motoristasResponse.data);
        setFretes(fretesResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Painel Administrativo</h1>
      <h2>Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nome} - {cliente.telefone}</li>
        ))}
      </ul>
      <h2>Motoristas</h2>
      <ul>
        {motoristas.map(motorista => (
          <li key={motorista.id}>{motorista.nome} - {motorista.veiculo}</li>
        ))}
      </ul>
      <h2>Fretes</h2>
      <ul>
        {fretes.map(frete => (
          <li key={frete.id}>{frete.origem} para {frete.destino} - R$ {frete.preco}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardAdm;