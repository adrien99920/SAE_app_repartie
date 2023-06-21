import { afficherMeteoCoord, afficherMeteo } from "./afficherMeto.js";
var dernierDeplacement = null;

export const addMetoEvent = (map) =>{
    // Ajouter l'événement moveend à la carte
map.on('moveend', function() {
    // Vérifier si le déplacement précédent a eu lieu il y a plus de 30 secondes
    var maintenant = new Date().getTime();
    if (dernierDeplacement === null || maintenant - dernierDeplacement > 3000) {
      // Récupérer les coordonnées du centre de la carte
      var center = map.getCenter();
      var lat = center.lat;
      var lng = center.lng;
  
      // Afficher la météo pour les coordonnées du centre de la carte
      afficherMeteoCoord(lat, lng);
  
      // Mettre à jour le temps du dernier déplacement
      dernierDeplacement = maintenant;
    } else {
      // Attendre la période de limite avant d'appeler à nouveau la fonction afficherMeteoCoord
      setTimeout(function() {
        map.fire('moveend');
      }, 30000 - (maintenant - dernierDeplacement));
    }
  });
  
}
