// survol/clic image = zoom x2
function zoom(e){
    e.target.classList.toggle("zoom");
}

// slogan 
function affichageSlogan(){
    let slogan = ["Des", "histoires", "contées", "par", "nos", "plumes"];
    let endroitSlogan = document.querySelector("#slogan");
    
    let i = 0; 

    let apparition = setInterval(function(){
        endroitSlogan.innerText += " " + slogan[i];
        i++; 
    },500)

    setTimeout(function(){
        clearInterval(apparition);
    },3000)

    setTimeout(function(){
        //endroitSlogan.classList.add("right");
        document.getElementById("div-slogan").classList.add("right");
        //endroitSlogan.style.textAlign = "right";
        //gsap.to("#slogan", { duration: 0.5, textAlign: "right" });
    },4000)

    setTimeout(function(){
        document.getElementById("div-slogan").classList.remove("right")
        document.getElementById("div-slogan").classList.add("left");
    }, 6000)

    setTimeout(function(){
        document.getElementById("div-slogan").classList.remove("left");
    }, 8000)

    setTimeout(function(){
        endroitSlogan.innerText = " ";
    },10500)
    
    setInterval(function(){
        let i = 0; 

        let apparition = setInterval(function(){
            endroitSlogan.innerText += " " + slogan[i];
            i++; 
        },500)

        setTimeout(function(){
            clearInterval(apparition);
        },3000)

        setTimeout(function(){
            document.getElementById("div-slogan").classList.add("right"); // le slogan va à droite
        },4000)

        setTimeout(function(){
            document.getElementById("div-slogan").classList.remove("right")
            document.getElementById("div-slogan").classList.add("left"); // le slogan va à gauche
        }, 6000)

        setTimeout(function(){
            document.getElementById("div-slogan").classList.remove("left"); // le slogan va au milieu
        }, 8000)

        setTimeout(function(){
            endroitSlogan.innerText = " ";
        },10500)
    },10500)
}


function main(){
    document.getElementById("img-bann").addEventListener("click",zoom)
    affichageSlogan();
}
main();