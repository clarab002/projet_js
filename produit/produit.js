// MISE À JOUR DU PRIX AFFICHÉ
document.getElementById("prix-max").addEventListener("input", function(){ //on écoute les changement dans le slider de prix
    document.getElementById("valeur-prix").textContent = document.getElementById("prix-max").value; //on met à jour le texte au dessus du slider avec la valeur actuelle
})

//fonction qui colorie la partie gauche du slider du prix
function majbarreprix(){
    let slider = document.getElementById("prix-max"); //on récupère le slider
    let pourcentage = (slider.value - slider.min) / (slider.max - slider.min) * 100; //on calcule là où se trouve le curseur
    slider.style.background = `linear-gradient(to right, #629E85 ${pourcentage}%, #f0f0f0 ${pourcentage}%)`; //on applique le vert à gauche et le gris à droite du curseur
}

majbarreprix(); //on appelle la fonction au chargement de la page pour initialiser la couleur
document.getElementById("prix-max").addEventListener("input",majbarreprix); //on l'appelle à chaque changement du slider

//GESTION DE LA CASSE TOUS ET DES AUTRES QUAND ELLES SONT COCHÉES
function groupe_filtres(classe_tous,classe_item){
    let checktous = document.querySelector("." + classe_tous); //on récupère le cas de "Tous"
    let checkitems = document.querySelectorAll("." + classe_item); //on récupère toutes les autres cases

    //quand on coche "Tous" les autres se décochent
    checktous.addEventListener("change",function(){
        if (this.checked){
            checkitems.forEach(item => {item.checked = false;});
        }
    });
    
    //pour chaque case autre que "Tous"
    checkitems.forEach(item => {
        item.addEventListener("change",function(){
            //si une case est cochée on décoche "Tous"
            if (this.checked){ 
                checktous.checked = false; 
            }
            //si aucune case n'est cochée on coche "Tous"
            let aumoinsunecoche = Array.from(checkitems).some(item => item.checked);
            if (!aumoinsunecoche){
                checktous.checked = true; 
            }
            //si toutes les cases sont cochées on coche "Tous" et on décoche les autres
            let touscoche = Array.from(checkitems).every(item => item.checked);
            if (touscoche){
                checktous.checked = true;
                checkitems.forEach(item => {item.checked = false;});
            }
        });
    });
}

groupe_filtres("tous-theme","item-theme"); //on applique la fonction aux thèmes
groupe_filtres("tous-date","item-date"); //on applique la fonction aux dates

//APPLICATION DES FILTRES EN MÊME TEMPS
function filtres(){
    //on récupère les valeurs de chaque filtre
    let recherche = document.getElementById("recherche-titre").value.toLowerCase();

    let toustheme = document.querySelector(".tous-theme").checked;
    let themescoches = [];
    document.querySelectorAll(".item-theme").forEach(item => {
        if (item.checked) themescoches.push(item.value);
    });

    let prixmax = parseFloat(document.getElementById("prix-max").value);
    let auteurselection = document.getElementById("selection-auteur").value;

    let tousdate = document.querySelector(".tous-date").checked;
    let datescoches = [];
    document.querySelectorAll(".item-date").forEach(item => {
        if (item.checked) datescoches.push(item.value);
    });

    //on applique les filtres sur chaque carte
    document.querySelectorAll(".carte").forEach(carte => {
        //on récupère les informations de la carte
        let titre = carte.querySelector(".txt-titre").textContent.toLowerCase();
        let theme = carte.getAttribute("data-theme");
        let prix = parseFloat(carte.getAttribute("data-prix"));
        let auteur = carte.getAttribute("data-auteur");
        let date = carte.getAttribute("data-date");

        //on vérifie si la carte correspond aux filtres
        let oktitre = titre.includes(recherche);
        let oktheme = toustheme || themescoches.includes(theme);
        let okprix = prix <= prixmax;
        let okauteur = auteurselection === "Tous" || auteur === auteurselection;
        let okdate = tousdate || datescoches.includes(date);

        //si elle correspond à tous les filtres on l'affiche
        carte.style.display = (oktitre && oktheme && okprix && okauteur && okdate) ? "flex" : "none";
    });
    titresectionvisible(); //on met à jour la visibilité des titres de section
}

