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
        context.arc(x, y, 14, 0, Math.PI*2);
        context.fill();
    })
}

//-----------------------------------------------------------------------------------------
// MODE EDITION
let mode_edition = false; //savoir si le mode edition est activé ou non

const edit = document.querySelector(".edition"); //s'occupe du bouton edit
const ajouter = document.querySelector(".addMember"); //s'occupe du bouton ajouter un membre
const phrase = document.querySelector(".edit");

//Cacher le bouton ajouter un membre
ajouter.style.display = "none";

//Demande d'accès
function demanderAcces(){
    const utilisateur = prompt("Nom d'utilisateur : ") //nom pour y accéder: admin
    if (utilisateur !== "admin"){
        alert("Nom incorrect");
        return false; //accès refusé
    }
    //même chose pour le mot de passe (mdp) qui est: admin_pwd
    const mdp = prompt("Mot de passe : ") 
    if (mdp !== "admin_pwd"){
        alert("Mot de passe incorrect");
        return false; //accès refusé
    }

    alert("Vous êtes maintenant sur le mode édition. Vous pouvez maintenant faire des modifications");
    return true; //accès autorisé
}

//Modification des textes comportants la classe texte
function modifierTexte(){
    document.querySelectorAll(".texte").forEach(texte => {
        //contentEditable : attribut énuméré qui indique si l'élément doit être éditable par l'utilisateur
        texte.contentEditable = true;
    });
}

//créer un bouton supprimer pour chaque carte
function boutonSupp(carte) {
    const bouton = document.createElement("button");
    bouton.classList.add("supprimer");

    //Utilisation du bouton pour supprimer toute la carte apportée en paramètre dès qu'on clique dessus
    bouton.addEventListener("click", function() {
        if (confirm("Voulez-vous supprimer ce membre ?")){
            carte.remove();
        }
    });

    //comme on a créer un bouton il faut l'ajouter dans le DOM
    carte.appendChild(bouton);
}

//Activer le mode édition
function activerModeEdition(){
    mode_edition = true;
    //pour changer l'apparence du bouton en lui ajoutant la classe active pour le css
    edit.classList.add("active");
    phrase.classList.add("active");
    edit.textContent = "Exit";
    //pour afficher le bouton ajouter un membre
    ajouter.style.display = "inline-block";
    //rendre le texte modifiable
    modifierTexte();
    //ajouter un bouton pour supprimer une carte
    document.querySelectorAll(".carte").forEach(carte =>{
        boutonSupp(carte);
    });
}

//Désactiver le mode édition
function desactiverModeEdition(){
    mode_edition = false;

    //Rechanger le style du bouton edition puisqu'on n'est plus dans le mode edition
    edit.classList.remove("active");
    phrase.classList.remove("active");
    edit.textContent = "Edit";
    
    //Cacher le bouton ajouter un membre
    ajouter.style.display = "none";

    //rendre le texte non modifiable
    document.querySelectorAll(".texte").forEach(texte => {
        //contentEditable : attribut énuméré qui indique si l'élément doit être éditable par l'utilisateur
        texte.contentEditable = false;
    });

    //Retirer les boutons supprimer
    document.querySelectorAll(".supprimer").forEach(boutons => {
        //retirer les boutons dont la classe est supprimer
        boutons.remove();
    });
}

//ajouter un membre
function ajouterMembre(){
    //On créé un nouvel espace exactement comme les autres cartes
    const nouvelleCarte = document.createElement("div");
    nouvelleCarte.classList.add("carte");

    //ajout de l'id pour travailler sur l'intérieur de la carte
    const id = "perso" + (document.querySelectorAll(".carte").length + 1);

    //
    nouvelleCarte.innerHTML = `
    <div class="cercle">
        <canvas class="canva prevention-copie" id="${id}" width="250" height="350"></canvas>
    </div>
    <p class="texte">Nouveau Membre</p>
    `;

    //on ajoute tout ça pour le DOM
    document.querySelector(".persos").appendChild(nouvelleCarte);

    //on rend son texte modifiable car n'était pas généré lorsqu'on venait juste d'entre dans le mode édition
    modifierTexte();
    //ajout du bouton supprimer
    boutonSupp(nouvelleCarte);

    //initalisation du canva pour le grattage sur la carte (exactement comme dans le main)
    let context = get2DContext(id); //le canva du dessin
    canvasApp(context);
    grattage(document.getElementById(id), context);
}

//clic sur le mode edition
edit.addEventListener("click", function(){
    if(mode_edition){
        if (confirm("Voulez-vous quitter le mode édition ?")){
            desactiverModeEdition();
        }
        return;
    }
    if(demanderAcces()){
        activerModeEdition();
    }
});

//clic sur ajouter un membre
ajouter.addEventListener("click", function(){
    if(mode_edition){
        ajouterMembre();
    }
});

//-----------------------------------------------------------------------------------
function main(){
    //Partie Grattage et canva
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

    
}

main();