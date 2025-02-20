const CategoryService = require('../services/category-service');

exports.createCategory = async (req, res) => {
    try {
        const category = await CategoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getCategories(req.query);
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await CategoryService.updateCategory(req.params.id, req.body);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await CategoryService.deleteCategory(req.params.id);
        res.status(200).json({ message: 'Categoria excluída com sucesso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
