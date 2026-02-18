import ContactosItem from './ContactosItem.tsx';

interface Contacto {

  id: number;
  nombre: string;
  telefono: string;

}

interface ListaContactosProps {

  contactos: Contacto[];
  onEliminar: (id: number) => void;

}

function ListaContactos({ contactos, onEliminar }: ListaContactosProps) {

  if (contactos.length === 0) {

    return (

      <p style={{ 

        textAlign: 'center', 
        color: '#666', 
        fontStyle: 'italic' 

      }}>

        No hay contactos. ¡Agrega uno!

      </p>

    );

  }

  return (

    <div style={{ marginTop: '20px' }}>

      <h3>Lista de Contactos ({contactos.length})</h3>

      {contactos.map(contacto => (

        <ContactosItem
          key={contacto.id}
          contacto={contacto}
          onEliminar={onEliminar}
        />

      ))}

    </div>

  );

}

export default ListaContactos;