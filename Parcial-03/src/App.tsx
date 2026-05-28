import { useState } from 'react'
import { SeccionBuscador } from './components/SeccionBuscador'
import { SeccionRanking } from './components/SeccionRanking'
import { SeccionRecomendaciones } from './components/SeccionRecomendaciones'
import { cancionesIniciales, relacionesIniciales } from './data/cancionesIniciales'
import type { Cancion } from './types/cancion'
import './App.scss'

function crearId() {
  return `cancion-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
}

function App() {
  const [canciones, setCanciones] = useState<Cancion[]>(cancionesIniciales)
  const [relaciones] = useState(relacionesIniciales)

  function agregarCancion(
    titulo: string,
    artista: string,
    reproducciones: number,
    urlEscucha?: string
  ) {
    const nuevaCancion: Cancion = {
      id: crearId(),
      titulo: titulo.trim(),
      artista: artista.trim(),
      reproducciones,
      urlEscucha,
    }

    setCanciones((actuales) => [...actuales, nuevaCancion])
  }

  return (
    <main className="app">
      <header className="encabezado">
        <p>Parcial 3</p>
        <h1>Spotify educativo</h1>
        <span>Trie, Max Heap y Grafo no dirigido</span>
      </header>

      <section className="dashboard">
        <SeccionBuscador
          canciones={canciones}
          onAgregarCancion={agregarCancion}
        />
        <SeccionRanking canciones={canciones} />
        <SeccionRecomendaciones canciones={canciones} relaciones={relaciones} />
      </section>
    </main>
  )
}

export default App
