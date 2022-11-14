import axios from "axios"
import { Buffer } from "buffer"


// export const urlBase="http://127.0.0.1:8000/api";
export const urlBase = "https://back-ventas.herokuapp.com/api";


//url assets para acceder a las imagenes
// export const urlBaseAsset="http://127.0.0.1:8000";
// url public en heroku ya viene configurado de lo contrario se le agrega al final /public
export const urlBaseAsset = "https://back-ventas.herokuapp.com";


/*configuracion de axios */
export function http(){

    let token='';

    if(localStorage.getItem("token")){

        //se decodifica el token
        token = Buffer.from(localStorage.getItem("token"), 'base64').toString('ascii');
    }

    const encabezado=axios.create({
        baseURL: urlBase,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token 
        },
        timeout: 15000  //solo se espera 15 segundos por peticion
    });

    //interceptar errores (401,403)
    encabezado.interceptors.response.use(   //clase interceptors para capturar estados de error
        (response)=>{
            return response
        },
        (error)=>{  
            //si hay alguno error
            if(error.response.status===401){
                localStorage.removeItem("token")   //elimina token de autorizacion
                window.location.href="/login"
            }  
            return Promise.reject(error);
        
        }
    );
    return encabezado

}