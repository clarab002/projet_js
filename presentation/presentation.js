/*------------- CANVAS -----------------*/

/*
Récupère le contexte 2D d'un canvas à partir de son id.
Le contexte permet de dessiner (forme, couleurs, texte...)
 */
function get2DContext(id){ //récupère le context d'un canva
    // Récupère l'élément <canvas> dans le DOM
    let canvas = document.getElementById(id) //Utilise l'id référencé dans le html
    let context = canvas.getContext("2d"); //Active le mode dessin 2D
    return context;
}

//Dessine un cercle rempli sur le canvas. 
//C'est l'image "à gratter" qui sera ensuite effacée par la souris.
function canvasApp(context){
    context.beginPath(); //commence à faire le tracé
    context.lineWidth = 2; //taille épaisseur à 3
    context.fillStyle = "#4b4b4b"; //remplir notre figure en gris (ici le cercle)
    context.strokeStyle = "#000000"; //la bordure
    context.arc(125, 100, 70, Math.PI, -Math.PI); //trace un cercle entier à la position 125, 100 du canva et de rayon 70
    context.closePath(); //permet de refermer la figure pour faire vraiment le cercle
    context.stroke(); //S'occupe du contour de la figure
    context.fill(); //Applique le remplissage en jaune
}

/*
Permet l'effet grattage
Quand l'utilisateur passe la souris, on efface des zones du canvas. */
function grattage(canvas, context){
    canvas.addEventListener("mousemove", (event)=>{
        const rect = canvas.getBoundingClientRect(); //récupère la position du canvas dans la page.
        //Coordonnées exactes de la souris dans le canvas
        const x = event.clientX - rect.left; 
        const y = event.clientY - rect.top;
        
        //Mode "destination-out": tout ce qu'on dessine s'efface au lieu de vraiment dessiner
        context.globalCompositeOperation = "destination-out";
        // On dessine un petit cercle transparent autour de la souris
        context.beginPath();
        context.arc(x, y, 14, 0, Math.PI*2);
        context.fill();
    })
}

//-----------------------------------------------------------------------------------------
// MODE EDITION

let mode_edition = false; //savoir si le mode edition est activé ou non
let supp = false; 
let carteASupp = null; //Memorise la carte à supprimer
let auteurASupp = null; //Memorise l'auteur à supprimer

//Sélection des éléments importants du DOM
const edit = document.querySelector(".edition"); //s'occupe du bouton edit
const ajouter = document.querySelector(".addMember"); //s'occupe du bouton ajouter un membre
const phrase = document.querySelector(".edit");
const modaleUtilisateur = document.getElementById("modal-utilisateur");
const modalePwd = document.getElementById("modal-password");
const modaleSortie = document.getElementById("modal-sortir");
const modaleSupp = document.getElementById("modal-supp");

//Pour mes auteurs
const ajouter_auteur = document.querySelector(".addAuteur");
const supp_auteur = document.querySelectorAll(".supprimerAuteur");

//Cacher le bouton ajouter un membre tant qu'il n'est pas activé
ajouter.style.display = "none";

//FENETRE D'ACCES

// Affiche la fenêtre demandant le nom d'utilisateur
function afficher_utilisateur(){
    modaleUtilisateur.style.display = "flex";
}

// Affiche la fenêtre demandant le mot de passe
function afficher_pwd(){
    modalePwd.style.display = 'flex';
}


//Vérification du nom utilisateur
document.getElementById("btn-verifier").addEventListener("click",function(){
    //On récupère ce que l'utilisateur à taper dans la zone de texte
    let nom_util = document.getElementById('utilisateur').value;
    if (nom_util === "admin"){ //Si correspond l'accès est autorisé
        //On vide le champ pour qu'il soit propre la prochaine fois
        document.getElementById("utilisateur").value = "";
        //On ferme la modale
        modaleUtilisateur.style.display = 'none';
        //On ouvre la modale du mot de passe avec la fonction afficher_pwd()
        afficher_pwd();
    } else{ //Si non incorrect, on affiche un message d'erreur
        document.getElementById("texteUtil").innerText = "Vous n'avez pas entré le bon nom d'utilisateur";
    }
});

