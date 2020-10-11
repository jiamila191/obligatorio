let articles 
function showMiCarrito(articles) {
    let htmlContentToAppend = "";
    let article = articles[0];
    UnitCost = article.unitCost;
    document.getElementById("name").innerHTML = article.name;
    document.getElementById("unitCost").innerHTML = article.currency + 
    article.unitCost;
    document.getElementById("count").value = article.count;
    document.getElementById("articulos").innerHTML = articles.length;
    document.getElementById("imagen").src = article.src;

    Subtotal();
    Total();


}



//
let envio = [];
function Total() {
    let penvioHTML = document.getElementById("envio");
    let totalCostHTML = document.getElementById("totalCost");

    let senvio = "UYU" + Math.round((envio * subtotal));
    total = (Math.round(subtotal * envio * 100) / 100 + subtotal);

    penvioHTML.innerHTML = senvio;
    totalCostHTML.innerHTML = "UYU"  + total ;
}

function Subtotal() {
    let cantidad = document.getElementById("count").value;
    subtotal = (cantidad * UnitCost);
    document.getElementById("subtotal").innerHTML = "UYU" +  subtotal;

}



document.getElementById("count").addEventListener("change", function () {
        Subtotal();
        Total ();
})
document.getElementById("premium").addEventListener("change", function () {
    envio = 0.15;
        Total ();
});

document.getElementById("express").addEventListener("change", function () {
    envio = 0.07;
        Total ();
});

document.getElementById("estandar").addEventListener("change", function () {
    envio = 0.05;
        Total ();
});




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

   
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showMiCarrito(resultObj.data.articles);
        }
    })
})
    

    

   