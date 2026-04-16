import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [joyas, setJoyas] = useState([]); 
  const [cargando, setCargando] = useState(true); 

  const obtenerJoyas = async () => {
    try {
      const respuesta = await axios.get('http://localhost:5000/api/products/all');
      setJoyas(respuesta.data);
      setCargando(false);
    } catch (error) {
      console.error("Error al traer las joyas:", error);
      setCargando(false);
    }
  };


  useEffect(() => {
    obtenerJoyas();
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 className="text-4xl font-bold text-indigo-600 ">
        ✨ Glow Inventory System
      </h1>

      {cargando ? (
        <p>Cargando inventario...</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h2>Inventario Actual ({joyas.length})</h2>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f4f4f4' }}>
              <tr>
                <th style={{ padding: '10px' }}>SKU</th>
                <th style={{ padding: '10px' }}>Nombre</th>
                <th style={{ padding: '10px' }}>Categoría</th>
                <th style={{ padding: '10px' }}>Precio</th>
                <th style={{ padding: '10px' }}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {joyas.map((joya) => (
                <tr key={joya.id}>
                  <td style={{ padding: '10px' }}>{joya.sku}</td>
                  <td style={{ padding: '10px' }}>{joya.nombre}</td>
                  <td style={{ padding: '10px' }}>{joya.categoria}</td>
                  <td style={{ padding: '10px' }}>${joya.precioVenta}</td>
                  <td style={{ padding: '10px' }}>{joya.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;