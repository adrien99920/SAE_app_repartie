import { createMarkerWithPopUp } from "./marker_management.js";
import { travauxIcon } from "./icons.js";
export const displayTravauxPing = (map) =>{
    // on affiche les travaux sur nancy 

    fetch("https://carto.g-ny.org/data/cifs/cifs_waze_v2.json")
    .then(response => response.json())
    .then(accidents =>{
        accidents.incidents.forEach(accident =>{
            const popupContent = `<b>Type :</b>  ${accident.type}
            <br><b>Endroit :</b> ${accident.location.location_description}
            <br><b>Description :</b> ${accident.short_description}

             <br><b>Début :</b> ${accident.starttime}
             <br><b>Fin :</b>  ${accident.endtime}`;

            const location = getLocation(accident.location.polyline); 

            createMarkerWithPopUp(map, location[0], location[1], popupContent, travauxIcon);
        })
         
    })
    .catch(error => {
        console.log("Une erreur s'est produite lors du chargement des données :", error);
      });
}

const getLocation = (location) =>{
    return location.split(" ");
}