/* eslint-disable @typescript-eslint/no-explicit-any */
class NodoCircularDoble {

  inv: any
  next: NodoCircularDoble | undefined
  prev: NodoCircularDoble | undefined

  constructor(inv: any) {

    this.inv = inv
    this.next = undefined
    this.prev = undefined
    
  }

}

export default NodoCircularDoble