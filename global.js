// header
// menu + horloge + clic logo + navigation + loader + presentation equipe (demande)

// LOADER -------------------------------------------------------------------------------------------------------
let angle = 0;
let loaderInterval;
const icon = document.getElementById('icon');
const canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = 32;
const context = canvas.getContext('2d');

function drawLoader() {
    
    // Nettoyer le canvas
    context.clearRect(0, 0, 32, 32);

    // Dessiner le cercle de chargement
    context.beginPath();
    context.arc(16, 16, 12, angle, angle + Math.PI * 1.5); // Un arc de 270 degrés
    context.strokeStyle = '#3498db'; // Couleur du loader
    context.lineWidth = 4;
    context.stroke();

    // Mettre à jour l'icône avec le contenu du canvas
    icon.href = canvas.toDataURL('image/png');

    // Faire progresser l'angle pour l'animation
    angle += 0.01;
    //loaderInterval = requestAnimationFrame(drawLoader);
    loaderInterval = setInterval(function(){
        drawLoader()},1);
}
// --------------------------------------------------------------------------------------------------------------

// 
function delay(event){
    let body = document.body;
    let buttons = document.getElementsByTagName("button");
    let loader = setInterval(
        function(){
            drawLoader();
            body.classList.add("loader");
            for (let button of buttons){
                button.classList.add("loader");
            }
            clearInterval(loaderInterval);
        },1
    );
    setTimeout(
        function(){
            clearInterval(loader);
            clearInterval(loaderInterval);
            icon.href = "../img/logo.png";
            let classe = event.target.classList;
            window.location.href = `../${classe[0]}/${classe[0]}.html`;
            console.log("L'ancienne couleur était : blanc, rgb(255, 255, 255) et la nouvelle est : vert, rgb(170, 212, 190)")
            body.classList.remove("loader");
            for (let button of buttons){
                button.classList.remove("loader");
            }  
        },2000
    )
}
// --------------------------------------------------------------------------------------------------------------

// HORLOGE ------------------------------------------------------------------------------------------------------
function addSegments(digitId){
    for(let i=0; i<7;i++){ // parcourt les chiffres de 0 à 6
        const segment = document.createElement('div'); // crée une balise div
        segment.classList.add("segment", "off", `segment${i}`); // ajoute les classes à segment
        document.getElementById(digitId).appendChild(segment); // ajoute chaque segment à la partie du document correspondant à digitId
    }
}

function updateDigit(digitId, value){
    let segmentStates = [
        [1, 1, 1, 0, 1, 1, 1], // valeurs pour afficher un 0
        [0, 0, 1, 0, 0, 1, 0], // valeurs pour afficher un 1
        [1, 0, 1, 1, 1, 0, 1], // valeurs pour afficher un 2
        [1, 0, 1, 1, 0, 1, 1], // valeurs pour afficher un 3
        [0, 1, 1, 1, 0, 1, 0], // valeurs pour afficher un 4
        [1, 1, 0, 1, 0, 1, 1], // valeurs pour afficher un 5
        [1, 1, 0, 1, 1, 1, 1], // valeurs pour afficher un 6
        [1, 0, 1, 0, 0, 1, 0], // valeurs pour afficher un 7
        [1, 1, 1, 1, 1, 1, 1], // valeurs pour afficher un 8
        [1, 1, 1, 1, 0, 1, 1]  // valeurs pour afficher un 9
    ];
    let number = segmentStates[value]; // récupère la ligne correspondant à value
    let segments = document.getElementById(digitId).querySelectorAll(".segment"); // récupère la liste de toutes les balises avec la classe segment

    segments.forEach(function(segment,i){ // parcours segments avec la méthode d'itération forEach
        number[i] == 1?segment.classList.remove("off"):segment.classList.add("off"); // si le nombre est égal à 1 on enlève la classe off à segment sinon on ajoute la classe off à segment
    })
}

function init(){
    addSegments("hours-tens"); // applique la fonction au chiffre des dizaines des heures
    addSegments("hours-units"); // applique la fonction au chiffre des unités des heures
    addSegments("minutes-tens"); // applique la fonction au chiffre des dizaines des minutes
    addSegments("minutes-units"); // applique la fonction au chiffre des unités des minutes
}
// --------------------------------------------------------------------------------------------------------------

// CHRONOMETRE --------------------------------------------------------------------------------------------------
function chrono(){
    let seconds = 0;
    let minutes = 0;
    setInterval(
        function(){
            seconds++;
            if (seconds<10){
                if (minutes<10){
                    document.getElementById("chrono").innerHTML = `0${minutes} : 0${seconds}`;
                } else{
                    document.getElementById("chrono").innerHTML = `${minutes} : 0${seconds}`;
                }
            } else {
                if (minutes<10){
                    document.getElementById("chrono").innerHTML = `0${minutes} : ${seconds}`;
                } else{
                    document.getElementById("chrono").innerHTML = `${minutes} : ${seconds}`;
                }
            }
            if (seconds >= 59){
                minutes++;
                seconds = -1;
            }
        },1000
    )
    setInterval(
        function(){
            
        }
    )
}
// --------------------------------------------------------------------------------------------------------------


main();

// footer
// numero tel, validation,  sonnerie + adresses 

// copie element

// erreurs

function main(){
    chrono();
    for (element of document.getElementsByClassName("a_propos")){
        element.addEventListener("click", delay);
    }
    for (element of document.querySelectorAll(".accueil")){
        element.addEventListener("click", delay);
    }
    for (element of document.getElementsByClassName("contact")){
        element.addEventListener("click", delay);
    }
    for (element of document.getElementsByClassName("presentation")){
        element.addEventListener("click", delay);
    }
    for (element of document.getElementsByClassName("produit")){
        element.addEventListener("click", delay);
    }
    init(); // appelle la fonction init
    setInterval( // début de l'intervalle
        function(){
            const heure = new Date(); // récupère l'heure actuelle
            updateDigit("hours-tens",heure.toLocaleTimeString('fr-FR')[0]); // affiche le chiffre des dizaines des heures
            updateDigit("hours-units",heure.toLocaleTimeString('fr-FR')[1]); // affiche le chiffre des unités des heures
            updateDigit("minutes-tens",heure.toLocaleTimeString('fr-FR')[3]); // affiche le chiffre des dizaines des minutes
            updateDigit("minutes-units",heure.toLocaleTimeString('fr-FR')[4]); // affiche le chiffre des unités des minutes
    
        },1000
    );
}
main();