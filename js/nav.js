const usernav = document.getElementById('usernav');
const close = document.getElementById('colse');

let username = JSON.parse(localStorage.getItem('user'));

if (username != null) {
    usernav.innerHTML = '<a href="home.html "id="close" class="nav-item nav-link active">' + username[0].usuario + '</a>';
    
}else{
    usernave.innerHTML = '<a href="index.html" id="close" class="nav-item nav-link active">Ingresar</a>';
}

close.addEventListener('click',function(){
    localStorage.clear('user')
    location.href='index.html'
});

console.log(username);