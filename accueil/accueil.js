// Grossit la taille de l'image
function zoom(e){
    e.target.classList.toggle("zoom");
}

// Gère le mouvement du slogan
function affichageSlogan(){
    const slogan = ["Des", "histoires", "contées", "par", "nos", "plumes"];
    const endroitSlogan = document.querySelector("#slogan");
    
    // -----Affiche la slogan à l'arrivée sur la page-----
    let i = 0; 

    // Affiche le slogan mot par mot toutes les 0.5 secondes
    let apparition = setInterval(function(){ 
        endroitSlogan.innerText += " " + slogan[i];
        i++; 
    },500);

    setTimeout(function(){
        clearInterval(apparition);
    },3000);

    setTimeout(function(){
        document.getElementById("div-slogan").classList.add("right"); // Déplace le slogan à droite de la page
    },4000);

    setTimeout(function(){
        document.getElementById("div-slogan").classList.remove("right");
        document.getElementById("div-slogan").classList.add("left"); // Déplace le slogan à gauche de la page
    }, 6000);

    setTimeout(function(){
        document.getElementById("div-slogan").classList.remove("left"); // Déplace le slogan au milieu de la page
    }, 8000);

    setTimeout(function(){
        endroitSlogan.innerText = " "; // Efface le slogan
    },10500);
    // ---------------------------------------------------

    // -----Boucle qui gère tous les autres affichages du slogan-----
    setInterval(function(){
        let i = 0; 

        // Affiche le slogan mot par mot toutes les 0.5 secondes
        let apparition = setInterval(function(){
            endroitSlogan.innerText += " " + slogan[i];
            i++; 
        },500);

        setTimeout(function(){
            clearInterval(apparition);
        },3000);

        setTimeout(function(){
            document.getElementById("div-slogan").classList.add("right"); // Déplace le slogan à droite de la page
        },4000);

        setTimeout(function(){
            document.getElementById("div-slogan").classList.remove("right");
            document.getElementById("div-slogan").classList.add("left"); // Déplace le slogan à gauche de la page
        }, 6000);

        setTimeout(function(){
            document.getElementById("div-slogan").classList.remove("left"); // Déplace le slogan au milieu de la page
        }, 8000);

        setTimeout(function(){
            endroitSlogan.innerText = " "; // Efface le slogan
        },10500);
    },10500);
    // -------------------------------------------------------------
}

function main(){
    document.getElementById("img-bann").addEventListener("click",zoom); 
    affichageSlogan(); // Lance l'affichage du slogan
}
main();