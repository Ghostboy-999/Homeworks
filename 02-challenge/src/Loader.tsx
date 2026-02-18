import {useState, useEffect} from "react";

function loadingLogo(){

    const [load,setLoad] = useState!(true);
    const [tiempo,setTiempo] = useState!(10);
    useEffect!(() => {

        if(tiempo > 0){
            const intervalo = setTimeout(() =>  {

                setTiempo(intervalo-1);

            }, 1000);
        
            return() => clearTimeout(intervalo);
        } else{

            setLoad(false);

        }

    }, [tiempo]);

    return(
        
        <div>

            {load && <p>Cargando pagina.....</p>}
            <img src= "https://tenor.com/es/view/loading-gif-6449096453315144907"
            alt= "Imagen carga"></img>

        </div>

    );
  
}

export default loadingLogo;