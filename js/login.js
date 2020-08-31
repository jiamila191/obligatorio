//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

const form = document.getElementById('formulario');
const username = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit',function(event){
    event.preventDefault();
    let user = Array(
        {
            usuario: username.value,
            password: password.value
        }
    );
   localStorage.setItem('user',JSON.stringify(user));
   location.href = 'home.html';
});