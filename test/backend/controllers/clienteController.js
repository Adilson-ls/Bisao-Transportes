const Cliente = require('../models/Cliente');

// Criação de um novo cliente
exports.criarCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json({ mensagem: 'Cliente criado com sucesso', cliente });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar cliente', detalhes: error.message });
  }
};

// Listar todos os clientes
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar clientes', detalhes: error.message });
  }
};

// Obter um cliente por ID
exports.obterClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao obter cliente', detalhes: error.message });
  }
};

// Atualizar um cliente por ID
exports.atualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.status(200).json({ mensagem: 'Cliente atualizado com sucesso', cliente });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar cliente', detalhes: error.message });
  }
};

// Deletar um cliente por ID
exports.deletarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.status(200).json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar cliente', detalhes: error.message });
  }
};