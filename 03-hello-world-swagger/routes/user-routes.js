const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

/**
 * @swagger
 * /users:
 * post:
 * summary: Cria um novo usuário
 * tags: [Users]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 201:
 * description: Usuário criado com sucesso
 * 500:
 * description: Erro interno do servidor
 */
router.post('/', userController.createUser);
router.post('/', userController.createUser);
router.get('/', userController.getUser);

module.exports = router;