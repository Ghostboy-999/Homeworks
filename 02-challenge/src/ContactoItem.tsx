import { useState } from 'react';

interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

interface ContactoItemProps {

  contacto: Contacto;
  onEliminar: (id: number) => void;
  onEditar: (id: number, nombre: string, telefono: string) => void;

}

function ContactoItem({ contacto, onEliminar, onEditar }: ContactoItemProps) {

  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(contacto.nombre);
  const [nuevoTelefono, setNuevoTelefono] = useState(contacto.telefono);

  const handleGuardar = () => {

    if (nuevoNombre.trim() && nuevoTelefono.trim()) {
      onEditar(contacto.id, nuevoNombre, nuevoTelefono);
      setEditando(false);

    }

  };

  const handleCancelar = () => {

    setNuevoNombre(contacto.nombre);
    setNuevoTelefono(contacto.telefono);
    setEditando(false);

  };

  if (editando) {

    return (

      <div className="contacto-item editando">
        <div className="contacto-info-editar">
          <input
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            placeholder="Nombre"
            className="input-editar"
          />

          <input
            type="tel"
            value={nuevoTelefono}
            onChange={(e) => setNuevoTelefono(e.target.value)}
            placeholder="Teléfono"
            className="input-editar"
          />

        </div>

        <div className="botones-editar">
          <button onClick={handleGuardar} className="btn-guardar">

            Guardar

          </button>

          <button onClick={handleCancelar} className="btn-cancelar">
            Cancelar

          </button>

        </div>

      </div>

    );

  }

  return (

    <div className="contacto-item">
      <div className="contacto-info">
        <strong>{contacto.nombre}</strong>
        <p>{contacto.telefono}</p>
      </div>

      <div className="botones-contacto">

        <button 
          onClick={() => setEditando(true)}
          className="btn-editar"
        >

          Editar

        </button>

        <button 

          onClick={() => onEliminar(contacto.id)}
          className="btn-eliminar"
        >

          Eliminar

        </button>

      </div>

    </div>

  );
  
}

export default ContactoItem;