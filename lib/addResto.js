import { url } from "./config.js";
import { afficherResto } from "./gestionResto.js";

// nom du restaurant courant à add 
const nomResto = document.getElementById("name"); 
const addressResto = document.getElementById("adresse"); 


// Ajout de pins 
const btnAdd = document.getElementById("add_resto");
let isAddingMarker = false; 


export const ajouterResto = (map) =>{

    


// clique sur le boutton pour ajouter 
btnAdd.addEventListener('click', () => {
    isAddingMarker = true;
  })
  
  // event quand on clique sur la map 
  map.addEventListener('click', (e) => {
    if(isAddingMarker){
      
      // on crée le markeur 
      isAddingMarker = false;
      
      // appeler la méthode pour add dans la bd 
      const ajoutData = {
      name: nomResto.value,
      nbPlaces: 100,
      address: addressResto.value,
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    };
  
    fetch(url + '/ajouterResto', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ajoutData)
  })
  .then(response => {
    if (response.ok) {
      // La requête a réussi (statut HTTP 200-299)
      return response.json(); // Renvoie une promesse contenant le corps de la réponse parsé en tant qu'objet JSON
    } else {
      throw new Error('Erreur lors de la requête : ' + response.status);
    }
  })
  .then(data => {
    // On affiche le resto 
    if(data.restaurant_id >= 0){
      afficherResto(map, e.latlng.lat, e.latlng.lng, addressResto.value, nomResto.value, data.restaurant_id);
    }else{
      alert("L'ajout du restaurant n'a pas abouti");
    }
  
  })
  .catch(error => {
    console.log("Une erreur s'est produite lors de la requête :", error);
  });
  
      
    }
  }); 
}

