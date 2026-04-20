import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Save, Calculator } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    sku: '',
    nombre: '',
    categoria: '',
    precioCosto: '', 
    precioVenta: '',
    stock: ''
  });

  
  useEffect(() => {
    const costo = parseFloat(formData.precioCosto);
    if (!isNaN(costo) && costo > 0) {
      const sugerido = (costo * 1.30).toFixed(2);
      setFormData(prev => ({ ...prev, precioVenta: sugerido }));
    }
  }, [formData.precioCosto]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Aseguramos que los tipos de datos sean los que Sequelize espera
  const payload = {
    sku: formData.sku,
    nombre: formData.nombre,
    categoria: formData.categoria,
    precioCosto: parseFloat(formData.precioCosto),
    precioVenta: parseFloat(formData.precioVenta),
    stock: parseInt(formData.stock)
  };

  try {
    // URL absoluta sin espacios ni slashes extras
    const url = 'http://localhost:5000/api/products/create';
    const res = await axios.post(url, payload);
    
    console.log("¡Éxito total!", res.data);
    onProductAdded();
    onClose();
    // Limpiamos para la próxima joya
    setFormData({ sku: '', nombre: '', categoria: '', precioCosto: '', precioVenta: '', stock: '' });
  } catch (error) {
    // Si vuelve a fallar, esto nos dirá la verdad
    console.error("Error al guardar:", error.response?.data || error.message);
  }
};
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl border-t-4 border-primary">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calculator className="text-primary" /> Registrar Nueva Joya
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          
          <div className="form-control col-span-2">
            <label className="label font-bold text-xs uppercase text-gray-500">Nombre de la Pieza</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} type="text" className="input input-bordered w-full" required />
          </div>

         
          <div className="form-control">
            <label className="label font-bold text-xs uppercase text-gray-500">SKU</label>
            <input name="sku" value={formData.sku} onChange={handleChange} type="text" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label font-bold text-xs uppercase text-gray-500">Categoría</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} className="select select-bordered" required>
              <option value="">Seleccione...</option>
              <option value="Anillos">Anillos</option>
              <option value="Collares">Collares</option>
              <option value="Zarcillos">Zarcillos</option>
            </select>
          </div>

          
          <div className="form-control bg-base-200 p-3 rounded-lg border-2 border-dashed border-primary/20">
            <label className="label font-bold text-xs uppercase text-primary">Precio Costo ($)</label>
            <input name="precioCosto" value={formData.precioCosto} onChange={handleChange} type="number" step="0.01" className="input input-bordered font-bold" required />
          </div>
          <div className="form-control bg-primary/5 p-3 rounded-lg border-2 border-primary/30">
            <label className="label font-bold text-xs uppercase text-secondary">Venta Sugerida (+30%)</label>
            <input name="precioVenta" value={formData.precioVenta} onChange={handleChange} type="number" step="0.01" className="input input-bordered border-primary text-primary font-bold" required />
          </div>

         
          <div className="form-control">
            <label className="label font-bold text-xs uppercase text-gray-500">Stock Inicial</label>
            <input name="stock" value={formData.stock} onChange={handleChange} type="number" className="input input-bordered" required />
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn btn-primary w-full shadow-lg">
              <Save size={18} className="mr-2" /> Guardar Joya
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ProductModal;