import { useMemo } from 'react'
import { MaxHeapCanciones } from '../structures/MaxHeapCanciones'
import type { Cancion } from '../types/cancion'

type Props = {
  canciones: Cancion[]
}

function crearUrlEscucha(cancion: Cancion) {
  return (
    cancion.urlEscucha ??
    `https://open.spotify.com/search/${encodeURIComponent(
      `${cancion.titulo} ${cancion.artista}`
    )}`
  )
}

export function SeccionRanking({ canciones }: Props) {
  const topCanciones = useMemo(() => {
    const heap = new MaxHeapCanciones()
    canciones.forEach((cancion) => heap.insertar(cancion))
    return heap.obtenerTop(5)
  }, [canciones])

  return (
    <section className="panel">
      <h2>Ranking de popularidad</h2>

      <div className="ranking">
        {topCanciones.map((cancion, indice) => (
          <article className="ranking-item" key={cancion.id}>
            <span>#{indice + 1}</span>
            <div>
              <strong>{cancion.titulo}</strong>
              <p>{cancion.artista}</p>
            </div>
            <b>{cancion.reproducciones}</b>
            <a
              className="boton-escuchar"
              href={crearUrlEscucha(cancion)}
              target="_blank"
              rel="noreferrer"
            >
              Escuchar
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
