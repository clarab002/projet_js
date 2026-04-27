const formulaire = document.querySelector('#contactForm');
const boutonEnvoyer = document.querySelector('#btn-envoyer');
const modaleJeu = document.querySelector('#modal-jeu');

const champNom = document.querySelector('#nom');
const champEmail = document.querySelector('#email');
const champMessage = document.querySelector('#message');

const erreurNom = document.querySelector('#err-nom');
const erreurEmail = document.querySelector('#err-email');
const erreurMessage = document.querySelector('#err-message');

function verifierSaisie() {
    const nomEstValide = champNom.value.trim().split(' ').length >= 2 && champNom.value.trim() !== "";
    const emailEstValide = champEmail.value.trim().includes('@') && champEmail.value.trim().includes('.');
    const messageEstValide = champMessage.value.length >= 20 && champMessage.value.length <= 1000;

    if (!nomEstValide) { // mettre champNom.value.trim() != "" si on veut pas que les mass apparaissent dès la début
        erreurNom.style.display = 'block';
    } else {
        erreurNom.style.display = 'none';
    }

    if (!emailEstValide) {
        erreurEmail.style.display = 'block';
    } else {
        erreurEmail.style.display = 'none';
    }

    if (!messageEstValide) {
        erreurMessage.style.display = 'block';
    } else {
        erreurMessage.style.display = 'none';
    }

    if (nomEstValide && emailEstValide && messageEstValide) {
        boutonEnvoyer.disabled = false;
        boutonEnvoyer.style.backgroundColor = "#629e85"; 
        boutonEnvoyer.style.cursor = "pointer";
    } else {
        boutonEnvoyer.disabled = true;
        boutonEnvoyer.style.backgroundColor = "#ccc"; 
        boutonEnvoyer.style.cursor = "not-allowed";
    }
}

function choix(event) {
    const choixJoueur = event.target.id;
    console.log(choixJoueur);
    const options = ['pierre', 'feuille', 'ciseaux'];
    const choixOrdi = options[Math.floor(Math.random() * 3)];
    const affichage = document.querySelector('#resultat-combat');
    const message = document.querySelector('#messages');
    
    let resultat = `L'ordinateur a joué ${choixOrdi} ➜ `;

    if (choixJoueur === choixOrdi) {
        affichage.innerText = resultat + "Égalité ! (Vous pouvez rejouer)";
        affichage.style.color = "orange";
    } else if ((choixJoueur === 'pierre' && choixOrdi === 'ciseaux') || (choixJoueur === 'feuille' && choixOrdi === 'pierre') || (choixJoueur === 'ciseaux' && choixOrdi === 'feuille')) {
        affichage.innerText = resultat + "Vous avez gagné !";
        affichage.style.color = "green";
        message.innerText = "Le message vient d'être envoyé";
        message.style.color = "green";
        document.getElementById("pierre").disabled = true;
        document.getElementById("feuille").disabled = true;
        document.getElementById("ciseaux").disabled = true;

        setTimeout(() => {
            modaleJeu.style.display = "none";
            affichage.innerText = "";
            message.innerText = "";
            document.getElementById("pierre").disabled = false;
            document.getElementById("feuille").disabled = false;
            document.getElementById("ciseaux").disabled = false;
            formulaire.reset();
            verifierSaisie(); // Réaffiche les erreurs après reset
        }, 2000);
    } else {
        affichage.innerText = resultat + "Vous avez perdu !";
        affichage.style.color = "red";
        message.innerText = "Le message vient d'être supprimé";
        message.style.color = "red";
        document.getElementById("pierre").disabled = true;
        document.getElementById("feuille").disabled = true;
        document.getElementById("ciseaux").disabled = true;
        setTimeout(() => {
            modaleJeu.style.display = "none";
            affichage.innerText = "";
            message.innerText = "";
            document.getElementById("pierre").disabled = false;
            document.getElementById("feuille").disabled = false;
            document.getElementById("ciseaux").disabled = false;
            formulaire.reset();
            verifierSaisie(); // Réaffiche les erreurs après reset
        }, 2000);
    }
}

function jouer(e){
    e.preventDefault();
    modaleJeu.style.display = "flex"; 
}

function main() {
    champNom.addEventListener('input', verifierSaisie);
    champEmail.addEventListener('input', verifierSaisie);
    champMessage.addEventListener('input', verifierSaisie);

    boutonEnvoyer.addEventListener('click',jouer);

    document.querySelector('#pierre').addEventListener('click', choix);
    document.querySelector('#feuille').addEventListener('click', choix);
    document.querySelector('#ciseaux').addEventListener('click', choix);

    verifierSaisie();
}
main();