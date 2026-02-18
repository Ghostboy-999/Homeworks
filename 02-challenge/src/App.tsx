import { useState, useEffect } from 'react';
import LoadingLogo from './Loader.tsx';
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
    }, 10000);

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

  const editarContacto = (id: number, nuevoNombre: string, nuevoTelefono: string) => {
    setContactos(contactos.map(contacto => 
      contacto.id === id 
        ? { ...contacto, nombre: nuevoNombre, telefono: nuevoTelefono }
        : contacto
    ));
  };

  const eliminarContacto = (id: number) => {
    setContactos(contactos.filter(contacto => contacto.id !== id));
  };

  if (loading) {
    return <LoadingLogo />;
  }

  return (
    <div className="app-container">
      <h1> Gestión de Contactos</h1>
      <AgregarContacto onAgregar={agregarContacto} />
      <ListaContactos 
        contactos={contactos} 
        onEliminar={eliminarContacto}
        onEditar={editarContacto}
      />
    </div>
  );
}

export default App;