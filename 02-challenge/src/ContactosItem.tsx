interface Contactos {

  id: number;
  nombre: string;
  telefono: string;

}

interface ContactosItemProps {

  contacto: Contactos;
  onEliminar: (id: number) => void;

}

function ContactosItem({ contacto, onEliminar }: ContactosItemProps) {

  return (
    <div className="contacto-item">

      <div className="contacto-info">
        <strong>{contacto.nombre}</strong>
        <p>{contacto.telefono}</p>

      </div>

      <button 
        onClick={() => onEliminar(contacto.id)}
        className="btn-eliminar"
      >
        Eliminar

      </button>

    </div>

  );

}

export default ContactosItem;