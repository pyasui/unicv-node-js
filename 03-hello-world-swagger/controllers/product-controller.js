const { Product } = require('../models');

exports.create = async (req, res) => {
  try {
    // const { name, description, imageUrl, price, stock } = req.body;

    // const newProduct = await Product.create({
    //   name,
    //   description,
    //   imageUrl,
    //   price,
    //   stock
    // });

    // res.status(201).json({ message: 'Produto criado com sucesso!', content: newProduct });
    const result = await ProductService.create(req.body);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(201).json({ content: result.content });

  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Não foi possível criar o produto. Tente novamente em alguns minutos ou acione o suporte' });
  }
};

exports.get = async (req, res) => {
  try {
    // const products = await Product.findAll();
    // res.status(200).json({ content: products });
    const products = await ProductService.getAll();
    res.status(200).json({ content: products });

  } catch (error) {
    console.error('Erro ao recuperar produtos:', error);
    res.status(500).json({ message: 'Não foi possível recuperar os produtos. Tente novamente em alguns minutos ou acione o suporte' });
  }
};

exports.getById = async (req, res) => {
  try {
    // const id = req.params.id;
    // const product = await Product.findOne({ where: { id: id } });

    // if (product == null)
    //   return res.status(404).json();

    // return res.status(200).json({ content: product });

    const product = await ProductService.getById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Produto não encontrado.' });

    res.status(200).json({ content: product });
  } catch (error) {
    console.error('Erro ao pesquisar produto:', error);
    res.status(500).json({ message: 'Não foi possível recuperar o produto desejado. Tente novamente em alguns minutos ou acione o suporte' });
  }
};

exports.update = async (req, res) => {
  try {
    // const id = req.params.id;
    // const product = await Product.findOne({ where: { id: id } });
    // if (product == null)
    //   return res.status(404).json();

    // const { name, description, imageUrl, price, stock } = req.body;

    // await Product.update({ name, description, imageUrl, price, stock }, { where: { id: id } });

    // res.status(200).json({ message: 'Produto atualizado com sucesso!' });

    const product = await ProductService.getById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Produto não encontrado.' });

    await ProductService.update(req.params.id, req.body);
    res.status(200).json();
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Não foi possível atualizar o produto. Tente novamente em alguns minutos ou acione o suporte' });
  }
};

exports.delete = async (req, res) => {
  try {
    // const id = req.params.id;
    // const product = await Product.findOne({ where: { id: id } });

    // if (product == null)
    //   return res.status(404).json();

    // await Product.destroy({ where: { id: id } });

    // res.status(200).json();

    const product = await ProductService.getById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Produto não encontrado.' });

    await ProductService.delete(req.params.id);

    res.status(200).json({ message: 'Produto excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ message: 'Não foi possível excluir o produto. Tente novamente em alguns minutos ou acione o suporte' });
  }
};