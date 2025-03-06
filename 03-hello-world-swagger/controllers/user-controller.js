const { User } = require('../models');

exports.createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const newUser = await User.create({
        name,
        email,
        password
      });
  
      res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
  
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro ao criar usuário.' });
    }
  };

  
exports.getUser = async (req, res) => {
    try {
      res.status(201).json({ message: 'Usuário criado com sucesso!' });
  
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro ao criar usuário.' });
    }
  };