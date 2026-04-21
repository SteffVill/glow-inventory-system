const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const Product = require('./models/Product'); 
const app = express();

// CORRECCIÓN 1: Usar el puerto que asigne Render o el 10000 por defecto
const PORT = process.env.PORT || 10000; 

const productRoutes = require('./routes/productRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes); 

async function startServer() {
    try {
        // Log para debuggear en Render (si sale undefined, no cargaste las variables en el panel)
        console.log('Intentando conectar a:', process.env.DB_HOST);

        await db.authenticate();
        console.log('✅ Conexión establecida con MySQL.');        
        await db.sync({ alter: true });        
        
        const modelosCargados = Object.keys(db.models);
        console.log('Modelos detectados por Sequelize:', modelosCargados);

        // CORRECCIÓN 2: Escuchar en 0.0.0.0 para que Render pueda detectar el puerto
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error crítico en el servidor:', error);
        // Es importante no matar el proceso aquí para que Render no entre en loop de reinicio infinito
    }
}

startServer();