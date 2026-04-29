// survol/clic image = zoom x2
function zoom(e){
    console.log(e.target.classList);
    e.target.classList.toggle("zoom");
}


// slogan 

function main(){
    document.getElementById("img-bann").addEventListener("click",zoom)
}
main();