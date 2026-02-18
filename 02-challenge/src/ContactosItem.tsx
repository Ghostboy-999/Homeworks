interface Contacto {

  id: number;
  nombre: string;
  telefono: string;

}

interface ContactosItemProps {

  contacto: Contacto;
  onEliminar: (id: number) => void;
  
}

function ContactosItem({ contacto, onEliminar }: ContactosItemProps) {

  return (

    <div style={{

      border: '1px solid #ddd',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'

    }}>

      <div>

        <strong style={{ 

          display: 'block', 
          fontSize: '18px', 
          marginBottom: '5px' 

        }}>

          {contacto.nombre}
        </strong>
        <p style={{ margin: 0, color: '#666' }}>
          {contacto.telefono}
        </p>
      </div>
      <button 
        onClick={() => onEliminar(contacto.id)}
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Eliminar
      </button>
    </div>
  );
}

export default ContactosItem;