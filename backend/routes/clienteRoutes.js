const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rota para cadastrar um novo cliente
router.post('/', clienteController.cadastrarCliente);

// Rota para obter todos os clientes
router.get('/', clienteController.listarClientes);

// Rota para obter um cliente específico pelo ID
router.get('/:id', clienteController.obterClientePorId);

// Rota para atualizar um cliente pelo ID
router.put('/:id', clienteController.atualizarCliente);

// Rota para excluir um cliente pelo ID
router.delete('/:id', clienteController.excluirCliente);

module.exports = router;