var product = {};

//imagenes 
function showImagesGallery(array) {

  let imagenes = "";

  for (let i = 0; i < array.length; i++) {
    let images= array[i];

    imagenes += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
            </div>
        </div>
        `

    document.getElementById("productImagesGallery").innerHTML = imagenes;
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;
      datos(product);
      showImagesGallery(product.images)
    }
  });



//informacion
  function datos(product) {
    document.getElementById("productDescription").innerHTML = product.description;
    document.getElementById("productCost").innerHTML = product.cost;
    document.getElementById("productCurrency").innerHTML = product.currency;
    document.getElementById("productName").innerHTML = product.name;
    document.getElementById("productCategory").innerHTML = product.category;
    document.getElementById("productSoldCount").innerHTML = product.soldCount;

  }


});