//Vérification mot de passe (Exactement la même chose qu'au dessus)
document.getElementById('btn-verif').addEventListener("click", function(){
    let mdp = document.getElementById("password").value;
    if (mdp == "admin_pwd"){
        document.getElementById("password").value = "";
        modalePwd.style.display = 'none';
        activerModeEdition(); //Active le mode édition
    } else{
        document.getElementById('textePwd').innerText = "Vous n'avez pas entré le bon mot de passe";
    }
});

//Bouton annuler pour les différentes fenêtres modales//

document.getElementById("btn-annul").addEventListener("click", function(){
    modaleUtilisateur.style.display = "none"; //ferme la modale
    document.getElementById("utilisateur").value = ""; //vide le champ
});

//Même chose qu'au dessus
document.getElementById("btn-annulation").addEventListener("click", function(){
    modalePwd.style.display = 'none';
    document.getElementById("password").value = "";
});

//Affiche la fenêtre modale de confirmation pour quitter le mode édition
function sortir(){
    modaleSortie.style.display = 'flex';
}

// Si l'utilisateur confirme qu'il veut quitter
document.getElementById("btn-sortie").addEventListener("click", function(){
    modaleSortie.style.display = 'none';
    desactiverModeEdition(); //Appelle fonction qui ferme le mode édition
});

// Si l'utilisateur annule (même que les boutons annuler d'au dessus)
document.getElementById("btn-nevermind").addEventListener("click", function(){
    modaleSortie.style.display = 'none';
});


//pour la fenêtre modale qui supprime une carte
document.getElementById("btn-supp").addEventListener('click', function(){
    //Si une carte a été sélectionnée pour suppression
    if (carteASupp){
        carteASupp.remove(); //On la supprime du DOM
        carteASupp = null; //On réinitialise la variable
    }

    // Même chose que la carte au dessus mais cette fois-ci concerne les auteurs
    if (auteurASupp){
        auteurASupp.remove();
        auteurASupp = null;
    }

    //Ferme la modale
    modaleSupp.style.display = 'none';
    
})

//S'il clique sur "Annuler" (comme les autres boutons annuler)
document.getElementById('btn-no').addEventListener('click', function(){
    modaleSupp.style.display = "none";
})

//Modification des textes comportants la classe .texte
function modifierTexte(){
    // On sélectionne tous les éléments qui ont la classe .texte
    document.querySelectorAll(".texte").forEach(texte => {
        //contentEditable : attribut énuméré qui indique si l'élément doit être éditable par l'utilisateur
        //On peut modidier les textes concernés s'il est true
        texte.contentEditable = true;
    });
}

//créer un bouton supprimer pour chaque carte
function boutonSupp(carte) {
    //On crée un élément <button> en JavaScript
    const bouton = document.createElement("button");
    //On lui ajoute la classe .supprimer pour appliquer le CSS
    bouton.classList.add("supprimer");

    //Utilisation du bouton pour supprimer toute la carte apportée en paramètre dès qu'on clique dessus
    bouton.addEventListener("click", function() {
        carteASupp = carte; //on mémorise la carte
        modaleSupp.style.display = 'flex'; //On affiche la modale de confirmation de suppression
    });

    //comme on a créer un bouton il faut l'ajouter dans le DOM
    carte.appendChild(bouton);
}

