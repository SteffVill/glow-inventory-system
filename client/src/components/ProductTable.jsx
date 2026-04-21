import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

const ProductTable = ({ joyas, onOpenModal, onEditProduct, cargando, totalJoyas }) => {
  if (cargando) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <><div className="overflow-x-auto mb-4 flex items-center justify-end">
      <div>
        <button className="btn btn-primary ml-4" onClick={onOpenModal}>
          <Plus size={20} /> Nuevo Producto
        </button>
      </div>
    </div><div className="overflow-x-auto bg-base-100 rounded-xl shadow-xl">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-base text-secondary">
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {joyas.map((joya) => (
              <tr key={joya.id} className="hover">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-10">
                        <span>{joya.nombre.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{joya.nombre}</div>
                      <div className="text-sm opacity-50">{joya.sku}</div>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-ghost">{joya.categoria}</span></td>
                <td className="font-medium text-success">${joya.precioVenta}</td>
                <td>
                  <div className={`badge ${joya.stock < 5 ? 'badge-error' : 'badge-ghost'}`}>
                    {joya.stock} unids
                  </div>
                </td>
                <td className="flex justify-center gap-2">
                  <button onClick={() => onEditProduct(joya)} className="btn btn-square btn-sm btn-soft btn-info"><Edit size={18} /></button>
                  <button className="btn btn-square btn-sm btn-soft btn-error"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="4" className="text-center">
                Total de Productos
              </th>
              <th className="text-center">
                {totalJoyas}
              </th>
            </tr>
          </tfoot>
        </table>
      </div></>
  );
};

export default ProductTable;