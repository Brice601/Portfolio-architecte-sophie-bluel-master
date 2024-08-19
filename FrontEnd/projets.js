const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

/** Suppression projets présents dans le html **/
document.querySelector(".gallery").innerHTML = "";

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
    const gallery = document.querySelector(".gallery");
    gallery.appendChild(figure);

}