//Activer le mode édition
function activerModeEdition(){
    //indique que le mode édition est activé
    mode_edition = true;
    //pour changer l'apparence du bouton en lui ajoutant la classe active pour le css
    edit.classList.add("active");
    phrase.classList.add("active");

    //Le texte du bouton devient "Exit"
    edit.textContent = "Exit";

    //pour afficher le bouton ajouter un membre
    ajouter.style.display = "inline-block";

    //rendre le texte modifiable
    modifierTexte();

    //ajouter un bouton supprimer sur chaque carte existante
    document.querySelectorAll(".carte").forEach(carte =>{
        boutonSupp(carte);
    });

    //PARTIE AUTEUR

    //Rendre visible le bouton ajouter un auteur
    ajouter_auteur.classList.add("active");

    //On active les boutons supprimer des auteurs
    supp_auteur.forEach(btn => {
        btn.classList.add("active");

        //Quand on clique sur une poubelle d'auteur
        btn.addEventListener("click", function(){
            //On mémorise l'auteur à supprimer
            auteurASupp = btn.parentElement; //le <div id="auteurX">
            //On affiche la modale de confirmation
            modaleSupp.style.display = "flex";
        })
    });
}

//----------------------------------------------------------
//ouvrir fenêtre modal carte (PARTIE FAITE PAR CLARA B)
function ajouterClicCarte(carte){
    carte.addEventListener("click",function(e){
        if(mode_edition) return; //pour pas ouvrir la fenêtre modal quand on est en mode édition
        if (e.target.classList.contains("supprimer")) return;  //pour pas ouvrir la modal si on clique sur la poubelle

        //On remplit la modale avec les infos de la carte
        document.getElementById("modal-carte-nom").textContent = carte.querySelectorAll(".texte")[0].textContent;
        document.getElementById("modal-carte-role").textContent = carte.querySelectorAll(".texte")[1].textContent;
        document.getElementById("modal-carte-description").textContent = carte.querySelectorAll(".texte")[2].textContent;
        //Affiche la modale
        document.getElementById("modal-carte").style.display = "flex";
    });
}

//fermeture modal
document.getElementById("btn-fermer-carte").addEventListener("click",function(){
    document.getElementById("modal-carte").style.display = "none";
});

//on ajoute la modale à chaque carte
document.querySelectorAll(".carte").forEach(carte => {
    ajouterClicCarte(carte);
});

//-------------------------------------------------------------------

//Désactiver le mode édition
function desactiverModeEdition(){
    //On indique que le mode édition est désactivé
    mode_edition = false;

    //Rechanger le style du bouton edition puisqu'on n'est plus dans le mode edition
    edit.classList.remove("active");
    phrase.classList.remove("active");

    //Le bouton redevient "mode édition"
    edit.textContent = "Mode édition";
   
    //Cacher le bouton ajouter un membre
    ajouter.style.display = "none";

    //rendre le texte non modifiable
    document.querySelectorAll(".texte").forEach(texte => {
        //contentEditable : attribut énuméré qui indique si l'élément doit être éditable par l'utilisateur
        //Ici false donc pas modifiables
        texte.contentEditable = false;
    });

    //Retirer les boutons supprimer de chaque
    document.querySelectorAll(".supprimer").forEach(boutons => {
        //retirer les boutons dont la classe est supprimer
        boutons.remove();
    });

    //PARTIE AUTEUR

    //Enleve la classe active partout puisqu'on n'est plus dans le mode édition
    ajouter_auteur.classList.remove("active");
    
    supp_auteur.forEach(btn => {
        btn.classList.remove("active");
    });
}

//ajouter un membre dans l'équipe
function ajouterMembre(){
    //On crée un nouvel espace exactement comme les autres cartes <div>
    const nouvelleCarte = document.createElement("div");
    //On lui ajoute la classe .carte pour qu'elle ait le même style que les autres
    nouvelleCarte.classList.add("carte");

    //ajout de l'id pour travailler sur l'intérieur de la carte
    //Exemple: perso4 correspondra à la 4e carte
    const id = "perso" + (document.querySelectorAll(".carte").length + 1);

    // On remplit la carte avec son HTML inter:
    /*
    Un cercle avec le canvas pour l'effet grattage
    un nom, un role et une description */
    nouvelleCarte.innerHTML = `
    <div class="cercle">
        <canvas class="canva prevention-copie" id="${id}" width="250" height="350"></canvas>
    </div>
    <p class="texte">Nouveau Membre</p>
    <p class="texte role">Rôle dans l'équipe</p>
    <p class="texte description">Description</p>
    `;

    //on ajoute tout ça pour le DOM dans la section .persos
    document.querySelector(".persos").appendChild(nouvelleCarte);

    //on rend son texte modifiable car n'était pas généré lorsqu'on venait juste d'entre dans le mode édition
    modifierTexte();

    //ajout du bouton supprimer
    boutonSupp(nouvelleCarte);

    //initalisation du canva pour le grattage sur la carte (exactement comme dans le main)
    let context = get2DContext(id); //le canva du dessin
    canvasApp(context);
    grattage(document.getElementById(id), context);

    //On ajoute l'événement qui permet d'ouvrir la modale quand on clique sur la carte
    ajouterClicCarte(nouvelleCarte);
}

