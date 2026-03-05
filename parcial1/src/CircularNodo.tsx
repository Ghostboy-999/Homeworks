/* eslint-disable @typescript-eslint/no-explicit-any */
class CircularNodo {

  vehiculo: any
  next: CircularNodo | undefined

  constructor(vehiculo: any) {

    this.vehiculo = vehiculo
    this.next = undefined
    
  }

}

export default CircularNodo