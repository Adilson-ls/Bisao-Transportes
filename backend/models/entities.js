// Modelos JavaScript para entidades do sistema (backend)
// Cliente
const Cliente = {
  id: '',
  nome: '',
  email: '',
  // ...outros campos
};

// Motorista
const Motorista = {
  id: '',
  nome: '',
  cnh: '',
  // ...outros campos
};

// Frete
const Frete = {
  id: '',
  origem: '',
  destino: '',
  valor: 0,
  // ...outros campos
};

module.exports = { Cliente, Motorista, Frete };
