
export default class Cancion{
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    next: Node | null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(value: any){

        this.value = value
        this.next = null;
        
    }
}