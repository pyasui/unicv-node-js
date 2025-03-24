const { Product } = require('../models');

class ProductService {
    static async create(data) {
        const { price, stock, name, description, imageUrl } = data;

        if (price <= 0) {
            return { success: false, message: 'O preço deve ser maior que zero.' };
        }

        if (stock <= 0) {
            return { success: false, message: 'O estoque deve ser maior que zero.' };
        }

        const newProduct = await Product.create({
            name,
            description,
            imageUrl,
            price,
            stock
        });

        const product = await Product.create(data);
        return { success: true, content: product };
    }

    static async getAll() {
        return await Product.findAll();
    }

    static async getById(id) {
        return await Product.findOne({ where: { id } });
    }

    static async update(id, data) {
        await Product.update(data, { where: { id } });
        return true;
    }

    static async delete(id) {
        await Product.destroy({ where: { id } });
        return true;
    }
}

module.exports = ProductService;
