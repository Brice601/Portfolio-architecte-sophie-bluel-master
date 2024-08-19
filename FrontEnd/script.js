const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

/** création d'un projet **/
const projet = projets[0];
const imageProjet = document.createElement("img");
imageProjet.src = projet.imageUrl;
const nomProjet = document.createElement("h2");
nomProjet.innerText = projet.title;

const gallery = document.querySelector(".gallery");
gallery.appendChild(imageProjet);
gallery.appendChild(nomProjet);
