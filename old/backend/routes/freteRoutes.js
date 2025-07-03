// Rotas de Frete
const express = require('express');
const router = express.Router();
const freteController = require('../controllers/freteController');

router.post('/', freteController.criarFrete);
router.get('/', freteController.listarFretes);

module.exports = router;
