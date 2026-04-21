import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';
import { Package } from 'lucide-react';

function App() {
  const [joyas, setJoyas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const [joyaSeleccionada, setJoyaSeleccionada] = useState(null);
  const abrirParaCrear = () => {
    setJoyaSeleccionada(null);
    setIsModalOpen(true);
  };

  const abrirParaEditar = (joya) => {
    setJoyaSeleccionada(joya);
    setIsModalOpen(true);
  };

  const obtenerJoyas = async () => {
    try {
      const respuesta = await axios.get('http://localhost:5000/api/products/all');
      setJoyas(respuesta.data);
      setCargando(false);
    } catch (error) {
      console.error("Error:", error);
      setCargando(false);
    }
  };

  useEffect(() => { obtenerJoyas(); }, []);

 return (
    <div className="min-h-screen bg-base-200">
      <Navbar />      
      <main className="p-8">
        <header className="flex items-center gap-2 mb-6 text-2xl font-semibold">
          <Package className="text-secondary" /> 
          <h2>Gestión de Inventario</h2>
        </header>
        <ProductTable 
          joyas={joyas} 
          cargando={cargando} 
          totalJoyas={joyas.length} 
          onOpenModal={abrirParaCrear}  // <--- CORREGIDO: Usamos la función que limpia
          onEditProduct={abrirParaEditar}
          />
      </main>
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setJoyaSeleccionada(null); // <--- CORREGIDO: Limpiamos al cerrar
        }} 
        onProductAdded={obtenerJoyas}
        productToEdit={joyaSeleccionada} 
      />
    </div>
  );
}

export default App;