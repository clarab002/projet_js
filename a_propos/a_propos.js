// clic sur mission = fenetre infos differentes

//Jeu sur le modal
//selection de toutes les missions

//on récupère toutes les fenêtres modales
const contenus = document.querySelectorAll(".contenu-modal");
// On récupère tous les éléments qui déclenchent l'ouverture (boutons + arrière-plan)
const actions = document.querySelectorAll(".bouge");
// Limite de caractères pour le texte visible sur la fenêtre modale
const limite = 150;

// Pour chaque modale trouvée dans la page
contenus.forEach(contenu => {
    // On récupère le paragraphe à l'intérieur de la modale
    const paragraphe = contenu.querySelector("p");
    // On récupère le texte en supprimant les espaces inutiles avec trim()
    const texte = paragraphe.textContent.trim() //trim evite de prendre les sauts de lignes, les espaces debut et fin.

    // Si le texte dépasse la limite, en le coupe et on ajoute "..."
    if (texte.length > limite){
        paragraphe.textContent = texte.substring(0, limite) + "...";
    }

    // Pour vhaque bouton/élément cliquable
    actions.forEach(action => {
        // On s'interesse à l'événement "click"
        action.addEventListener("click", () => {
            /* closest(".mission") remonte dans le DOM jusqu'au parent ayant la classe .mission
            On compare le parent du bouton et celui de la modale
            Si les deux appartienne à la même mission, alors on ouvre la bonne modale*/
            if (action.closest(".mission")=== contenu.closest(".mission")) { //vérifie que le bouton cliqué et cette modale appartiennent à la même mission.
                // On active ou désactive la modale avec toggle()
                contenu.classList.toggle("active");
            }
        })
    })
})


