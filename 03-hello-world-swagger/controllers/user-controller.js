const { User } = require('../models');

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', content: newUser });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Não foi possível criar o usuário. Tente novamente em alguns minutos ou acione o suporte' });
  }
};

exports.get = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ content: users });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Não foi possível recuperar o usuário desejado. Tente novamente em alguns minutos ou acione o suporte' });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });

    if (user == null)
      return res.status(404).json();

    return res.status(200).json({ content: user });

  } catch (error) {
    console.error('Erro ao pesquisar usuário:', error);
    res.status(500).json({ message: 'Não foi possível recuperar o usuário desejado. Tente novamente em alguns minutos ou acione o suporte' });
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    if (user == null)
      return res.status(404).json();

    const { name, email, password } = req.body;
    await User.update({ name, email, password }, { where: { id: id } });

    res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Não foi possível atualizar o usuário. Tente novamente em alguns minutos ou acione o suporte' });
  }
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });

    if (user == null)
      return res.status(404).json();

    await User.destroy({ where: { id: id } });

    res.status(200).json();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Não foi possível excluir o usuário. Tente novamente em alguns minutos ou acione o suporte' });
  }
}