const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

const gallery = document.querySelector(".gallery");
const categoryList = [];

/** Suppression projets présents dans le html **/
gallery.innerHTML = "";

function genererProjets(projets) {
        /** création de tous les projets **/
    for (let i = 0; i < projets.length; i++) {
        /** création d'un projet **/
        const projet = projets[i];
        const figure = document.createElement("figure")
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        imageProjet.alt = projet.title;
        const nomProjet = document.createElement("figcaption");
        nomProjet.innerText = projet.title;
        figure.appendChild(imageProjet);
        figure.appendChild(nomProjet);

        /** Ajout du projet au dom **/
        gallery.appendChild(figure);

        /** Création liste catégories **/
        categoryList.push(projet.category.name);
        // console.log(categoryList);
    }
}

genererProjets(projets)

/** Création de boutons filtres **/
let boutonsConteneur = document.createElement("div");
boutonsConteneur.classList.add("buttons");
// console.log(boutonsConteneur);

/** Ajout bouton "Tous" en 1ère position */
categoryList.unshift('Tous');
/** changement liste en set */
let categorySet = new Set(categoryList);

/** Création chaque bouton */
categorySet.forEach(category => {
    let boutonFiltre = document.createElement("button");
    boutonFiltre.textContent = `${category}`;
    boutonFiltre.classList.add('button', 'filtre-projet');
    boutonsConteneur.appendChild(boutonFiltre);
})
// boutonsConteneur.id = "boutons-conteneur";
// console.log(boutonsConteneur);

gallery.parentNode.insertBefore(boutonsConteneur, gallery);

/** Filtrage projets selon boutons  */
const boutons = document.querySelectorAll(".button");
boutons.forEach(bouton => {
    bouton.addEventListener("click", function(event) {
        /** valeur bouton */
        const valeurBouton = event.target.textContent;
        // console.log(valeurBouton);

        const projetsFiltrees = projets.filter(function (projet){
            switch (valeurBouton){
                case "Tous":
                    return true;
                case "Objets":
                    return projet.category.name === "Objets";
                case "Appartements":
                    return projet.category.name === "Appartements";
                case "Hotels & restaurants":
                    return projet.category.name === "Hotels & restaurants";
            }
        });
        /** Suppression projets présents dans le html **/
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsFiltrees);
    })
})


/********** Edition Login Logout *******/
/** Vérification présence token  */
const getauthToken = localStorage.getItem("token");
console.log(getauthToken);

const bandeau = document.querySelector(".bandeau");
console.log(bandeau);

const logout = document.getElementById("logout");
console.log(logout);

const modifierProjet = document.getElementById("modifier-projet");
console.log(modifierProjet);

const modifierProjetDiv = document.querySelector(".projet-modifier-inactif");


if (getauthToken) {
    /** ajout bandeau noir et logout */
    bandeau.classList.add("bandeau-visible");
    logout.textContent = "Logout";
    /** ajout icone et txt modifier Mes Projets */
    modifierProjet.classList.add("projet-modifier-actif");
    modifierProjetDiv.classList.remove("projet-modifier-inactif");
    /**suppression boutons Filtres */
    if (boutonsConteneur) {
        boutonsConteneur.style.display = "none";
    }

    /** Déconnexion */
    logout.addEventListener("click", function() {
        localStorage.removeItem("token");
        bandeau.classList.remove("bandeau-visible");
        logout.textContent = "Login";
        modifierProjet.classList.remove("projet-modifier-actif");
        modifierProjetDiv.classList.add("projet-modifier-inactif");
        // logout.removeEventListener("click")
    })
    
} else {
    console.log("le token n'est pas présent")
}