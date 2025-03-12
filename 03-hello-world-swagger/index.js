const express = require('express');
const app = express();
const port = 3000;

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger'); 

// configs
app.use(express.json());

// importar controllers
const userRoutes = require('./routes/user-routes');
const productRoutes = require('./routes/product-routes');

// routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});