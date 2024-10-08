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
const users =  document.querySelector("#users");


// const validar = (event) => {
//     event.preventDefault();
//     console.log(document.querySelectorAll("form  input[required]"));
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
// };

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

const listar = async (page)=>{
    const _page = page ? page : 1;
    const data = await solicitud(`users?_page=${_page}&_per_page=8`)
    const documentos = await solicitud('documents');

    const nav =  document.querySelector(".navigation");
    const first = data.first;
    const prev = data.prev;
    const next = data.next;
    const last = data.last;

    nav.querySelector(".first").disabled = prev ? false : true;
    nav.querySelector(".prev").disabled = prev ? false : true;
    nav.querySelector(".next").disabled = next ? false : true;
    nav.querySelector(".last").disabled = next ? false : true;

    // nav.querySelector(".first").setAttribute("disabled" ,"");
    // nav.querySelector(".prev").setAttribute("disabled" ,"");
    
    nav.querySelector(".first").setAttribute("data-first" , first);
    nav.querySelector(".prev").setAttribute("data-prev" , prev);
    nav.querySelector(".next").setAttribute("data-next" , next);
    nav.querySelector(".last").setAttribute("data-last" , last);    

    data.data.forEach(element =>{
        let nombre = documentos.find((documento)=>documento.id === element.tipo).nombre

        tbusers.querySelector("tr").id = `user_${element.id}`

        tbusers.querySelector(".nombre").textContent = element.nombre;
        tbusers.querySelector(".apellido").textContent = element.apellidos;
        tbusers.querySelector(".telefono").textContent = element.telefono;
        tbusers.querySelector(".direccion").textContent = element.direccion;
        tbusers.querySelector(".tipo").textContent = nombre;
        tbusers.querySelector(".documento").textContent = element.documento;
        tbusers.querySelector(".email").textContent = element.email;

        tbusers.querySelector(".modificar").setAttribute("data-id", element.id);
        tbusers.querySelector(".eliminar").setAttribute("data-id", element.id);
    
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

// $formulario.addEventListener('submit',(event)=>{
//     let response = is_valid(event, "form [required]");
//     const data ={
//         nombre: nombre.value,
//         apellidos: apellido.value,
//         telefono: telefono.value,
//         direccion: direccion.value,
//         tipo: tipo.value,
//         documento: documento.value,
//         email: email.value  
//     }
//     if (response) {
//     fetch('http://localhost:3000/users',{
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',},
//     })
//     .then((response) => response.json())
//     .then(data => {
//         console.log(data);
//         alert("Enviados correcto");
//         nombre.value = "";
//         apellido.value = "";
//         telefono.value = "";
//         direccion.value = "";
//         tipo.value = "";
//         documento.value = "";
//         button.checked = false;
//         email.value = "";


//         nombre.classList.remove("correcto");
//         apellido.classList.remove("correcto");
//         telefono.classList.remove("correcto");
//         direccion.classList.remove("correcto");
//         tipo.classList.remove("correcto");
//         email.classList.remove("correcto");
//         documento.classList.remove("correcto");

//         })
//     .catch(error =>{
//         console.log(error)
//         alert("No fueron enviados");
        
//         CreateRow(data);
//     })
//     .finally(()=>{
//         document.querySelector("button").disabled = false;
//     });
//     document.querySelector("button").disabled = true;
// }
// });

const buscar = async(element) => {
    let data = await enviar(`users/${element.dataset.id}`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    loadForm(data);
};

const save = (event) => {
    let response  = is_valid(event,"form[required]");
    event.preventDefault();
    
    const data = {
        nombre:nombre.value,
        apellidos : apellido.value,
        telefono : telefono.value,
        direccion : direccion.value,
        tipo: tipo.value,
        documento: documento.value,
        email: email.value
}
if (response) {
    if (users.value === "") {
        guardar(data)
    }else{
        actualiza(data)
    }
}
}

const guardar = (data) =>{
    fetch(`${URL}/users`,{
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'content-type' : 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        nombre.value ="";
        limpiarForm();
        CreateRow(json)
    });
}

const actualiza = async (data) =>{
    const response = await enviar(`users/${users.value}`,{
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    limpiarForm();
    editRow(response);
};

const limpiarForm = () =>{
    nombre.value = "";
    apellido.value = "";
    telefono.value = "";
    direccion.value = "";
    tipo.value = "";
    documento.value = "";
    email.value = "";
    politicas.checked = false;
    
    nombre.classList.remove("correcto");
    apellido.classList.remove("correcto");
    telefono.classList.remove("correcto");
    direccion.classList.remove("correcto");
    tipo.classList.remove("correcto");
    documento.classList.remove("correcto");
    email.classList.remove("correcto");
    tipo.classList.remove("correcto");
}

const editRow = (data) =>{
    const tr = document.querySelector(`#user_${data.id}`);
    tr.querySelector(".nombre").textContent = data.nombre;
    tr.querySelector(".apellido").textContent = data.apellidos;
    tr.querySelector(".telefono").textContent = data.telefono;
    tr.querySelector(".direccion").textContent = data.direccion;
    tr.querySelector(".tipo").textContent = data.tipo;
    tr.querySelector(".documento").textContent = data.documento;
    tr.querySelector(".email").textContent = data.email;
    
}


const deleteFormUsuario =async (element) => {
    let id = element.dataset.id;
    const tr = document.querySelector(`#user_${id}`);
    const username =  tr.querySelector(".nombre").textContent;
    const confirmDelete = confirm(`Desear eliminar a: ${username}`);

    if (confirmDelete) {
        const response = await enviar(`users/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF.8',
            },
        });
        tr.remove();
    }
}

const loadForm = (data) => {
    const {
        id,
        nombre : name,
        apellidos: last_name,
        telefono: phone,
        direccion:address ,
        tipo: type,
        documento : document,
        email : e_mail,
    } = data;

    users.value = id;
    nombre.value = name;
    apellido.value = last_name;
    telefono.value = phone;
    direccion.value = address;
    tipo.value = type;
    documento.value = document;
    email.value = e_mail;
    politicas.checked = true;
    button.removeAttribute("disabled")
} 

$formulario.addEventListener("submit" ,save)

addEventListener("DOMContentLoaded", (event)=>{
    listar();
    documentos();
    if(!politicas.checked){
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
    if (event.target.matches(".eliminar")) {
        deleteFormUsuario(event.target);   
    }
    if (event.target.matches(".first")) {
        const nodos = tbody;
        const first = event.target.dataset.first;                
        while (nodos.firstChild) {
            nodos.removeChild(nodos.firstChild)
        }
        listar(first)
    }
    if (event.target.matches(".prev")) {
        const nodos = tbody;
        const prev = event.target.dataset.prev;                
        while (nodos.firstChild) {
            nodos.removeChild(nodos.firstChild)
        }
        listar(prev)
    }
    if (event.target.matches(".next")) {
        const nodos = tbody;
        const next = event.target.dataset.next;                
        while (nodos.firstChild) {
            nodos.removeChild(nodos.firstChild)
        }

        listar(next);
    }
    if (event.target.matches(".last")) {
        const nodos = tbody;
        const last = event.target.dataset.last;                
        while (nodos.firstChild) {
            nodos.removeChild(nodos.firstChild)
        }

        listar(last);
    }
});