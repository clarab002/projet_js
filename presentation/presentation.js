/*------------- CANVAS -----------------*/

function get2DContext(id){ //récupère le context d'un canva
    let canvas = document.getElementById(id) //Utilise l'id référencé dans le html
    let context = canvas.getContext("2d"); 
    return context; 
}


function canvasApp(context){
    context.beginPath(); //commence à faire le tracé
    context.lineWidth = 2; //taille à 3
    context.fillStyle = "#4b4b4b"; //remplir notre figure en jaune (ici le cercle)
    context.strokeStyle = "#000000"; //la bordure sera en noir
    context.arc(125, 100, 70, Math.PI, -Math.PI); //trace un cercle entier à la position 100, 100 du canva et de rayon 75
    context.closePath(); //permet de refermer la figure pour faire vraiment le cercle
    context.stroke(); //S'occupe du contour de la figure
    context.fill(); //Applique le remplissage en jaune

    //Pour le texte
    context.textBaseline = "middle"; //centre le texte au milieu
    context.textAlugn = "center";
    context.font = "20px sans serif"; //taille 20 pixels en police sans-serif
    //context.fillText("Hello Canvas!", 45, 200); //trace le texte
}

function grattage(canvas, context){
    canvas.addEventListener("mousemove", (event)=>{
        const rect = canvas.getBoundingClientRect(); //récupère la position et la taille du canvas dans la page.
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        context.globalCompositeOperation = "destination-out";
        context.beginPath();
        context.arc(x, y, 18, 0, Math.PI*2);
        context.fill();
    })
}

//-----------------------------------------------------------------------------------------
// MODE EDITION

//Acitver le mode edition
function activerMode(){
    edit = true;
    edit.classList.add("edit");

    //rendre les noms modifiables
    document.querySelectorAll(".nom").forEach(nom => {
        
    })

    //ajouter un bouton suppression sur chaque carte
    
}

//-----------------------------------------------------------------------------------------
function main(){
    let context = get2DContext("perso1"); //le canva du dessin
    canvasApp(context);
    grattage(document.getElementById("perso1"), context);

    let context1 = get2DContext("perso2"); //le canva du dessin
    canvasApp(context1);
    grattage(document.getElementById("perso2"), context1);

    let context2 = get2DContext("perso3"); //le canva du dessin
    canvasApp(context2);
    grattage(document.getElementById("perso3"), context2);

    //-----------------------------------------------------------------
    let mode_edition = false; //savoir si le mode edition est activé ou non

    const edit = document.getElementsByClassName("edition");
    const ajouter = document.getElementsByClassName("addMember");

    
    //Clic sur le bouton d'édition
    edit.addEventListener("click", function(){
    //pour quitter le mode édition
    if (mode_edition == true){
        
    }
})
}

main();