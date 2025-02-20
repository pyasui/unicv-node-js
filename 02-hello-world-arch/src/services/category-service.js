const Category = require('../models/category-model');

class CategoryService {
    async createCategory(data) {
        return await Category.create(data);
    }

    async getCategories(filter = {}) {
        return await Category.findAll({ where: filter });
    }

    async getCategoryById(id) {
        return await Category.findByPk(id);
    }

    async updateCategory(id, data) {
        await Category.update(data, { where: { id } });
        return this.getCategoryById(id);
    }

    async deleteCategory(id) {
        return await Category.destroy({ where: { id } });
    }
}

module.exports = new CategoryService();
