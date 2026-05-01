// mise à jour prix affiché
document.getElementById("prix-max").addEventListener("input", function(){
    document.getElementById("valeur-prix").textContent = document.getElementById("prix-max").value;
})

// gestion du tous et des autres quand ils sont checked
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


// filtre thèmes
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

//filtre titre
document.getElementById("recherche-titre").addEventListener("input", function(){
    let recherche = this.value.toLowerCase();

    document.querySelectorAll(".carte").forEach(carte => {
        let titre = carte.querySelector(".txt-titre").textContent.toLowerCase();
        if (titre.includes(recherche)) {
            carte.style.display = "flex";
        } else {
            carte.style.display = "none";
        }
    });
    titresectionvisible();
});

//filtre auteur
document.getElementById("selection-auteur").addEventListener("change", function(){
    let auteur = this.value;

    document.querySelectorAll(".carte").forEach(carte => {
        if (auteur === "Tous" || carte.getAttribute("data-auteur") === auteur) {
            carte.style.display = "flex";
        } else {
            carte.style.display = "none";
        }
    });
    titresectionvisible();
});

//filtre prix
document.getElementById("prix-max").addEventListener("input", function(){
    document.getElementById("valeur-prix").textContent = this.value;
    let prixMax = parseFloat(this.value);

    document.querySelectorAll(".carte").forEach(carte => {
        let prix = parseFloat(carte.getAttribute("data-prix").replace(",", "."));
        if (prix <= prixMax) {
            carte.style.display = "flex";
        } else {
            carte.style.display = "none";
        }
    });
    titresectionvisible();
});

//filtre date
function filtrerdates(){
    let checktous = document.querySelector(".tous-date");
    let checkitems = document.querySelectorAll(".item-date");
    
    document.querySelectorAll(".carte").forEach(carte => {
        let date = carte.getAttribute("data-date");
        if (checktous.checked){
            carte.style.display = "flex";
            return;
        }
        
        let visble = false ; 
        checkitems.forEach(item => {   
            if(item.checked && item.value === date){
                visble = true;
            }
        });
        carte.style.display = visble ? "flex" : "none";
    });
    titresectionvisible();
}

document.querySelectorAll(".filtre-date input").forEach( input => {
    input.addEventListener("change", filtrerdates);
});

//visibilité section
function titresectionvisible(){
    let sections = ["romance", "fantastique", "science-fiction", "policier", "manga"];

    sections.forEach(theme => {
        let section = document.querySelector("." + theme);

        let cartes = section.querySelectorAll(".carte");
        let aumoinsune = Array.from(cartes).some(carte => carte.style.display !== "none");
        section.style.display = aumoinsune ? "block" : "none";
    })
}


//image qui change au clic
document.querySelectorAll(".images").forEach(image => {
    image.addEventListener("click",function(){
        this.classList.toggle("retourner");
    });
});

//bandeau achat
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

//fenêtre modale
document.querySelectorAll(".modale").forEach(function(element) {
    element.addEventListener("click", function(e) {
        e.preventDefault();
        // On récupère le résumé de la carte cliquée
        let resume = this.getAttribute("data-resume");
        // On l'injecte dans la modale
        document.getElementById("contenu-resume").textContent = resume;
        document.getElementById("modal-livre").style.display = "flex";
    });
});

//fermeture fenêtre modale
document.querySelector(".fermeture").onclick = function() {
    document.getElementById("modal-livre").style.display = "none";
};

