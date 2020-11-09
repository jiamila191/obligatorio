//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
});
let minCount = undefined;
let maxCount = undefined;
let currentProductArray = [];
let ORDER_MENOR = "AZ";
let ORDER_BY_VENDIDOS = "";
let ORDER_MAYOR = "ZA"


function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_MENOR) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_MAYOR) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_VENDIDOS) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }
    return result;
}

function sortAndShowProducts(sort) {
    currentProductArray = sortProducts(sort, currentProductArray);
    showProductsList();
}


function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductArray.length; i++) {
        let product = currentProductArray[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
            htmlContentToAppend += `  
                            <a href="product-info.html" class="list-group-item list-group-item-action col-md-3 mx-1 my-2">
                            <div class="row px-1">
                                <div>
                                <img src="`+ product.imgSrc + `" class="card-img img-fluid" width="96" height="350" alt="">
                                </div>
                            </div>
                            <div class="row my-1 px-2">
                                <div class="bg-light text-center">
                                <h4 class="mb-1">` + product.name + `</h4>
                                <div class="mb-2">
                                    <p class="text-muted"> `+ product.description + ` </p>
                                </div>

                                <h3 class="mb-0 font-weight-semibold">`+ product.currency + `` + product.cost + `</h3>
                                <div class="text-muted mb-3">
                                    <small class="text-muted">` + product.soldCount + ` venididos</small>
                                </div>
                                <button type="button" class="btn bg-cart" href="product-info.html"> Ver producto</button>
                                </div>
                            </div>
                            </a>    
                        `

        }
    }

    document.getElementById("products").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductArray = resultObj.data;
            showProductsList();
        }
    });
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_MENOR);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_MAYOR);
    });
    document.getElementById("sortPop").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_VENDIDOS);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        maxCount = undefined;
        minCount = undefined;


        showProductsList();
    });
});