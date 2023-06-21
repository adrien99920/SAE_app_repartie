import { displayVeloPing } from "./lib/velo.js"; 
import { displayTravauxPing } from "./lib/travaux.js";
import { displayRestaurant } from "./lib/resto.js";
import { displayEcolesPing } from "./lib/ecoles.js";
import { addMetoEvent } from "./meteo/eventMeteo.js";
import { getMeteo } from "./meteo/getMeto.js";
import { ajouterResto } from "./lib/addResto.js";
import { afficherMeteo } from "./meteo/afficherMeto.js";
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


// ajout des restaurants 
ajouterResto(map);

// on affiche les pins pour les vélos 
displayVeloPing(map);

// on affiche les pins pour les travaux  
displayTravauxPing(map);

// affichage des restaurants 
displayRestaurant(map); 

// on ajoute un evenement sur les boutons reservatiosn 
displayEcolesPing(map); 

// ajout de la meteo 
addMetoEvent(map); 

afficherMeteo();

// affiche la meto de france 
getMeteo();

