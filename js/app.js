import ValidarCorreo from "./ValidarCorreo.js";
import SoloNumeros from "./SoloNumeros.js";
import SoloLetras from "./SoloLetras.js";
import remover from "./remover.js";
import is_valid from "./is_valid.js";
import solicitud from "../form(2)/js/ajax.js";

const $formulario = document.querySelector('form');
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipo = document.querySelector("#tipo");
const documento = document.querySelector("#documento");
const politicas = document.querySelector("#politicas");
const email = document.querySelector("#email");
const button = document.querySelector("button");

const validar = (event) => {
    event.preventDefault();
    console.log(document.querySelectorAll("form  input[required]"));
    // if (nombre.value === "") {
    //     // alert("El nombre es obligatorio");
    //     nombre.focus();
    //     nombre.classList.add("error");
    // }
    // if (apellido.value === "") {
    //     // alert("El apellido es obligatorio");
    //     apellido.focus();
    //     apellido.classList.add("error");
    // }
    // if (telefono.value === "") {
    //     // alert("El telefono es obligatorio");
    //     telefono.focus();
    //     telefono.classList.add("error");
    // }
    // if (direccion.value === "") {
    //     // alert("La dirección es obligatorio");
    //     direccion.focus();
    //     direccion.classList.add("error");
    // }
    // if (tipo.value === "") {
    //     // alert("El tipo de documento es obligatorio");
    //     tipo.focus();
    //     tipo.classList.add("error");
    // }
    // if (documento.value === "") {
    //     // alert("El documento es obligatorio");
    //     documento.focus();
    //     documento.classList.add("error");
    // }
    // if (email.value === "") {
    //     // alert("El correo es obligatorio");
    //     email.focus();
    //     email.classList.add("error");
    // }
};

// const remover = (e, input) =>{
//     if (input.value != "") {
//         input.classList.remove("error");
//         input.classList.add("correcto")
//     };
// };

const documentos = (() =>{
    const fragment = document.createDocumentFragment()
    fetch('http://localhost:3000/document')
    .then((response) => response.json())
    .then(data => {


        data.forEach(element => {
            console.log(element);
            let option  = document.createElement("option")
            option.value =  element.id;
            option.textContent = element.nombre;
            fragment.appendChild(option);
        });
        tipo.appendChild(fragment)
    });
});

const listar = (()=>{
    let  data = solicitud("user");
    console.log(data);
});


$formulario.addEventListener('submit',(event)=>{
    let response = is_valid(event, "form [required]");

    const data ={
        nombre: nombre.value,
        apellidos: apellido.value,
        telefono: telefono.value,
        direccion: direccion.value,
        tipo: tipo.value,
        documento: documento.value,
        email: email.value  
    }
    if (response) {
    fetch('http://localhost:3000/user',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',},
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        alert("Enviados correcto socio")
    })
    .catch(error =>{
        console.log(error)
        alert("No fueron enviados socio");
    })
    .finally(()=>{
        document.querySelector("button").disabled = false;
    });
    document.querySelector("button").disabled = true;
}
});

nombre.addEventListener("keyup", (event)=> {
    remover (event, nombre);
});

apellido.addEventListener("keyup", (event)=> {
    remover (event, apellido);
});

telefono.addEventListener("keyup", (event)=> {
    remover (event, telefono);
});

direccion.addEventListener("keyup", (event)=> {
    remover (event, direccion);
});

tipo.addEventListener("change", (event)=> {
    remover (event, tipo);
});

documento.addEventListener("keyup", (event)=> {
    remover (event, documento);
});

email.addEventListener("keyup", (event)=> {
    remover (event, email);
});

addEventListener("DOMContentLoaded", (event)=>{
    listar();
    documentos();
    if(!politicas.checked){
        console.log(button);
        button.setAttribute("disabled", "");
    };
});

politicas.addEventListener("change", (event)=>{
    console.log(event.target.checked);
    if (event.target.checked) {
        button.removeAttribute("disabled")
    }
});



documento.addEventListener("keypress", (event)=> {
    console.log(event);
    // console.log(this.value);
});


// const SoloNumeros = function(event){
//     if (event.keyCode < 48 || event.keyCode > 57)
//         event.preventDefault();
// }

// const SoloLetras = (event, elemento)=>{
//     let letras = /^[a-zA-ZÀ-ÿ\s]+$/;
//     if (letras.test(event.key)) {
//         console.log("Si")
//     }
//     else{
//         console.log("No")
//         event.preventDefault();
//     }
// };

// // const ValidarCorreo = (event, elemento) => {
// //     let expresion = /^[\w-._]+@[\w-._]+(\.[a-zA-Z]{2,4}){1,2}$/;
// //     console.log(expresion, elemento.value);
// //     console.log(expresion.test(elemento.value));
// //     if (expresion.test(elemento.value)) {
// //         console.log("Si");
// //         elemento.classList.remove("error");
// //         elemento.classList.add("correcto");    
// //     } else {
// //         console.log("No");
// //         elemento.classList.remove("correcto");
// //         elemento.classList.add("error");
// //     };
//     // // Prueba si el valor del campo es válido
//     // if (!validarcorreo.test(elemento.value)) {
//     //     console.log("no"); // Cambiar a "no" significa que es inválido
//     //     elemento.classList.add("error"); // Añade clase de error si no es válido 
//     // } else {
//     //     console.log("sí"); // Cambiar a "sí" significa que es válido
//     //     elemento.classList.add("correcto"); // Añade clase de correcto si es válido 
//     // }
// };
// documento.addEventListener("keypress", function (event) {
//     console.log(event.keyCode);
//     if (event.keyCode >= 48 != event.keyCode <= 57) {
//         event.preventDefault();
//     };
// });
documento.addEventListener("keypress", SoloNumeros);

telefono.addEventListener("keypress", SoloNumeros);

nombre.addEventListener("keypress", (event)=>{
    SoloLetras(event, nombre)
});

apellido.addEventListener("keypress", (event)=>{
    SoloLetras(event, apellido)
});

email.addEventListener("blur", (event) => {
    ValidarCorreo(event, email);
});