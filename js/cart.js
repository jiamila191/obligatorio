let articles;
let envioPorcentaje = 0;


function showMiCarrito() {
    let htmlContentToAppend = `
    <div class="row">
        <div class="col-lg-12 p-5">
            <div class="table-responsive">
                <table class="table">
                    <thead class="bg-dark text-white">
                        <tr class="text-center">
                            <th scope="col" class="border-0">
                                <div class="p-2 text-uppercase"> Productos: <span class="badge badge-danger" id="articulos">2</span> </div>
                            </th>
                            <th scope="col" class="border-0">
                                <div class="p-2 text-uppercase"> Cantidad: </div>
                            </th>
                            <th scope="col" class="border-0">
                                <div class="p-2 text-uppercase"> Subtotal: </div>
                            </th>
                            <th scope="col" class="border-0">
                                <div class="p-2 text-uppercase"> Eliminar: </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

      
    `
    
    for (let i = 0; i< articles.length; i++){
        let article = articles[i];
        if (article.currency === "UYU") article.unitCost = article.unitCost / 40;
        htmlContentToAppend += `
                <tr class="border-bottom">
                    <th scope="row" class"border-0">
                        <div class="p-2">  
                            <img src="${article.src}" width="70" class="img-fluid rounded shadow-sm">
                            <div class="ml-3 d-inline-block align-middle">
                                <h5 class="mb-0"> ${article.name} </h5>
                                <span class="text-muted font-weigth-normal font-italic d-block">$ ${article.unitCost}</span>
                            </div>
                        </div>
                    </th>

                    <td class="border-0 align-middle text-center" style="width:15%; ">
                        <div class="col-10 d-inline-flex"> <input class="form-control text-center count-value" type="number" value="${article.count}" min="1" articlePos="${i}">
                        </div>
                    </td>
                    <td  id="subtotal${i}" class="border-0 align-middle text-center"> 
                       $ ${article.unitCost * article.count}
                    </td>
                    <td class="border-0 align-middle text-center"> 
                        <button class="btn ml-1" onclick="eliminarArticulo(${i})">X</button>
                    </td>
                </tr>
    
        `
    }

    htmlContentToAppend += `
              </tbody >
            </div >
        </div >
    </div >
`
    document.getElementById("tablaProductos").innerHTML = htmlContentToAppend;
    let inputsCantidad = document.querySelectorAll(".count-value");
    inputsCantidad.forEach((input) => input.addEventListener("change", (e) => cambiarCantidadProducto(e.target.attributes["articlePos"].value, e.target.value)))

    mostrarResumen();
}

function cambiarCantidadProducto(pos, cant){
    let article = articles[pos];
    article.count = cant;
    document.getElementById(`subtotal${pos}` ).innerHTML = article.unitCost * cant;

    mostrarResumen();
}

function eliminarArticulo(pos){
    articles.splice(pos, 1);
    showMiCarrito();
    mostrarResumen();
}
function mostrarResumen(){
    let subtotalSpan = document.getElementById("subtotalspan");
    let envioSpan = document.getElementById("enviospan");
    let totalSpan = document.getElementById("totalspan");
    

    let subtotalValue = articles.reduce((suma, article) => suma = suma + article.unitCost * article.count, 0);
    subtotalSpan.innerHTML = "$" + subtotalValue;
    envioSpan.innerHTML = "$" + Math.ceil(subtotalValue * envioPorcentaje);
    totalSpan.innerHTML = "$" + Math.ceil(subtotalValue * (envioPorcentaje + 1));
    
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok" ) {
            articles = resultObj.data.articles;
            showMiCarrito();
        }
    })


    document.getElementById("premium").addEventListener("click", () => {
        envioPorcentaje = 0.15
        mostrarResumen();
    }); 
    
    document.getElementById("express").addEventListener("click", () => {
        envioPorcentaje = 0.07
        mostrarResumen();
    });
   
    document.getElementById("estandar").addEventListener("click", () => {
        envioPorcentaje = 0.05
        mostrarResumen();
    });
    

    
    
})
    

    

   