import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';
import { Package } from 'lucide-react';
import { productService } from '../../server/services/productServices';

function App() {
  const [joyas, setJoyas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [joyaSeleccionada, setJoyaSeleccionada] = useState(null);

  const obtenerJoyas = async () => {
    try {
      setCargando(true);
      const respuesta = await productService.getAll();
      setJoyas(respuesta.data);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar:", error);
      setCargando(false);
    }
  };

  useEffect(() => { obtenerJoyas(); }, []);

  const abrirParaCrear = () => {
    setJoyaSeleccionada(null);
    setIsModalOpen(true);
  };

  const abrirParaEditar = (joya) => {
    setJoyaSeleccionada(joya);
    setIsModalOpen(true);
  };

  const eliminarJoya = async (id) => {
    if (window.confirm("¿Estás segura de eliminar esta pieza del inventario?")) {
      try {
        await productService.delete(id);
        obtenerJoyas(); 
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el producto.");
      }
    }
  };

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
          onOpenModal={abrirParaCrear}
          onEditProduct={abrirParaEditar}
          onDeleteProduct={eliminarJoya}
        />
      </main>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setJoyaSeleccionada(null);
        }} 
        onProductAdded={obtenerJoyas}
        productToEdit={joyaSeleccionada} 
      />
    </div>
  );
}

export default App;