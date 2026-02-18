interface Contacto {

  id: number;
  nombre: string;
  telefono: string;

}

interface ContactoItemProps {

  contacto: Contacto;
  onEliminar: (id: number) => void;

}

function ContactoItem({ contacto, onEliminar }: ContactoItemProps) {

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

export default ContactoItem;