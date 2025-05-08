const service = require('../services/customerService');

exports.listCustomers = async (req, res) => {
    const { limit, offset, name } = req.query;
    const users = await service.getCustomers(limit, offset, name);
    res.json(users);
};
