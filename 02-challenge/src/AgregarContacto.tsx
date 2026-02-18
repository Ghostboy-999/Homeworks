import { useState } from 'react';

interface AgregarContactoProps {

  onAgregar: (nombre: string, telefono: string) => void;

}

function AgregarContacto({ onAgregar }: AgregarContactoProps) {

  const [nombre, setNombre] = useState('');

  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (nombre.trim() && telefono.trim()) {

      onAgregar(nombre, telefono);
      setNombre('');
      setTelefono('');

    }

  };

  return (

    <form onSubmit={handleSubmit} style={{

      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'

    }}>

      <h3 style={{ marginTop: 0 }}>Agregar Nuevo Contacto</h3>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{
          margin: '5px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: 'calc(45% - 12px)'

        }}

      />

      <input

        type="tel"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        style={{
          margin: '5px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: 'calc(45% - 12px)'

        }}

      />

      <button type="submit" style={{

        margin: '5px',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'

      }}>

        Agregar

      </button>

    </form>

  );
  
}

export default AgregarContacto;