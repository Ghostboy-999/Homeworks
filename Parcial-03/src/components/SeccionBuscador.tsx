import { useMemo, useState, type FormEvent } from 'react'
import { TrieCanciones } from '../structures/TrieCanciones'
import type { Cancion } from '../types/cancion'


type Props = {

  canciones: Cancion[]
  onAgregarCancion: (titulo: string, artista: string) => void

}

export function SeccionBuscador({ canciones, onAgregarCancion }: Props) {

  const [titulo, setTitulo] = useState('')
  const [artista, setArtista] = useState('')
  const [busqueda, setBusqueda] = useState('')

  const trie = useMemo(() => {

    const nuevoTrie = new TrieCanciones()
    canciones.forEach((cancion) => nuevoTrie.insertar(cancion.titulo))
    return nuevoTrie

  }, [canciones])

  const sugerencias = busqueda ? trie.sugerirPorPrefijo(busqueda) : []
  const existe = busqueda ? trie.existe(busqueda) : false

  function manejarEnvio(evento: FormEvent) {

    evento.preventDefault()
    if (!titulo.trim() || !artista.trim()) return

    onAgregarCancion(titulo, artista)
    setTitulo('')
    setArtista('')

  }

  return (

    <section className="panel">
      <h2>Buscador predictivo</h2>

      <form className="formulario" onSubmit={manejarEnvio}>
        <input
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          placeholder="Titulo de la cancion"
        />
        <input
          value={artista}
          onChange={(evento) => setArtista(evento.target.value)}
          placeholder="Artista"
        />
        <button>Insertar cancion</button>
      </form>

      <input
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
        placeholder="Buscar por titulo o prefijo"
      />

      <div className="resultado">
        <strong>Existe:</strong> {existe ? 'Si' : 'No'}
      </div>

      <div className="lista">
        {sugerencias.map((sugerencia) => (
          <span key={sugerencia}>{sugerencia}</span>
        ))}
      </div>
    </section>
    
  )
}