import { afficherResto } from "./gestionResto.js";
import { url } from "./config.js";



export const displayRestaurant = (map) => {
    fetch(url + "/restaurants")
    .then(response => response.json())
    .then(data => {
        data.restaurants.forEach(restaurant => {
            afficherResto(map, restaurant.latitude, restaurant.longitude, restaurant.address, restaurant.name, restaurant.id);             

        });
    })
    .catch(error => {
        console.log("Une erreur s'est produite lors de la récupération des restaurants :", error);
    });
}
