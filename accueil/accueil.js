// survol/clic image = zoom x2
function zoom(e){
    e.target.classList.toggle("zoom");
}


// slogan 

function main(){
    document.getElementById("img-bann").addEventListener("click",zoom)
}
main();