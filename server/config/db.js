const { Sequelize } = require('sequelize');
require('dotenv').config();
console.log("Comprobando Host:", process.env.DB_HOST);
const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            connectTimeout: 60000 
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000
        }
    }
);

module.exports = db;