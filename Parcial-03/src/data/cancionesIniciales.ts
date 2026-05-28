import type { Cancion } from '../types/cancion'

export const cancionesIniciales: Cancion[] = [
  { id: 'c1', titulo: 'Yellow', artista: 'Coldplay', reproducciones: 980 },
  { id: 'c2', titulo: 'Viva la Vida', artista: 'Coldplay', reproducciones: 1250 },
  { id: 'c3', titulo: 'Shape of You', artista: 'Ed Sheeran', reproducciones: 1600 },
  { id: 'c4', titulo: 'Perfect', artista: 'Ed Sheeran', reproducciones: 1430 },
  { id: 'c5', titulo: 'Blinding Lights', artista: 'The Weeknd', reproducciones: 1720 },
  { id: 'c6', titulo: 'Save Your Tears', artista: 'The Weeknd', reproducciones: 1320 },
  { id: 'c7', titulo: 'Lucid Dreams', artista: 'Juice WRLD', reproducciones: 1890 },
  { id: 'c8', titulo: 'All Girls Are The Same', artista: 'Juice WRLD', reproducciones: 1540 },
  { id: 'c9', titulo: 'Robbery', artista: 'Juice WRLD', reproducciones: 1665 },
  { id: 'c10', titulo: 'Wishing Well', artista: 'Juice WRLD', reproducciones: 1475 },
  { id: 'c11', titulo: 'Come & Go', artista: 'Juice WRLD', reproducciones: 1715 },
  { id: 'c12', titulo: 'Legends', artista: 'Juice WRLD', reproducciones: 1360 },
]

export const relacionesIniciales = [
  ['c1', 'c2'],
  ['c3', 'c4'],
  ['c5', 'c6'],
  ['c2', 'c5'],
  ['c7', 'c8'],
  ['c7', 'c9'],
  ['c8', 'c12'],
  ['c9', 'c10'],
  ['c10', 'c11'],
  ['c5', 'c11'],
]
