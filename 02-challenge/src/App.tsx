import { useState, useEffect } from 'react';
import Loader from './Loader.tsx';
import AgregarContacto from './AgregarContacto.tsx';
import ListaContactos from './ListaContactos.tsx';
import './App.css';

interface Contacto {

  id: number;
  nombre: string;
  telefono: string;
  
}

function App() {

  const [loading, setLoading] = useState(true);

  const [contactos, setContactos] = useState<Contacto[]>([]);

 
  useEffect(() => {

    const timer = setTimeout(() => {
      

      setContactos([

        { id: 1, nombre: 'Juan Pérez', telefono: '555-0001' },

        { id: 2, nombre: 'María García', telefono: '555-0002' },

        { id: 3, nombre: 'Carlos López', telefono: '555-0003' }

      ]);

      setLoading(false);

    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  const agregarContacto = (nombre: string, telefono: string) => {
    
    const nuevoContacto: Contacto = {

      id: Date.now(),
      nombre,
      telefono

    };

    setContactos([...contactos, nuevoContacto]);

  };

  const eliminarContacto = (id: number) => {

    setContactos(contactos.filter(contacto => contacto.id !== id));

  };

  if (loading) {

    return <Loader />;

  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center' }}>📱 Gestión de Contactos</h1>
      <AgregarContacto onAgregar={agregarContacto} />
      <ListaContactos 
        contactos={contactos} 
        onEliminar={eliminarContacto}
      />
    </div>
  );
}

export default App;