//Ajouter un nouvel auteur
function ajouterAuteur(){
    //On récupère la div qui contient toutes les cartes auteurs
    const auteursContainer = document.querySelector(".auteurs");

    //On crée un nouvel élément <div> pour représenter un auteur
    const nouvelAuteur = document.createElement("div");
    //Ajout de la classe auteur pour le style CSS
    nouvelAuteur.classList.add("auteur");

    //On remplit la carte avec son HTML:
    /* nom, biographie, liste d'oeuvres, bouton supprimer */
    nouvelAuteur.innerHTML = `
        <h3 class="texte nom-auteur">Nouvel auteur</h3>
        <p class="texte biographie">Biographie de l'auteur</p>
        <h4 class="texte oeuvre">Quelques unes de ses oeuvres :</h4>
        <ul class="texte liste-oeuvres">
            <li>Oeuvre 1</li>
            <li>Oeuvre 2</li>
            <li>Oeuvre 3</li>
        </ul>
        <button class="supprimerAuteur active"></button>
    `;

    //On ajoute cette nouvelle carte auteur dans le DOM
    auteursContainer.appendChild(nouvelAuteur);

    //rendre le texte modifiable
    modifierTexte();

    //gérer le bouton supprimer de ce nouvel auteur
    const btn = nouvelAuteur.querySelector(".supprimerAuteur");
    //En cliquant sur la poubelle (même chose que pour les cartes de l'équipe)
    btn.addEventListener("click", function(){
        auteurASupp = nouvelAuteur; //Mémorise l'auteur à supprimer
        modaleSupp.style.display = "flex"; //Affiche la modale de confirmation
    });
}

//clic pour ajouter auteur
ajouter_auteur.addEventListener("click", function(){
    if(mode_edition){
        ajouterAuteur(); //On ajoute un auteur seulement si le mode édition est activé
    }
});

//clic sur le bouton mode edition
edit.addEventListener("click", function(){
    if(mode_edition){
       sortir(); //Si on est dans le mode édition, on demande confirmation pour quitter
    }
    else {
        afficher_utilisateur(); //Sinon, On demande les identifiants pour se connecter
    }
});

//clic sur ajouter un membre
ajouter.addEventListener("click", function(){
    if(mode_edition){
        ajouterMembre(); //On ajoute un membre seulement en mode édition
    }
});

//-----------------------------------------------------------------------------------
function main(){
    //Partie Grattage et canva
    /*
    On réscupère son contexte 2D, 
    on dessine le cerlce gris et on active l'effet grattage*/
    
    //Initialisation de la première carte
    let context = get2DContext("perso1"); //le canva du dessin
    canvasApp(context);
    grattage(document.getElementById("perso1"), context);
    
    //de la deuxième
    let context1 = get2DContext("perso2"); //le canva du dessin
    canvasApp(context1);
    grattage(document.getElementById("perso2"), context1);

    //de la troisième
    let context2 = get2DContext("perso3"); //le canva du dessin
    canvasApp(context2);
    grattage(document.getElementById("perso3"), context2);

    //-----------------------------------------------------------------

   
}

//On lance la fonction main() au chargement de la page
main();