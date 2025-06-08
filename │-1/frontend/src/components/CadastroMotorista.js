import React, { useState } from 'react';
import axios from 'axios';

const CadastroMotorista = () => {
  const [nome, setNome] = useState('');
  const [cnh, setCnh] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/motoristas', { nome, cnh, veiculo });
      setMensagem(response.data.mensagem);
      setNome('');
      setCnh('');
      setVeiculo('');
    } catch (error) {
      setMensagem('Erro ao cadastrar motorista.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Motorista</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CNH:</label>
          <input
            type="text"
            value={cnh}
            onChange={(e) => setCnh(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Veículo:</label>
          <input
            type="text"
            value={veiculo}
            onChange={(e) => setVeiculo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CadastroMotorista;