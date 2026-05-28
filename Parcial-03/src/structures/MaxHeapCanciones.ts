import type { Cancion } from '../types/cancion'

export class MaxHeapCanciones {
  private elementos: Cancion[] = []

  insertar(cancion: Cancion) {
    this.elementos.push(cancion)
    this.subir()
  }

  extraerMaximo() {
    if (this.elementos.length === 0) return null
    if (this.elementos.length === 1) return this.elementos.pop() ?? null

    const maximo = this.elementos[0]
    this.elementos[0] = this.elementos.pop()!
    this.bajar()

    return maximo
  }

  obtenerTop(cantidad: number) {
    const copia = new MaxHeapCanciones()

    for (const cancion of this.elementos) {
      copia.insertar(cancion)
    }

    const top: Cancion[] = []

    while (top.length < cantidad) {
      const cancion = copia.extraerMaximo()
      if (!cancion) break
      top.push(cancion)
    }

    return top
  }

  private subir() {
    let indice = this.elementos.length - 1

    while (indice > 0) {
      const padre = Math.floor((indice - 1) / 2)

      if (
        this.elementos[padre].reproducciones >=
        this.elementos[indice].reproducciones
      ) {
        break
      }

      this.intercambiar(padre, indice)
      indice = padre
    }
  }

  private bajar() {
    let indice = 0

    while (true) {
      const izquierdo = indice * 2 + 1
      const derecho = indice * 2 + 2
      let mayor = indice

      if (
        izquierdo < this.elementos.length &&
        this.elementos[izquierdo].reproducciones >
          this.elementos[mayor].reproducciones
      ) {
        mayor = izquierdo
      }

      if (
        derecho < this.elementos.length &&
        this.elementos[derecho].reproducciones >
          this.elementos[mayor].reproducciones
      ) {
        mayor = derecho
      }

      if (mayor === indice) break

      this.intercambiar(indice, mayor)
      indice = mayor
    }
  }

  private intercambiar(primero: number, segundo: number) {
    const temporal = this.elementos[primero]
    this.elementos[primero] = this.elementos[segundo]
    this.elementos[segundo] = temporal
  }
}