//à chaque fois qu'on change un filtre on appelle la fonction
document.getElementById("recherche-titre").addEventListener("input",filtres);
document.querySelectorAll(".filtre-theme input").forEach( input => {
    input.addEventListener("change", filtres);
});
document.getElementById("prix-max").addEventListener("input",filtres);
document.getElementById("selection-auteur").addEventListener("change", filtres);
document.querySelectorAll(".filtre-date input").forEach( input => {
    input.addEventListener("change", filtres);
});

//VISIBILITÉ TITRES SECTIONS
function titresectionvisible(){
    let sections = ["romance", "fantastique", "science-fiction", "policier", "manga"];
    let aumoinsunevisible = false;

    //pour chaque section on regarde s'il y a au moins une carte de la section qui visible si oui on affiche le titre sinon on le cache
    sections.forEach(theme => {
        let section = document.querySelector("." + theme);
        let cartes = section.querySelectorAll(".carte");
        let aumoinsune = Array.from(cartes).some(carte => carte.style.display !== "none");
        section.style.display = aumoinsune ? "block" : "none";
        if (aumoinsune) aumoinsunevisible = true;
    });
    document.getElementById("msg-aucun-resultat").style.display = aumoinsunevisible ? "none" : "block"; //si aucune section n'est visble on affiche un message
}

//RÉINITIALISATION DES FILTRES
function reinitialisation(){
    document.getElementById("recherche-titre").value = ""; //on vide la barre de recherche

    document.querySelector(".tous-theme").checked = true; //on coche "Tous" pour les thèmes
    document.querySelectorAll(".item-theme").forEach(item => item.checked = false); //on décoche les autres cases des thèmes

    //on met à jour le prix au maximum
    document.getElementById("prix-max").value = 25;
    majbarreprix();
    document.getElementById("valeur-prix").textContent = 25;

    document.getElementById("selection-auteur").value = "Tous"; //on remet l'auteur sur "Tous"

    document.querySelector(".tous-date").checked = true; //on coche "Tous" pour les dates
    document.querySelectorAll(".item-date").forEach(item => item.checked = false); //on décoche les autres cases des dates

    filtres(); //on relance les filtres pour tout afficher correctement
}

document.getElementById("btn-reinitialisation").addEventListener("click",reinitialisation);

//IMAGE QUI CHANGE AU CLIC
document.querySelectorAll(".images").forEach(image => {
    image.addEventListener("click",function(){
        this.classList.toggle("retourner"); //on ajoute ou retire la classe "retourner" qui change l'opcaité des 2 images
    });
});

//BANDEAU ACHAT
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

//pour chaque bouton acheter
document.querySelectorAll(".panier").forEach(achat => {
    achat.addEventListener("click",function(){
        let context = document.getElementById("bandeau-achat").getContext("2d");
        document.getElementById("bandeau-achat").style.display = "block";
        afficherbandeauachat(context); //on dessine le smiley et le texte
        //après 3 secondes on cache le bandeau
        setTimeout(() => {
            document.getElementById("bandeau-achat").style.display = "none";
        },3000);
    });
});

//FENÊTRE MODALE RÉSUMÉ
document.querySelectorAll(".modale").forEach(function(element) {
    element.addEventListener("click", function(e) {
        e.preventDefault();
        let resume = this.getAttribute("data-resume"); //on récupère le résumé de la carte cliquée
        document.getElementById("contenu-resume").textContent = resume; //on l'injecte dans la modale
        document.getElementById("modal-livre").style.display = "flex"; //on affiche la modale
    });
});

//fermeture fenêtre modale
document.querySelector(".fermeture").onclick = function() {
    document.getElementById("modal-livre").style.display = "none"; //on cache la modale
};
