const express = require('express');
const router = express.Router();
const motoristaController = require('../controllers/motoristaController');

// Rota para cadastro de motorista
router.post('/', motoristaController.cadastrarMotorista);

// Rota para consulta de motoristas
router.get('/', motoristaController.listarMotoristas);

// Rota para consulta de um motorista específico
router.get('/:id', motoristaController.obterMotorista);

// Rota para atualização de informações do motorista
router.put('/:id', motoristaController.atualizarMotorista);

// Rota para exclusão de motorista
router.delete('/:id', motoristaController.excluirMotorista);

module.exports = router;