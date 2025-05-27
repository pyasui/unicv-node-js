const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController');

// customers
router.get('/teams/:id', teamsController.getTeamById);
router.get('/teams', teamsController.getTeams);

module.exports = router;