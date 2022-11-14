// import * as httpInter from "./Http"   importar todos los metodos de http
import {http, urlBase} from "./Http"


export function index(){
    return http().get(`${urlBase}/categoria`);
}

//haciendo function tipo anonimo para praticar
export const store=function(datos){
    return http().post(`${urlBase}/categoria`,datos);
}

//haciendo function tipo flecha (nueva version js)
export const show=(id)=>{
    return http().get(`${urlBase}/categoria/${$id}`);
}

export const update=(datos,id)=>{
    return http().put(`${urlBase}/categoria/${$id},datos`);
}
export const destroy = (id) => {
    return http().delete(`${urlBase}/categoria/${id}`);
}