import { displayVeloPing } from "./lib/velo.js"; 
import { displayTravauxPing } from "./lib/travaux.js";
import { displayRestaurant } from "./lib/resto.js";
import { displayEcolesPing } from "./lib/ecoles.js";
import { afficherResto } from "./lib/gestionResto.js";
import { url } from "./lib/config.js";
// Coordonnées de Nancy
const nancyLat = 48.6921;
const nancyLng = 6.1844;

// Initialiser la carte
const map = L.map('map').setView([nancyLat, nancyLng], 13);

// Ajouter une couche de tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// nom du restaurant courant à add 
const nomResto = document.getElementById("name"); 
const addressResto = document.getElementById("adresse"); 
const nbPResto = document.getElementById("nbPlace"); 


// Ajout de pins 
const btnAdd = document.getElementById("add_resto");
let isAddingMarker = false; 

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
    nbPlaces: parseInt(nbPResto.value),
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



// on affiche les pins pour les vélos 
displayVeloPing(map);

// on affiche les pins pour les travaux  
displayTravauxPing(map);

displayRestaurant(map); 

// on ajoute un evenement sur les boutons reservatiosn 
displayEcolesPing(map); 

