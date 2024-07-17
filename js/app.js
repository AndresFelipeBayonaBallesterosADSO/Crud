const $formulario = document.querySelector('form');
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipo = document.querySelector("#tipo");
const documento = document.querySelector("#documento");
const boton = document.querySelector("#politicas");

const validar = (event) => {
    event.preventDefault();
    if (nombre.value === "") {
        // alert("El nombre es obligatorio");
        nombre.focus();
        nombre.classList.add("error");
    }
    if (apellido.value === "") {
        // alert("El apellido es obligatorio");
        apellido.focus();
        apellido.classList.add("error");
    }
    if (telefono.value === "") {
        // alert("El telefono es obligatorio");
        telefono.focus();
        telefono.classList.add("error");
    }
    if (direccion.value === "") {
        // alert("La dirección es obligatorio");
        direccion.focus();
        direccion.classList.add("error");
    }
    if (tipo.value === "") {
        // alert("El tipo de documento es obligatorio");
        tipo.focus();
        tipo.classList.add("error");
    }
    if (documento.value === "") {
        // alert("El documento es obligatorio");
        documento.focus();
        documento.classList.add("error");
    }
}

const remover = (e, input) =>{
    if (input.value != "") {
        input.classList.remove("error");
        input.classList.add("correcto")
    }
};


$formulario.addEventListener('submit', validar)

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


documento.addEventListener("keypress", (event)=> {
    console.log(event);
    console.log(this.value);
});


const SoloNumeros = function(event){
    if (event.keyCode < 48 || event.keyCode > 57)
        event.preventDefault();
}

const SoloLetras = (event, elemento)=>{
    let letras = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (letras.test(event.key)) {
        console.log("Si")
    }
    else{
        console.log("No")
        event.preventDefault();
    }
};
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