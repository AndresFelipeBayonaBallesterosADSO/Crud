import { URL } from "../../js/config.js";

const solicitud = async() => {
    let solicitud = await fetch('http://localhost:3000/users');
    let data = await solicitud.json();
    return data
}

export default solicitud;