// Controlador de Frete
const Frete = require('../models/Frete');

exports.criarFrete = async (req, res) => {
  try {
    const frete = await Frete.create(req.body);
    res.status(201).json(frete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarFretes = async (req, res) => {
  try {
    const fretes = await Frete.findAll();
    res.json(fretes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
