const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Product]
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product-model'
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/', controller.create);

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Product]
 *     summary: Get all products
 *     responses:
 *       201:
 *         description: Products List
 */
router.get('/', controller.get);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product-model'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Product]
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product-model'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Product]
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.delete);

module.exports = router;

// Swagger
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     product-model:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the product
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the product
 *         category:
 *           type: string
 *           description: Category of the product
 *         description:
 *           type: string
 *           description: A detailed description of the product
 *         stock:
 *           type: integer
 *           description: Available stock quantity
 */