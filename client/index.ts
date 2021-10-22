const [bths, bthc, btss, btsc] =document.querySelectorAll("button");

bths.onclick = async () => console.log( await fetch('http://localhost:8080/noCORS/tete.svg') );
bthc.onclick = async () => console.log( await fetch('http://localhost:8080/withCORS/tete.svg') );
btss.onclick = async () => console.log( await fetch('https://localhost:8443/noCORS/tete.svg') );
btsc.onclick = async () => console.log( await fetch('https://localhost:8443/withCORS/tete.svg') );

import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // Informations à trouver sur Firebase...
};
const app = initializeApp(firebaseConfig);

// Configuration du fournisseur d'authentification
const provider = new GoogleAuthProvider(); 
provider.setCustomParameters({prompt: 'select_account'});

// Identification des éléments HTML qui nous intéresse
const bt = document.querySelector("button"); // Le bouton 
const div = document.querySelector("#user"); // La div contenant les informations de l'utilisateur

// Mise à jour de l'interface
update();

// Fonction de mise à jour de l'interface
async function update() {
  const auth = getAuth();
  await auth.operations;     // On attends que l'éventuel utilisateur soit chargé
  console.log(auth);         // Affichage de contrôle dans la console
  if (!!auth.currentUser) {  // Cas où on a un utilisateur identifié
    bt.textContent = "Se déconnecter";
    bt.onclick = () => {signOut( getAuth() ).then( update )}
    const U = auth.currentUser;
    div.innerHTML = ` <p>Bonjour ${U.displayName}, votre email est bien ${U.email} ?</p>
                      <p>Votre photo de profil : 
                        <img src="${U.photoURL}" />
                      </p>`;
  } else {                   // Cas où personne n'est encore identifié
    bt.textContent = "Connexion via Google";
    div.innerHTML = `Pas d'utilisateur authentifié`;
    bt.onclick = () => signInWithPopup(auth, provider).then( update ).catch( console.error );
  }
}
