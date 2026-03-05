/* eslint-disable @typescript-eslint/no-explicit-any */
class DoubleNodo {

  alquiler: any
  next: DoubleNodo | undefined
  prev: DoubleNodo | undefined

  constructor(alquiler: any) {

    this.alquiler = alquiler
    this.next = undefined
    this.prev = undefined
    
  }

}

export default DoubleNodo