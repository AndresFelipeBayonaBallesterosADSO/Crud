import { URL } from "../../js/config.js";

const solicitud = async(url) => {
    let solicitud = await fetch(`${URL}/${url}`);
    let data = await solicitud.json();
    return data
}


export const enviar = async(edpoint ,option)=>{
    try {
        let solicitud = await fetch(`${URL}/${edpoint}`,option);
        let data = await solicitud.json();
        return data;
    } catch (error) {
        return error
    }
}

export default solicitud;