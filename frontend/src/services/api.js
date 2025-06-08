import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL base da API

// Função para realizar login
export const login = async (email, senha) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, senha });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.erro || 'Erro ao realizar login');
  }
};

// Função para cadastrar cliente
export const cadastrarCliente = async (clienteData) => {
  try {
    const response = await axios.post(`${API_URL}/clientes`, clienteData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.erro || 'Erro ao cadastrar cliente');
  }
};

// Função para cadastrar motorista
export const cadastrarMotorista = async (motoristaData) => {
  try {
    const response = await axios.post(`${API_URL}/motoristas`, motoristaData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.erro || 'Erro ao cadastrar motorista');
  }
};

// Função para simular frete
export const simularFrete = async (origem, destino) => {
  try {
    const response = await axios.post(`${API_URL}/fretes/simular`, { origem, destino });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.erro || 'Erro ao simular frete');
  }
};