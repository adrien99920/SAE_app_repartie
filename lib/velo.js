import { createMarkerWithPopUp } from "./marker_management.js";
import { veloIcon } from "./icons.js";
export const displayVeloPing = async (map) =>{
    const disponibilite = await getPlace(); 

    // on affiche les différents parkings de vélo 
    fetch("https://transport.data.gouv.fr/gbfs/nancy/station_information.json")
    .then(response => response.json())
    .then(stations => {
      stations.data.stations.forEach(station =>{
        const popupContent = `<b>Adresse :</b>  ${station.address}
                             <br><b>Vélos disponibles :</b> ${disponibilite.get(station.station_id).numVelo}
                             <br><b>Places de parking libres :</b>  ${disponibilite.get(station.station_id).numPlace}`
        createMarkerWithPopUp(map, station.lat, station.lon, popupContent, veloIcon);
      })
    })
    .catch(error => {
      console.log("Une erreur s'est produite lors du chargement des données :", error);
    });
}



const getPlace = async () =>{
  try{
    let disponibilite = new Map(); 
    const response = await fetch("https://transport.data.gouv.fr/gbfs/nancy/station_status.json");
    const stations = await response.json(); 
    
    stations.data.stations.forEach(station =>{
      disponibilite.set(station.station_id, {"numVelo" : station.num_bikes_available, "numPlace" : station.num_docks_available}); 
    })
    return disponibilite; 
  }catch(error){
    console.log("Une erreur s'est produite lors du chargement des données :", error);
  }
    
}