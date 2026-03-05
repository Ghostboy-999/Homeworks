/* eslint-disable @typescript-eslint/no-explicit-any */
import CircularNodo from "./CircularNodo"

class CircularList {

  head: CircularNodo | undefined
  current: CircularNodo | undefined
  lenght: number

  constructor() {

    this.head = undefined
    this.current = undefined
    this.lenght = 0

  }

  append(vehiculo: any) {

    const node = new CircularNodo(vehiculo)

    if (!this.head) {

      this.head = node
      node.next = node       
      this.current = node

    } else {

      let last = this.head

      while (last.next !== this.head) last = last.next!

      last.next = node
      node.next = this.head  
    }

    this.lenght++

  }

  rotate(): any {

    if (!this.current) return undefined
    this.current = this.current.next
    return this.current?.vehiculo

  }

  getCurrent(): any {

    return this.current?.vehiculo
    
  }

}

export default CircularList