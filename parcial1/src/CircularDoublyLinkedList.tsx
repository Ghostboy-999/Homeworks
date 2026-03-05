/* eslint-disable @typescript-eslint/no-explicit-any */
import NodoCircularDoble from "./NodoCircularDoble"

class CircularDoublyLinkedList {

  head: NodoCircularDoble | undefined
  lenght: number

  constructor() {

    this.head = undefined
    this.lenght = 0
    
  }

  append(inv: any) {

    const node = new NodoCircularDoble(inv)

    if (!this.head) {

      node.next = node
      node.prev = node
      this.head = node

    } else {

      const last = this.head.prev!
      last.next = node
      node.prev = last
      node.next = this.head
      this.head.prev = node

    }

    this.lenght++
  }

  remove(id: number) {

    if (!this.head) return

    let current = this.head

    for (let i = 0; i < this.lenght; i++) {

      if (current.inv.id === id) {

        if (this.lenght === 1) {

          this.head = undefined
        } else {

          current.prev!.next = current.next
          current.next!.prev = current.prev
          if (current === this.head) this.head = current.next

        }

        this.lenght--
        return

      }

      current = current.next!

    }
  }

  toArray(): any[] {

    if (!this.head) return []
    const arreglo: any[] = []
    let current = this.head

    for (let i = 0; i < this.lenght; i++) {

      arreglo.push(current.inv)
      current = current.next!

    }

    return arreglo

  }

}

export default CircularDoublyLinkedList