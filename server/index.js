const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const Product = require('./models/Product'); 
const app = express();

// Puerto dinámico para Render
const PORT = process.env.PORT || 10000; 

const productRoutes = require('./routes/productRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes); 

// CORRECCIÓN CLAVE: Abrir el puerto de inmediato para que Render detecte la app "Live"
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log('Intentando conectar al host:', process.env.DB_HOST);
});

async function startServer() {
    try {
        // La conexión a la DB ocurre en segundo plano
        await db.authenticate();
        console.log('✅ Conexión establecida con MySQL (TCP Proxy).');        
        
        await db.sync({ alter: true });        
        
        const modelosCargados = Object.keys(db.models);
        console.log('Modelos detectados:', modelosCargados);

    } catch (error) {
        console.error('❌ Error de conexión DB:', error.message);
        // El servidor sigue vivo gracias a que el listen está afuera
    }
}

startServer();