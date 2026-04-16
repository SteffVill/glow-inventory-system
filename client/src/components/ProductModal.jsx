import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import axios from 'axios';

const ProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    sku: '',
    nombre: '',
    categoria: '',
    precioVenta: '',
    stock: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products/create', formData);
      onProductAdded(); // Refrescar la tabla
      onClose(); // Cerrar modal
      setFormData({ sku: '', nombre: '', categoria: '', precioVenta: '', stock: '' }); // Limpiar
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">
          <X size={18} />
        </button>
        <section>
            <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                ✨ Registrar Nueva Joya
            </h3>
        </section>        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="form-control w-full">
                <label className="label">
                <span className="label-text font-bold text-xs uppercase tracking-widest">Nombre de la Joya</span>
                </label>
                <input 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                type="text" 
                placeholder="Ej: Collar de Perlas Cultivadas" 
                className="input input-bordered focus:input-primary w-full shadow-sm" 
                required 
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-bold text-xs uppercase tracking-widest">Código SKU</span>
                </label>
                <input 
                    name="sku" 
                    value={formData.sku} 
                    onChange={handleChange} 
                    type="text" 
                    placeholder="GLW-001" 
                    className="input input-bordered shadow-sm" 
                    required 
                />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-bold text-xs uppercase tracking-widest">Categoría</span>
                </label>
                <select 
                    name="categoria" 
                    value={formData.categoria} 
                    onChange={handleChange} 
                    className="select select-bordered shadow-sm" 
                    required
                >
                    <option value="">Seleccionar...</option>
                    <option value="Anillos">Anillos</option>
                    <option value="Collares">Collares</option>
                    <option value="Zarcillos">Zarcillos</option>
                    <option value="Pulseras">Pulseras</option>
                </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-bold text-xs uppercase tracking-widest">Precio Venta ($)</span>
                </label>
                <div className="join w-full shadow-sm">
                    <span className="join-item btn btn-disabled bg-base-300">$</span>
                    <input 
                    name="precioVenta" 
                    value={formData.precioVenta} 
                    onChange={handleChange} 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00" 
                    className="input input-bordered join-item w-full" 
                    required 
                    />
                </div>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-bold text-xs uppercase tracking-widest">Stock Disponible</span>
                </label>
                <input 
                    name="stock" 
                    value={formData.stock} 
                    onChange={handleChange} 
                    type="number" 
                    placeholder="Cant." 
                    className="input input-bordered shadow-sm" 
                    required 
                />
                </div>
            </div>
            <div className="modal-action pt-4">
                <button type="submit" className="btn btn-primary btn-block shadow-lg">
                    <Save size={18} className="mr-2" /> 
                        Guardar Producto
                </button>
            </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ProductModal;