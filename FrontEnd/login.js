// import { boutonsConteneur } from "./projets.js";

const formulaireLogin = document.querySelector(".form");
formulaireLogin.addEventListener("submit",async function (event) {
    event.preventDefault();
        /**récupération email et mdp */
    const connexionID = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=pwd]").value
    };
    // console.log(connexionID);
        /**Conversion en en json */
    const chargeUtile = JSON.stringify(connexionID);
    // console.log(chargeUtile);
    // console.log(formulaireLogin);
        // Vérification des valeurs récupérées
    // console.log("Email :", connexionID.email);
    // console.log("Mot de passe :", connexionID.password); 

        /** Envoi requête et retour */
    try {const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            body: chargeUtile,
            headers: {"Content-Type": "application/json"}
        });
        if (reponse.status === 200) {
            const data = await reponse.json();
            // console.log(data);
                /** Stockage token local storage */
            const authToken = data.token;
            // console.log(authToken);
            localStorage.setItem("token", authToken);
            //     /** Un renvoi vers page d'accueil */
            window.location.href = "./index.html";
        }else if (reponse.status === 401) {
            // console.error("connexion non autorisée")
            alert("Connexion non autorisée. Veuillez vérifier vos identifiants.")
        }else if (reponse.status === 404) {
            // console.error("User not found")
            alert("Connexion non autorisée. Utilisateur non trouvé.")
        }else {
                /** probleme coté serveur */
            // console.error("erreur sur le serveur")
            alert("Erreur sur le serveur. Veuillez réessayer dans un instant.")
        }
    } catch (error) {
            /** probleme coté client */
        // console.error("erreur lors de la requête", error)
        alert("Erreur lors de la requête. Veuillez réessayer plus tard.")
    }
});



