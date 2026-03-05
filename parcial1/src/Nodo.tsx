/* eslint-disable @typescript-eslint/no-explicit-any */
class Nodo{

    vehiculo: any
    next: Nodo | undefined

    constructor(vehiculo: string){

        this.vehiculo = vehiculo
        this.next = undefined

    }

}

export default Nodo