// clic sur mission = fenetre infos differentes

//Jeu sur le modal
//selection de toutes les missions
const contenus = document.querySelectorAll(".contenu-modal");
const actions = document.querySelectorAll(".bouge");
const limite = 150;

contenus.forEach(contenu => {
    const paragraphe = contenu.querySelector("p");
    const texte = paragraphe.textContent.trim() //trim evite de prendre les sauts de lignes, les espaces debut et fin.


    if (texte.length > limite){
        paragraphe.textContent = texte.substring(0, limite) + "...";
    }
    actions.forEach(action => {
        action.addEventListener("click", () => {
            /* closest(".mission") remonte jusqu'au parent .mission
            On compare le parent du bouton et celui de la modale
            Si c'est le même, alors c'est la bonne modale à ouvrir*/
            if (action.closest(".mission")=== contenu.closest(".mission")) { //vérifie que le bouton cliqué et cette modale appartiennent à la même mission.
                contenu.classList.toggle("active");
            }
        })
    })
})


