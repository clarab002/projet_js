// survol/clic image = zoom x2
function zoom(e){
    e.target.classList.toggle("zoom");
}

const endroitSlogan = document.querySelector("#slogan");

// slogan 
function affichageSlogan(){
    let slogan = ["Des", "histoires", "contées", "par", "nos", "plumes"]
    console.log(slogan[1]);
    let i = 0; 
    let apparition = setInterval(function(){
        endroitSlogan.innerText += " " + slogan[i];
        i++; 
    },1000)
    setTimeout(function(){
        clearInterval(apparition);
    },6000)
    endroitSlogan.style.transform = translate(70)
}


function main(){
    document.getElementById("img-bann").addEventListener("click",zoom)
    affichageSlogan();
}
main();