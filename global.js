// header
// menu + horloge + clic logo + navigation + loader + presentation equipe (demande)
function delay(event){
    let bla = setInterval(
        function(){
            console.log("chiant chiant chiant");
        },1000
    );
    setTimeout(
        function(){
            clearInterval(bla);
            console.log("mince");
            let id = event.target.id;
            window.location.href = `${id}.html`;
        },2000
    )
}

// footer
// numero tel, validation,  sonnerie + adresses 

// copie element

// erreurs

function main(){
    document.getElementById("a_propos").addEventListener("click",delay);
    document.getElementById("accueil").addEventListener("click",delay);
    document.getElementById("contact").addEventListener("click",delay);
    document.getElementById("presentation").addEventListener("click",delay);
    document.getElementById("produit").addEventListener("click",delay);
}
main();