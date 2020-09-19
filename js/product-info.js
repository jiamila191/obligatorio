var product = {};
let productInfo;
let productRelatedProducts;

//imagenes 
function showImagesGallery(array) {

  let imagenes = "";

  for (let i = 0; i < array.length; i++) {
    let images = array[i];

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
    //document.getElementById("productRelatedProducts").innerHTML = product.relatedProducts;


  }


});


//productos relacionados

getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
  if (resultObj.status === "ok") {
    productInfo = resultObj.data;

    apInfo();
  }
});

function apInfo() {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInfo = resultObj.data;

      productst();
    }
  });
};

function productst() {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productRelatedProducts = resultObj.data;
    }
    showRelatedProducts();
  });
};


relatedprod = document.getElementById("productsRelated");

function showRelatedProducts() {
  let htmlToAppend = `
       <div class="row justify-content-center">
    `;

  for (let i = 0; i < productInfo.relatedProducts.length; i++) {
    id = productInfo.relatedProducts[i];
    related = productRelatedProducts[id];
    htmlToAppend += `
     <a href="" class="card-link">      
    <div class="col-auto">
              <div class="card" style="width: 18rem;">
                        <img src="${related.imgSrc}" class="card-img-top w-75 d-block mx-auto">
                          <div class="card-header">
                          <h4 class="card-title text-body">${related.name}</h4>
                          </div>

                        <div class="card-body">
                            

                            <p class="card-text text-dark">${related.currency} $ ${related.cost}</p>

                          
                            <p class="card-text text-dark">${related.description}</p>

                        </div>
            </div>
      </div>         
  </a>`;
  }


  relatedprod.innerHTML = htmlToAppend;
}