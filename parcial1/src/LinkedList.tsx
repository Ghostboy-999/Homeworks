/* eslint-disable @typescript-eslint/no-explicit-any */
import Nodo from "./Nodo"

class LinkedList {

  head: Nodo | undefined
  lenght: number

  constructor() {

    this.head = undefined
    this.lenght = 0

  }

  append(vehiculo: any) {

    const vehi = new Nodo(vehiculo)

    if (!this.head) {

      this.head = vehi

    } else {

      let current = this.head
      while (current.next) current = current.next
      current.next = vehi

    }

    this.lenght++

  }

  remove(id: number) {

    if (!this.head) return false

    if (this.head.vehiculo.id === id) {

      this.head = this.head.next
      this.lenght--
      return true

    }

    let current = this.head
    while (current.next) {

      if (current.next.vehiculo.id === id) {
        current.next = current.next.next
        this.lenght--
        return true

      }

      current = current.next

    }

    return false

  }

  toArray(): any[] {

    const arreglo: any[] = []

    let current = this.head
    while (current) {

      arreglo.push(current.vehiculo)
      current = current.next

    }

    return arreglo
  }

}

export default LinkedList