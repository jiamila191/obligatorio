
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



