const express = require('express');
const router = express.Router();
const userController = require('../controllers/customerController');
const teamsController = require('../controllers/teamsController');

// customers
router.get('/customers', userController.listCustomers);
router.get('/teams/:id', teamsController.getTeamById);

module.exports = router;