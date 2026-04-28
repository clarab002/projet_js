// liste produits +  bouton acheter -> clic = bandeau + smiley

document.getElementById("prix-max").addEventListener("input", function(){
    document.getElementById("valeur-prix").textContent = document.getElementById("prix-max").value;
})

function groupe_filtres(classe_tous,classe_item){
    let checktous = document.querySelector("." + classe_tous);
    let checkitems = document.querySelectorAll("." + classe_item);

    checktous.addEventListener("change",function(){
        if (this.checked){
            checkitems.forEach(item => {item.checked = false;});
        }
    });
    
    checkitems.forEach(item => {
        item.addEventListener("change",function(){
            if (this.checked){
                checktous.checked = false;
            }
        });
    });
}

groupe_filtres("tous-theme","item-theme");
groupe_filtres("tous-date","item-date");

function filtrerthemes(){
    let checktous = document.querySelector(".tous-theme");
    let checkitems = document.querySelectorAll(".item-theme");
    let themes = ["romance", "fantastique", "science-fiction", "policier", "manga"];

    if (checktous.checked){
        themes.forEach(theme => {
            let section = document.querySelector("." + theme);
            if (section) {
                section.style.display = "block";
            }
        });
    } else {
        checkitems.forEach(item => {
            let section = document.querySelector("." + item.value);
            if (section) {
                if (item.checked) {
                    section.style.display = "block";
                } else {
                    section.style.display = "none";
                }
            }
        });
    }
}

document.querySelectorAll(".filtre-theme input").forEach( input => {
    input.addEventListener("change", filtrerthemes);
});

document.querySelectorAll(".images").forEach(image => {
    image.addEventListener("click",function(){
        this.classList.toggle("retourner");
    });
});

function get2DContext(id){
    let canvas = document.getElementById(id);
    let context = canvas.getContext("2d");
    return context;
}

function afficherbandeauachat(context){
    context.clearRect(0, 0, 300, 250); //on nettoye le canvas avant de dessiner
    //on dessine le visage
    context.beginPath();
    context.arc(150,70,40,Math.PI,-Math.PI); //on dessine un cercle
    context.lineWidth = 6; //avec des bords de taille 6
    context.fillStyle = "#AAD4BE" //et le cercle rempli en bleu
    context.strokeStyle = "white" //bord en blanc
    context.stroke(); //on dessine les bords
    context.fill(); //on remplie le cercle

    //on dessine l'oeil gauche
    context.beginPath();
    context.arc(135,60,5,Math.PI,-Math.PI); //cercle à une position
    context.fillStyle = "white"; //le cercle est rempli en blanc
    context.fill(); //on remplie
    
    //on dessine l'oeil droit
    context.beginPath();
    context.arc(165,60,5,Math.PI,-Math.PI); //cercle à une autre position
    context.fillStyle = "white"; //le cercle est rempli en blanc
    context.fill(); //on remplie

    //on dessine la bouche
    context.beginPath();
    context.arc(150,75,20,0,Math.PI); //arc de cercle
    context.strokeStyle = "white" //sourire en blanc
    context.lineWidth = 4; //avec des bords de taille 6
    context.stroke(); //on dessine les bords

    //on affiche le texte
    context.font = "20px sans serif"; //on définie la taille et la police du texte
    context.fillStyle = "white"; //texte en blanc
    context.textAlign = "center"; //on centre le texte
    context.fillText("Vous avez acheté ce produit !",150,160); //affiche le texte à une position choisie
}

document.querySelectorAll(".panier").forEach(achat => {
    achat.addEventListener("click",function(){
        let context = document.getElementById("bandeau-achat").getContext("2d");
        document.getElementById("bandeau-achat").style.display = "block";
        afficherbandeauachat(context);
        setTimeout(() => {
            document.getElementById("bandeau-achat").style.display = "none";
        },3000);
    });
});
