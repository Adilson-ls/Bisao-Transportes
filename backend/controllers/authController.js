const Usuario = require('../models/Usuario');

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Aqui você pode gerar um token JWT e retornar
    res.status(200).json({ mensagem: 'Login bem-sucedido', usuario });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ erro: 'Erro ao realizar login' });
  }
};

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Usuário já existe' });
    }

    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
  }
};