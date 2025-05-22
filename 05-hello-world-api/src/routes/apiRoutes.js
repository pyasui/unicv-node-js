const express = require('express');
const router = express.Router();
const userController = require('../controllers/customerController');
const teamsController = require('../controllers/teamsController');

// customers
router.get('/customers', userController.listCustomers);

// teams
router.get('/teams', teamsController.listTeams);

module.exports = router;