import ValidarCorreo from "./ValidarCorreo.js";
import SoloNumeros from "./SoloNumeros.js";
import SoloLetras from "./SoloLetras.js";
import remover from "./remover.js";
import is_valid from "./is_valid.js";
import solicitud, { enviar } from "../form(2)/js/ajax.js";
import { URL } from "./config.js";

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
const tbusers = document.querySelector("#tp_users").content;
const fragmento = document.createDocumentFragment();
const tbody =  document.querySelector("tbody");



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
    fetch('http://localhost:3000/documents')
    .then((response) => {
        return response.json()
    })
    .then(data => {
        let option  = document.createElement("option")
        option.value = ""
        option.textContent = "Seleccionar...";
        fragment.appendChild(option)
        data.forEach(element => {
            let option  = document.createElement("option")
            option.value =  element.id;
            option.textContent = element.nombre;
            fragment.appendChild(option);
        });
        tipo.appendChild(fragment);
    });
});

const listar = async ()=>{
    const data = await solicitud('users')
    const documentos = await solicitud('documents');

    data.forEach(element =>{
        let nombre = documentos.find((documento)=>documento.id === element.tipo).nombre
        console.log(nombre);
        

        tbusers.querySelector(".nombre").textContent = element.nombre;
        tbusers.querySelector(".apellido").textContent = element.apellidos;
        tbusers.querySelector(".telefono").textContent = element.telefono;
        tbusers.querySelector(".direccion").textContent = element.direccion;
        tbusers.querySelector(".tipo").textContent = nombre;
        tbusers.querySelector(".documento").textContent = element.documento;
        tbusers.querySelector(".email").textContent = element.email;

        tbusers.querySelector(".modificar").setAttribute("data-id", element.id);
    
        const clone = document.importNode(tbusers, true)
        fragmento.appendChild(clone);
    })
    // fetch('')
    // let  data = solicitud("users");
    // console.log(data);
    tbody.appendChild(fragmento)
};

const CreateRow = (data) =>{
    const tr = tbody.insertRow(-1);

    const tdNombre = tr.insertCell(0);
    const tdApellidos = tr.insertCell(1);
    const tdTelefono = tr.insertCell(2);
    const tdDireccion = tr.insertCell(3);
    const tdTipo = tr.insertCell(4);
    const tdDocumento = tr.insertCell(5);
    const tdEmail = tr.insertCell(6);

    tdNombre.textContent = data.nombre;
    tdApellidos.textContent = data.apellidos;
    tdTelefono.textContent = data.telefono;
    tdDireccion.textContent = data.direccion;
    tdTipo.textContent = data.tipo;
    tdDocumento.textContent = data.documento;
    tdEmail.textContent = data.email;

}



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
    fetch('http://localhost:3000/users',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',},
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        alert("Enviados correcto");
        nombre.value = "";
        apellido.value = "";
        telefono.value = "";
        direccion.value = "";
        tipo.value = "";
        documento.value = "";
        button.checked = false;
        email.value = "";


        nombre.classList.remove("correcto");
        apellido.classList.remove("correcto");
        telefono.classList.remove("correcto");
        direccion.classList.remove("correcto");
        tipo.classList.remove("correcto");
        email.classList.remove("correcto");
        documento.classList.remove("correcto");

        })
    .catch(error =>{
        console.log(error)
        alert("No fueron enviados");
        
        CreateRow(data);
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

const buscar = async(element) => {
    let user = await solicitud(`users/${element.dataset.id}`)
    nombre.value = user.nombre;
    apellido.value = user.apellidos;
    telefono.value = user.telefono;
    direccion.value = user.direccion;
    tipo.value = user.tipo;
    documento.value = user.documento;
    email.value = user.email;

    enviar

}

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

document.addEventListener("click", (event)=>{
    if (event.target.matches(".modificar")) {
        buscar(event.target);   
    }
});