const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth-controller');
// const { authenticateToken } = require('../middlewares/auth-middleware');

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", controller.me);

module.exports = router;