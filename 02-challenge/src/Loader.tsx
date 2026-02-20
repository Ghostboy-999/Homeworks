import {useState, useEffect} from "react";

function loadingLogo(){

    const [load,setLoad] = useState!(true);
    const [tiempo,setTiempo] = useState!(10);
    useEffect!(() => {

        if(tiempo > 0){
            const intervalo = setTimeout(() =>  {

                setTiempo(intervalo-1);

            }, 10000);
        
            return() => clearTimeout(intervalo);
        } else{

            setLoad(false);

        }

    }, [tiempo]);

    return(
        
        <div>

            {load && <p>Cargando pagina.....</p>}
            <img src= "https://i.gifer.com/ZKZg.gif"
            alt= "Imagen carga"></img>

        </div>

    );
  
}

export default loadingLogo;