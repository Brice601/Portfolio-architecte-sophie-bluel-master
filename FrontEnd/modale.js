/** Sélection mode édition */
const editionMode = document.querySelector("#modifier-projet div");
console.log(editionMode);

let affichageModale = null;
const crossModal = document.querySelector(".modal-close");

/** function Affichage Modale */
const openModal = function (e) {
    e.preventDefault();
    affichageModale = document.getElementById("modale");
    affichageModale.classList.remove("affichage-modale");
    console.log(affichageModale);
    /** fermeture boite modale hors croix */
    affichageModale.addEventListener("click", closeModal);
    affichageModale.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    /** fermeture modale clic croix */
    
    // console.log("croix cliquée");
    crossModal.addEventListener("click", closeModal);
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


/** Récupération des projets */
const reponseProjets = await fetch("http://localhost:5678/api/works");
const projets = await reponseProjets.json();
console.log(projets);
const modalGallery = document.querySelector(".modal-gallery");
// console.log(modalGallery);
/** Suppression projets */
modalGallery.innerHTML = "";

/** Ajout de ts les projets */
for (let i = 0; i < projets.length; i++ ) {
    /** création du projet */
    const projet = projets[i];
    const figure = document.createElement("figure")
    const imageProjet = document.createElement("img");
    const trashProjet = document.createElement("img");
    /** ajout des attibuts, classes */
    imageProjet.src = projet.imageUrl;
    imageProjet.alt = projet.titre;
    trashProjet.src = "./assets/icons/trash-can-solid.svg";
    trashProjet.alt = "poubelle"
    imageProjet.classList.add("modal-projet");
    trashProjet.classList.add("trash");
    figure.classList.add("modal-projet");
    /** composition du projet */
    figure.appendChild(imageProjet);
    figure.appendChild(trashProjet);
    /** ajout au dom */
    modalGallery.appendChild(figure);
}