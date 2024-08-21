import SoloLetras from "../../js/SoloLetras.js";
import { URL } from "../../js/config.js";
import is_valid from "../../js/is_valid.js";
import remover from "../../js/remover.js";

const $formulario = document.querySelector('form');
const nombre = document.querySelector("#nombre");
const button = document.querySelector("button");

$formulario.addEventListener('submit',(event)=>{
    let response = is_valid(event, "form [required]");

    const data ={
        nombre: nombre.value,
    }
    if (response) {
    fetch('http://localhost:3000/documents',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',},
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        nombre.value = "";
    })}
});

nombre.addEventListener("keyup", (event)=> {
    remover (event, nombre);
});

nombre.addEventListener("keypress", (event)=>{
    SoloLetras(event, nombre)
});
