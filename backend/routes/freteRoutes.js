const express = require('express');
const router = express.Router();
const freteController = require('../controllers/freteController');

// Rota para simular frete
router.post('/simular', freteController.simularFrete);

// Rota para consultar fretes
router.get('/', freteController.listarFretes);

// Rota para criar um novo frete
router.post('/', freteController.criarFrete);

// Rota para consultar um frete específico
router.get('/:id', freteController.consultarFrete);

// Rota para atualizar um frete
router.put('/:id', freteController.atualizarFrete);

// Rota para deletar um frete
router.delete('/:id', freteController.deletarFrete);

module.exports = router;