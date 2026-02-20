import Cancion from "./Node.tsx";

class LinkedList{

    head: Cancion | null | undefined;
    tail: Cancion | null | undefined;
    length: number;

    constructor(){

        this.head = null
        this.tail = null
        this.length = 0
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    append(value: any){
        
        const newCancion = new Cancion(value)
        
        if(!this.head){

            this.head = newCancion
            
        
        } else{
            this.tail.next = newCancion;
        }

        this.tail = newCancion;
        this.length ++;
    }
}

export default LinkedList;