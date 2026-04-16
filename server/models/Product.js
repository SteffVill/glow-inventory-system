const { DataTypes } = require('sequelize');
const db = require('../config/db'); 

const Product = db.define('Product', {    
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.ENUM('Collares', 'Zarcillos', 'Anillos', 'Pulseras'),
        allowNull: false
    },
    precioCosto: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false
    },
    precioVenta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'products', 
    timestamps: true
});
module.exports = Product;