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
const token = localStorage.getItem("token");
console.log(token);
// console.log(projets);
const modalGallery = document.querySelector(".modal-gallery");

/** Suppression projets */
modalGallery.innerHTML = "";

function genererModalGallery(projets){
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
        figure.id = projet.id;
        /** composition du projet */
        figure.appendChild(imageProjet);
        figure.appendChild(trashProjet);
        /** ajout au dom */
        modalGallery.appendChild(figure);
    }
}
genererModalGallery(projets);
/** Suppression de projet */
const poubellesList = document.querySelectorAll(".trash");
poubellesList.forEach(poubelle => {
    poubelle.addEventListener("click", async function (event) {
        event.preventDefault();
        // console.log("poubelle cliquée");
        const figure = event.target.parentElement;  // Accède à la figure parent
        console.log(typeof figure.id);
        const idProjet = parseInt(figure.id, 10);
        console.log(typeof idProjet);
        // console.log(event);
        const supressionProjet = await fetch(`http://localhost:5678/api/works/${idProjet}`, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${token}`}
        });
        if (supressionProjet.status === 200) {
            figure.remove();
            console.log("l'élément peut-être supprimé du dom");
            // genererModalGallery(projets);
        } else if (supressionProjet.status === 401) {
            alert("Connexion non autorisée. Veuillez vérifier vos identifiants.");
        } else if (supressionProjet.status === 500) {
            alert("Comportement inattendu. Réessayez.");
        } else {
            console.log("erreur");
        }
    })
});

/** Gestion passage entre modales */
    /** recupération du bouton */
const ajoutPhotoBouton = document.getElementById("ajout-photo-bouton");
// console.log(ajoutPhotoBouton);
    /** Récupération de la vue de la 2ème modale */
const modaleAjoutPhoto = document.getElementById("modal-ajouter-photo");
// console.log(modaleAjoutPhoto);
    /** Récupération de la vue de la 1ère modale */
const modalegaleriePhoto = document.querySelector(".modal-wrapper > div");
console.log(modalegaleriePhoto);

ajoutPhotoBouton.addEventListener("click", ()=> {
    modaleAjoutPhoto.classList.remove("modal-affichage");
    modalegaleriePhoto.classList.add("modal-affichage");

        /** Récupération de la vue de la 1ère modale */
    const flecheRetour = document.querySelector(".modal-retour");
    // console.log(flecheRetour);
    flecheRetour.addEventListener("click", () => {
        modalegaleriePhoto.classList.remove("modal-affichage");
        modaleAjoutPhoto.classList.add("modal-affichage");
    })

    
    
})