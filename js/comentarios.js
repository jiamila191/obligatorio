var comentarios = {};

function showComments(array) {
    let comentarios = "";
    for (let i = 0; i < array.length; i++) {
        let comentario = array[i];
        let estrella = [];
        for (let ii = 0; ii < 5; ii++) {
            if (comentario.score > ii) {
                estrella[ii] = "fa fa-star checked";
            }
            else {
                estrella[ii] = "fa fa-star";
            }
        }
        comentarios += `
       <div class="list-group-item list-group-item-action" >
        <div class="row">
            <img src="img/user.jpg" class="img-thumbnail" style="float:left;width:100px;height:100px; margin-right: 10px;">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ comentario.user + `</h4><br>
                        <small class="font-muted">` + comentario.dateTime + ` </small>                    
                     </div>
                        <div>
                        <span class="`+ estrella[0] + `"></span>
                        <span class="`+ estrella[1] + `"></span>
                        <span class="`+ estrella[2] + `"></span>
                        <span class="`+ estrella[3] + `"></span>
                        <span class="`+ estrella[4] + `"></span>
                        </div>
                     ${comentario.description}
                    </div>
                </div>
            </div>
            `
    }

    document.getElementById("comments-container").innerHTML = comentarios;

}

getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
        comentarios = resultObj.data;
        showComments(comentarios)
    }


});


function comentar() {
    let commnw = {
        "score": undefined,
        "description": undefined,
        "dateTime": undefined
    };
    let estrella = [];
    for (let ii = 0; ii < 5; ii++) {
        if (commnw.score > ii) {
            estrella[ii] = "fa fa-star cheked";
        }
        else {
            estrella[ii] = "fa fa-star unchecked";
        }

    }

    commnw.username = localStorage.getItem("email");
    commnw.score = document.getElementById("puntaje").value;
    commnw.description = document.getElementById("comentarion").value;
    commnw.dateTime = acDate();

    commnw += `
       <div class="list-group-item list-group-item-action" >
        <div class="row">
            <img src="img/user.jpg" class="img-thumbnail" style="float:left;width:100px;height:100px; margin-right: 10px;">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ commnw.username + `</h4><br>
                        <small class="font-muted">` + commnw.dateTime + ` </small>                    
                     </div>
                        <div>
                        <span class="`+ estrella[0] + `"></span>
                        <span class="`+ estrella[1] + `"></span>
                        <span class="`+ estrella[2] + `"></span>
                        <span class="`+ estrella[3] + `"></span>
                        <span class="`+ estrella[4] + `"></span>
                        </div>
                     ${commnw.description}
                    </div>
                </div>
            </div>
            `

    document.getElementById("comments-container").innerHTML += commnw;


}

function acDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var minmin = today.getMinutes();
    var ss = today.getSeconds();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd + " " + hh + ":" + minmin + ":" + ss;
    return today;
}
