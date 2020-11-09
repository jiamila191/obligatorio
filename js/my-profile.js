document.addEventListener("DOMContentLoaded", function (e) {
    let userData = localStorage.getItem("datos");

    if (userData) {

        userData = JSON.parse(userData)

        if (userData.imgUrl != "") {
            document.getElementById("imagen").src = userData.imgUrl
        }
        document.getElementById("imgUrl").value = userData.imgUrl
        document.getElementById("nombre").value = userData.nombre
        document.getElementById("numero").value = userData.edad
        document.getElementById("email").value = userData.email
        document.getElementById("telefono").value = userData.telefono
    }

    document.getElementById("guardar").addEventListener("click", function (e) {
        let datau = false
        let imgUrl = document.getElementById("imgUrl")
        let nombre = document.getElementById("nombre");
        let edad = document.getElementById("numero");
        let email = document.getElementById("email");
        let telefono = document.getElementById("telefono");

        
        if (!datau) {
            localStorage.setItem("datos", JSON.stringify({
                imgUrl: imgUrl.value,
                nombre: nombre.value,
                edad: edad.value,
                email: email.value,
                telefono: telefono.value
            }));
            document.getElementById("guardado").innerHTML = `
    <br>
    <div class="alert alert-success alert-dismissible show" role="alert">
      <strong>Datos guardados</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>`
        }

    })
   

    });