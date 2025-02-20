const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('../config/database');
const categoryRoutes = require('../routes/category-routes');

dotenv.config();
const app = express();
app.use(express.json());

// Sincronizar banco de dados
(async () => {
    try {
        await sequelize.sync(); // Cria tabelas automaticamente
        console.log('🟢 Banco de dados sincronizado!');
    } catch (error) {
        console.error('🔴 Erro ao sincronizar o banco:', error);
    }
})();

// Rotas
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
