const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

const gallery = document.querySelector(".gallery");
const categoryList = [];

/** Suppression projets présents dans le html **/
document.querySelector(".gallery").innerHTML = "";

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
    boutonFiltre.classList.add('button');
    boutonsConteneur.appendChild(boutonFiltre);
})
    
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



