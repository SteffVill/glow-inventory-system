const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/add', async (req, res) => {
    try {
        const nuevoProducto = await Product.create(req.body);
        res.status(201).json({ mensaje: 'Joya guardada con éxito', data: nuevoProducto });
    } catch (error) {
        res.status(400).json({ error: 'Error al guardar la joya', detalle: error.message });
    }
});

module.exports = router;