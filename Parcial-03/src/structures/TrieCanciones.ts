class NodoTrie {
  hijos = new Map<string, NodoTrie>()
  esFinal = false
  titulos: string[] = []
}

export class TrieCanciones {
  private raiz = new NodoTrie()

  insertar(titulo: string) {
    const texto = titulo.trim().toLowerCase()
    if (!texto) return

    let actual = this.raiz

    for (const letra of texto) {
      if (!actual.hijos.has(letra)) {
        actual.hijos.set(letra, new NodoTrie())
      }

      actual = actual.hijos.get(letra)!
      actual.titulos.push(titulo)
    }

    actual.esFinal = true
  }

  existe(titulo: string) {
    const nodo = this.buscarNodo(titulo)
    return Boolean(nodo?.esFinal)
  }

  sugerirPorPrefijo(prefijo: string) {
    const nodo = this.buscarNodo(prefijo)
    if (!nodo) return []

    return Array.from(new Set(nodo.titulos))
  }

  private buscarNodo(valor: string) {
    const texto = valor.trim().toLowerCase()
    let actual = this.raiz

    for (const letra of texto) {
      const siguiente = actual.hijos.get(letra)
      if (!siguiente) return null
      actual = siguiente
    }

    return actual
  }
}
