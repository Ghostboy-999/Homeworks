import { useMemo, useState } from 'react'
import { GrafoCanciones } from '../structures/GrafoCanciones'
import type { Cancion } from '../types/cancion'

type Props = {
  canciones: Cancion[]
  relaciones: string[][]
}

export function SeccionRecomendaciones({ canciones, relaciones }: Props) {
  const [cancionSeleccionada, setCancionSeleccionada] = useState(canciones[0]?.id ?? '')

  const grafo = useMemo(() => {
    const nuevoGrafo = new GrafoCanciones()

    canciones.forEach((cancion) => nuevoGrafo.agregarCancion(cancion.id))
    relaciones.forEach(([primera, segunda]) =>
      nuevoGrafo.relacionarCanciones(primera, segunda)
    )

    return nuevoGrafo
  }, [canciones, relaciones])

  const relacionadas = grafo
    .obtenerRelacionadas(cancionSeleccionada)
    .map((id) => canciones.find((cancion) => cancion.id === id))
    .filter(Boolean) as Cancion[]

  return (
    <section className="panel">
      <h2>Recomendaciones</h2>

      <select
        value={cancionSeleccionada}
        onChange={(evento) => setCancionSeleccionada(evento.target.value)}
      >
        {canciones.map((cancion) => (
          <option key={cancion.id} value={cancion.id}>
            {cancion.titulo}
          </option>
        ))}
      </select>

      <div className="lista">
        {relacionadas.length > 0 ? (
          relacionadas.map((cancion) => (
            <span key={cancion.id}>
              {cancion.titulo} - {cancion.artista}
            </span>
          ))
        ) : (
          <span>No hay canciones relacionadas.</span>
        )}
      </div>

      <div className="relaciones">
        {grafo.obtenerRelaciones().map((relacion) => (
          <small key={`${relacion.origen}-${relacion.destino}`}>
            {relacion.origen} conectado con {relacion.destino}
          </small>
        ))}
      </div>
    </section>
  )
}
