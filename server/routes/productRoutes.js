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

router.get('/all', async (req, res) => {
    try {
        const products = await Product.findAll(); 
        res.json(products);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos", error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({
            where: { id: id }
        });

        if (deleted) {
            res.json({ mensaje: "Joya eliminada correctamente" });
        } else {
            res.status(404).json({ mensaje: "No se encontró la joya con ese ID" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la joya", error });
    }
});

module.exports = router;