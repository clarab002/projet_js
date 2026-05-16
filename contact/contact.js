const boutonEnvoyer = document.querySelector('#btn-envoyer');
const modaleJeu = document.querySelector('#modal-jeu');

const champNom = document.querySelector('#nom');
const champEmail = document.querySelector('#email');
const champMessage = document.querySelector('#message');

// Vérifie si les conditions de validation de chaques champs sont respectées 
function verifierSaisie() {
    const nomValide = champNom.value.trim().split(' ').length >= 2 && champNom.value.trim() !== ""; // Valide si le champ n'est pas vide et a au moins deux mots dedant
    const emailValide = champEmail.value.trim().includes('@') && champEmail.value.trim().includes('.'); // Valide si il y a un @ et un .
    const messageValide = champMessage.value.length >= 20 && champMessage.value.length <= 1000; // Valide si il y plus de 20 caractères et moins de 1000

    // Affiche les messages d'erreur si les conditions ne sont pas respectées 
    if (!nomValide) { 
        document.querySelector('#err-nom').style.display = 'block';
    } else {
        document.querySelector('#err-nom').style.display = 'none';
    }

    if (!emailValide) {
        document.querySelector('#err-email').style.display = 'block';
    } else {
        document.querySelector('#err-email').style.display = 'none';
    }

    if (!messageValide) {
        document.querySelector('#err-message').style.display = 'block';
    } else {
        document.querySelector('#err-message').style.display = 'none';
    }

    // Permet de clique sur le bouton si toutes les conditions sont respectées
    if (nomValide && emailValide && messageValide) {
        boutonEnvoyer.disabled = false;
        boutonEnvoyer.style.backgroundColor = "#629e85"; 
        boutonEnvoyer.style.cursor = "pointer";
    } else {
        boutonEnvoyer.disabled = true;
        boutonEnvoyer.style.backgroundColor = "#ccc"; 
        boutonEnvoyer.style.cursor = "not-allowed";
    }
}

// Gère le jeu
function choix(event) {
    const choixJoueur = event.target.id;
    const options = ['pierre', 'feuille', 'ciseaux'];
    const choixOrdi = options[Math.floor(Math.random() * 3)];
    const affichage = document.querySelector('#resultat-combat');
    const message = document.querySelector('#messages');
    
    let resultat = `L'ordinateur a joué ${choixOrdi} ➜ `;

    // Si il y a égalité
    if (choixJoueur === choixOrdi) { 
        affichage.innerText = resultat + "Égalité ! (Vous pouvez rejouer)";
        affichage.style.color = "orange";

    // Si le joueur a gagné
    } else if ((choixJoueur === 'pierre' && choixOrdi === 'ciseaux') || (choixJoueur === 'feuille' && choixOrdi === 'pierre') || (choixJoueur === 'ciseaux' && choixOrdi === 'feuille')) {
        affichage.innerText = resultat + "Vous avez gagné !";
        affichage.style.color = "green";
        message.innerText = "Le message vient d'être envoyé";
        message.style.color = "green";

        // Empêche de recliquer sur les boutons àpres le résultat annoncé
        document.getElementById("pierre").disabled = true;
        document.getElementById("feuille").disabled = true;
        document.getElementById("ciseaux").disabled = true;

        // Ferme la fenêtre modale au bout d'une seconde
        setTimeout(() => {
            modaleJeu.style.display = "none"; // Ferme la fenêtre modale
            affichage.innerText = "";
            message.innerText = "";
            
            // Rend les boutons cliquables de nouveau
            document.getElementById("pierre").disabled = false;
            document.getElementById("feuille").disabled = false;
            document.getElementById("ciseaux").disabled = false;
            document.querySelector('#formulaire').reset();
            verifierSaisie(); // Réaffiche les erreurs après reset du formulaire
        }, 2000);

    // Si le joueur a perdu
    } else {
        affichage.innerText = resultat + "Vous avez perdu !";
        affichage.style.color = "red";
        message.innerText = "Le message vient d'être supprimé";
        message.style.color = "red";

        // Empêche de recliquer sur les boutons àpres le résultat annoncé
        document.getElementById("pierre").disabled = true;
        document.getElementById("feuille").disabled = true;
        document.getElementById("ciseaux").disabled = true;

        // Ferme la fenêtre modale au bout d'une seconde
        setTimeout(() => {
            modaleJeu.style.display = "none"; // Ferme la fenêtre modale
            affichage.innerText = "";
            message.innerText = "";

            // Rend les boutons cliquables de nouveau
            document.getElementById("pierre").disabled = false;
            document.getElementById("feuille").disabled = false;
            document.getElementById("ciseaux").disabled = false;
            document.querySelector('#formulaire').reset();
            verifierSaisie(); // Réaffiche les erreurs après reset du formulaire
        }, 2000);
    }
}

// Affiche la fenêtre modale du jeu
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

    verifierSaisie(); // Lance la vérification des champs
}
main();