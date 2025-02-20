const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Desativar logs SQL no console
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('🟢 Conectado ao PostgreSQL com sucesso!');
    } catch (error) {
        console.error('🔴 Erro ao conectar ao PostgreSQL:', error);
    }
})();

module.exports = sequelize;
