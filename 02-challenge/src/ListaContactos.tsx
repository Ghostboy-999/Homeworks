import ContactoItem from './ContactoItem';

interface Contacto {
  
  id: number;
  nombre: string;
  telefono: string;

}

interface ListaContactosProps {

  contactos: Contacto[];
  onEliminar: (id: number) => void;
  onEditar: (id: number, nombre: string, telefono: string) => void;

}

function ListaContactos({ contactos, onEliminar, onEditar }: ListaContactosProps) {
  
  if (contactos.length === 0) {
    return <p className="sin-contactos">No hay contactos. ¡Agrega uno!</p>;
  }

  return (
    <div className="lista-contactos-container">
      <h3>Lista de Contactos ({contactos.length})</h3>
      {contactos.map(contacto => (
        <ContactoItem
          key={contacto.id}
          contacto={contacto}
          onEliminar={onEliminar}
          onEditar={onEditar}
        />
      ))}
    </div>
  );
}

export default ListaContactos;