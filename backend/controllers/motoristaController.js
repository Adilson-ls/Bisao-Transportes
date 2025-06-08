const Motorista = require('../models/Motorista');

// Função para cadastrar um motorista
exports.cadastrarMotorista = async (req, res) => {
  try {
    const motorista = new Motorista(req.body);
    await motorista.save();
    res.status(201).json({ mensagem: 'Motorista cadastrado com sucesso', motorista });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao cadastrar motorista', detalhes: error.message });
  }
};

// Função para listar todos os motoristas
exports.listarMotoristas = async (req, res) => {
  try {
    const motoristas = await Motorista.find();
    res.status(200).json(motoristas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar motoristas', detalhes: error.message });
  }
};

// Função para buscar um motorista por ID
exports.buscarMotoristaPorId = async (req, res) => {
  try {
    const motorista = await Motorista.findById(req.params.id);
    if (!motorista) {
      return res.status(404).json({ erro: 'Motorista não encontrado' });
    }
    res.status(200).json(motorista);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar motorista', detalhes: error.message });
  }
};

// Função para atualizar informações de um motorista
exports.atualizarMotorista = async (req, res) => {
  try {
    const motorista = await Motorista.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!motorista) {
      return res.status(404).json({ erro: 'Motorista não encontrado' });
    }
    res.status(200).json({ mensagem: 'Motorista atualizado com sucesso', motorista });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar motorista', detalhes: error.message });
  }
};

// Função para deletar um motorista
exports.deletarMotorista = async (req, res) => {
  try {
    const motorista = await Motorista.findByIdAndDelete(req.params.id);
    if (!motorista) {
      return res.status(404).json({ erro: 'Motorista não encontrado' });
    }
    res.status(200).json({ mensagem: 'Motorista deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar motorista', detalhes: error.message });
  }
};