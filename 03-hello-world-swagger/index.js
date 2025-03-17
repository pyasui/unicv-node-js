const express = require('express');
const swaggerSetup = require('./swagger');
const cors = require('cors');

const app = express();
const port = 3001;

// middlewares
app.use(express.json());
app.use(cors());
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