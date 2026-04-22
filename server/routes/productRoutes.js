const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll(); 
        res.json(products);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos", error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoProducto = await Product.create(req.body);
        res.status(201).json({ mensaje: 'Joya guardada con éxito', data: nuevoProducto });
    } catch (error) {
        res.status(400).json({ error: 'Error al guardar la joya', detalle: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Product.update(req.body, { where: { id } });
        if (updated) {
            const updatedProduct = await Product.findByPk(id);
            res.json({ mensaje: "Joya actualizada con éxito", producto: updatedProduct });
        } else {
            res.status(404).json({ mensaje: "No se encontró la joya" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar", error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({ where: { id } });
        if (deleted) {
            res.json({ mensaje: "Joya eliminada correctamente" });
        } else {
            res.status(404).json({ mensaje: "No encontrada" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
});

module.exports = router;