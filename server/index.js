const express = require('express');
const db = require('./config/db');
const Product = require('./models/Product'); 
const app = express();
const PORT = 5000;
const productRoutes = require('./routes/productRoutes');

app.use(express.json());
app.use('/api/products', productRoutes); 

async function startServer() {
    try {
        
        await db.authenticate();
        console.log('✅ Conexión establecida con MySQL.');        
        await db.sync({ alter: true });        
        
        const modelosCargados = Object.keys(db.models);
        console.log('Modelos detectados por Sequelize:', modelosCargados);

        if (modelosCargados.length > 0) {
            console.log('🚀 ¡TABLA(S) CREADA(S) EXITOSAMENTE!');
        } else {
            console.log('⚠️ OJO: Sequelize no detectó ningún modelo. Revisa la ruta de Product.js');
        }

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error crítico en el servidor:', error);
    }
}

startServer();