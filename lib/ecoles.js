import { createMarkerWithPopUp } from "./marker_management.js";
import { univIcon } from "./icons.js";
import { url } from "./config.js";
export const displayEcolesPing = (map) =>{
    // on affiche les travaux sur nancy 

    fetch(url + "/enseignements")
    .then(response => response.json())
    .then(data =>{
        data.forEach(ecole => {
            const popupContent = `
            <b>Ville : </b> ${ecole.fields.aca_nom}
            <br/><b>Nom : </b> ${ecole.fields.uo_lib_officiel}
            <br/><b>Adresse : </b> ${ecole.fields.adresse_uai}
            `;
            if(ecole.fields.coordonnees != undefined){
                createMarkerWithPopUp(map, ecole.fields.coordonnees[0], ecole.fields.coordonnees[1], popupContent, univIcon);
            }
        });
    })
    .catch(error => {
        console.log("Une erreur s'est produite lors du chargement des données :", error);
      });
}
