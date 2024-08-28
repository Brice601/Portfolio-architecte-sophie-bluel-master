/** Sélection mode édition */
const editionMode = document.querySelector("#modifier-projet div");
console.log(editionMode);

let affichageModale = null;

/** function Affichage Modale */
const openModal = function (e) {
    e.preventDefault();
    affichageModale = document.getElementById("modale");
    affichageModale.classList.remove("affichage-modale");
    console.log(affichageModale);
    /** fermeture boite modale hors croix */
    affichageModale.addEventListener("click", closeModal);
    affichageModale.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

/** function Fermeture boite modale */
const closeModal = function (e) {
    if (affichageModale === null) return;
    e.preventDefault();
    affichageModale.classList.add("affichage-modale");
    console.log(affichageModale);
    affichageModale.removeEventListener("click", closeModal);
    crossModal.removeEventListener("click", closeModal);
    affichageModale.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    console.log(affichageModale);
    affichageModale = null;
}

/** stop propagation sur les parents */
const stopPropagation = function (e) {
    e.stopPropagation();
}


/** affichage modale clic mode edition */
editionMode.addEventListener("click", openModal);

/** fermeture modale clic croix */
const crossModal = document.querySelector(".modal-close");
// console.log("croix cliquée");
crossModal.addEventListener("click", closeModal);
