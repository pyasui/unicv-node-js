import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './src/database';
import userRoutes from './src/routes/user-routes';
import productRoutes from './src/routes/product-routes';
import orderRoutes from './src/routes/order-routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log('Banco de dados conectado!');
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    })
    .catch((error) => console.log(error));

export default app;
