// import * as httpInter from "./Http"   importar todos los metodos de http
import {http} from "./Http"

/**
 * para conectar con laravel (login)
 * @param {email,password} datosUsuario 
 */
export function loginConLaravel(datosUsuario){
    return http().post("/v1/auth/login",datosUsuario);
}

//haciendo function tipo anonimo para praticar
export const perfil=function(){
    return http().get("/v1/auth/perfil");
}

//haciendo function tipo flecha (nueva version js)
export const logout=()=>{
    return http().get("/v1/auth/logout");
}