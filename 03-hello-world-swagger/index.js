const express = require('express');
const swaggerSetup = require('./swagger');
const cors = require('cors');
const authMiddleware = require("./middlewares/auth-middleware");

const app = express();
const port = process.env.PORT || 3000;
const { sequelize } = require("./models");

// middlewares
app.use(express.json());
app.use(cors());
app.use(authMiddleware);

swaggerSetup(app);

// importar controllers
const userRoutes = require('./routes/user-routes');
const productRoutes = require('./routes/product-routes');
const authRoutes = require('./routes/auth-routes');

// routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.listen(port, async () => {
  await sequelize.authenticate();
  console.log("Conexão com o banco de dados estabelecida!");
  console.log(`Servidor rodando em http://localhost:${port}`);
}); 