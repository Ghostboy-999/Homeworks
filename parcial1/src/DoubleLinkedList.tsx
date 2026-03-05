/* eslint-disable @typescript-eslint/no-explicit-any */
import DoubleNodo from "./DoubleNodo"

class DoublyLinkedList {

  head: DoubleNodo | undefined
  tail: DoubleNodo | undefined
  lenght: number

  constructor() {

    this.head = undefined
    this.tail = undefined
    this.lenght = 0
    
  }

  append(alquiler: any) {

    const alq = new DoubleNodo(alquiler)

    if (!this.tail) {

      this.head = alq
      this.tail = alq

    } else {

      alq.prev = this.tail
      this.tail.next = alq
      this.tail = alq

    }

    this.lenght++

  }

  toArray(): any[] {

    const arreglo: any[] = []
    let current = this.head

    while (current) {

      arreglo.push(current.alquiler)
      current = current.next
    }

    return arreglo

  }

}

export default DoublyLinkedList