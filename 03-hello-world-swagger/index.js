const express = require('express');
const swaggerSetup = require('./swagger');
const app = express();
const port = 3001;

// configs
app.use(express.json());

swaggerSetup(app);

// importar controllers
const userRoutes = require('./routes/user-routes');
const productRoutes = require('./routes/product-routes');

// routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});