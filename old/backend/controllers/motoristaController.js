// Controlador de Motorista
const Motorista = require('../models/Motorista');

exports.criarMotorista = async (req, res) => {
  try {
    const motorista = await Motorista.create(req.body);
    res.status(201).json(motorista);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarMotoristas = async (req, res) => {
  try {
    const motoristas = await Motorista.findAll();
    res.json(motoristas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
