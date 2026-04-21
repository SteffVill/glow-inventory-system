import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Save, Calculator, AlertCircle } from 'lucide-react';
import { rules } from '../utils/rules';
import { validateForm } from '../utils/validator';

const URL_API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/products';

const ProductModal = ({ isOpen, onClose, onProductAdded, productToEdit }) => {
  const [formData, setFormData] = useState({
    sku: '', nombre: '', categoria: '', precioCosto: '', precioVenta: '', stock: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData({ sku: '', nombre: '', categoria: '', precioCosto: '', precioVenta: '', stock: '' });
    }
  }, [productToEdit, isOpen]);

  useEffect(() => {
    const costo = parseFloat(formData.precioCosto);
    if (!isNaN(costo) && costo > 0) {
      const sugerido = (costo * 1.30).toFixed(2);
      setFormData(prev => ({ ...prev, precioVenta: sugerido }));
    } else {
      setFormData(prev => ({ ...prev, precioVenta: '' }));
    }
  }, [formData.precioCosto]);

  const handleChange = (e) => {
    const { name, value } = e.target;  
    if (name === 'nombre') {
        const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
        if (!regex.test(value)) return; 
    }
    if (name === 'precioCosto' || name === 'stock') {
        const regex = name === 'precioCosto' ? /^[0-9.]*$/ : /^[0-9]*$/;
        if (!regex.test(value)) return;
    }
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jewelrySchema = {
      nombre: [rules.required, rules.onlyLetters],
      sku: [rules.required, rules.minLength(3)],
      categoria: [rules.required],
      precioCosto: [rules.required, rules.isNumber, rules.positive],
      stock: [rules.required, rules.isNumber]
    };

    const formErrors = validateForm(formData, jewelrySchema);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const payload = {
        ...formData,
        precioCosto: parseFloat(formData.precioCosto),
        precioVenta: parseFloat(formData.precioVenta),
        stock: parseInt(formData.stock)
      };

      if (productToEdit && productToEdit.id) {
          // Para editar: URL/id
          await axios.put(`${URL_API}/${productToEdit.id}`, payload);
      } else {
          // Para crear: URL/create (Asegúrate que tu backend use /create o solo la raíz)
          await axios.post(`${URL_API}/create`, payload);
      }
      
      onProductAdded();
      onClose();
      setFormData({ sku: '', nombre: '', categoria: '', precioCosto: '', precioVenta: '', stock: '' });
    } catch (error) {
      console.error("Error detallado:", error);
      if (error.response?.status === 400) {
        setServerError("Error en los datos o el SKU ya existe.");
      } else {
        setServerError("Error de comunicación: " + (error.message || "Servidor no responde"));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl border-t-4 border-primary">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        
        <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
           {productToEdit ? "Editar producto" : "Nuevo producto"}
        </h3>

        {serverError && (
          <div className="alert alert-error mb-4 shadow-sm py-2">
            <AlertCircle size={18} /> <span className="text-sm font-bold">{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label font-bold text-xs uppercase text-gray-500 mb-2">Nombre del producto</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} type="text" className={`input input-bordered w-full ${errors.nombre ? 'input-error' : ''}`} required />
            {errors.nombre && <span className="text-error text-[10px] mt-1 font-bold italic">{errors.nombre}</span>}
          </div>

          <div className="form-control">
            <label className="label font-bold text-xs uppercase text-gray-500 mb-2">SKU</label>
            <input name="sku" value={formData.sku} onChange={handleChange} type="text" className={`input input-bordered ${errors.sku ? 'input-error' : ''}`} required />
            {errors.sku && <span className="text-error text-[10px] mt-1 font-bold italic">{errors.sku}</span>}
          </div>

          <div className="form-control">
            <label className="label font-bold text-xs uppercase text-gray-500 mb-2">Categoría</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} className="select select-bordered" required>
              <option value="">Seleccione...</option>
              <option value="Anillos">Anillos</option>
              <option value="Collares">Collares</option>
              <option value="Zarcillos">Zarcillos</option>
              <option value="Pulseras">Pulseras</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-bold text-xs uppercase text-gray-500 mb-2">Precio Costo ($)</label>
            <input name="precioCosto" inputMode="numeric" value={formData.precioCosto} onChange={handleChange} type="text" step="0.01" className={`input input-bordered font-bold ${errors.precioCosto ? 'input-error' : ''}`} required />
            {errors.precioCosto && <span className="text-error text-[10px] mt-1 font-bold italic">{errors.precioCosto}</span>}
          </div>

           <div className="form-control ">
            <label className="label font-bold text-xs uppercase text-gray-500 mb-2">Venta Sugerida (+30%) </label>
            <input name="precioVenta" inputMode="numeric" value={formData.precioVenta} readOnly type="text" step="0.01" className="input input-bordered bg-gray-100 text-primary font-bold text-xl" />
          </div>

          <div className="form-control">
            <label className="label font-bold text-xs uppercase text-gray-500 mb-2">Stock Inicial</label>
            <input name="stock" inputMode="numeric" value={formData.stock} onChange={handleChange} type="text" className={`input input-bordered ${errors.stock ? 'input-error' : ''}`} required />
            {errors.stock && <span className="text-error text-[10px] mt-1 font-bold italic">{errors.stock}</span>}
          </div>         

          <div className="col-span-2 flex justify-center mt-4">
            <button type="submit" className="btn btn-primary btn-wide shadow-lg">
               {productToEdit ? 'Actualizar Producto' : 'Guardar en Inventario'}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ProductModal;