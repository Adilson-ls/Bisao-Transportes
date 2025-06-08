const Frete = require('../models/Frete');

// Criar um novo frete
exports.criarFrete = async (req, res) => {
  const { origem, destino, preco, status } = req.body;

  try {
    const novoFrete = new Frete({ origem, destino, preco, status });
    await novoFrete.save();
    res.status(201).json({ mensagem: 'Frete criado com sucesso', frete: novoFrete });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar frete', detalhes: error.message });
  }
};

// Consultar todos os fretes
exports.consultarFretes = async (req, res) => {
  try {
    const fretes = await Frete.find();
    res.status(200).json(fretes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao consultar fretes', detalhes: error.message });
  }
};

// Consultar frete por ID
exports.consultarFretePorId = async (req, res) => {
  const { id } = req.params;

  try {
    const frete = await Frete.findById(id);
    if (!frete) {
      return res.status(404).json({ erro: 'Frete não encontrado' });
    }
    res.status(200).json(frete);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao consultar frete', detalhes: error.message });
  }
};

// Atualizar frete
exports.atualizarFrete = async (req, res) => {
  const { id } = req.params;
  const { origem, destino, preco, status } = req.body;

  try {
    const freteAtualizado = await Frete.findByIdAndUpdate(id, { origem, destino, preco, status }, { new: true });
    if (!freteAtualizado) {
      return res.status(404).json({ erro: 'Frete não encontrado' });
    }
    res.status(200).json({ mensagem: 'Frete atualizado com sucesso', frete: freteAtualizado });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar frete', detalhes: error.message });
  }
};

// Deletar frete
exports.deletarFrete = async (req, res) => {
  const { id } = req.params;

  try {
    const freteDeletado = await Frete.findByIdAndDelete(id);
    if (!freteDeletado) {
      return res.status(404).json({ erro: 'Frete não encontrado' });
    }
    res.status(200).json({ mensagem: 'Frete deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar frete', detalhes: error.message });
  }
};