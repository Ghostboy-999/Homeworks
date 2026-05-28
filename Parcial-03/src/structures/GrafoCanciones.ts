export class GrafoCanciones {
  private adyacencias = new Map<string, Set<string>>()

  agregarCancion(idCancion: string) {
    if (!this.adyacencias.has(idCancion)) {
      this.adyacencias.set(idCancion, new Set())
    }
  }

  relacionarCanciones(primera: string, segunda: string) {
    this.agregarCancion(primera)
    this.agregarCancion(segunda)

    this.adyacencias.get(primera)?.add(segunda)
    this.adyacencias.get(segunda)?.add(primera)
  }

  obtenerRelacionadas(idCancion: string) {
    return Array.from(this.adyacencias.get(idCancion) ?? [])
  }

  obtenerRelaciones() {
    const relaciones: { origen: string; destino: string }[] = []

    for (const [origen, destinos] of this.adyacencias) {
      for (const destino of destinos) {
        if (origen < destino) {
          relaciones.push({ origen, destino })
        }
      }
    }

    return relaciones
  }
}
