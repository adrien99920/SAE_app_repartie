import { restoIcon } from "./icons.js";
import { createMarkerWithPopUp } from "./marker_management.js";
import { url } from "./config.js";
export const afficherResto = (map, latitude, longitude, address, nom, id) =>{
    const popupContent = `
    <b>Adresse :</b> ${address}<br>
    <b>Nom :</b> ${nom}<br>
    <form id="form_reservation">
      
    <div>
      <label for="r_nom">Nom : </label>
      <input type="text" name="r_nom" id="r_nom" required>
    </div>

    <div>
      <label for="r_prenom">Prenom : </label>
      <input type="text" name="r_prenom" id="r_prenom" required>
    </div> 

    <div>
      <label for="r_nb">Nombre de personnes : </label>
      <input type="number" min="1" name="r_nb" id="r_nb" required>
    </div>

    <div>
      <label for="r_tel">Telephone : </label>
      <input type="text" name="r_tel" id="r_tel" required>
    </div>

    <div>
      <label for="r_date">Data (yyyy-mm-dd) : </label>
      <input type="date" name="r_date" id="r_date" required>
    </div>

    <button data-restaurant-id="${id}">Réserver</button>

    </form>
`;

    createMarkerWithPopUp(map, latitude, longitude, popupContent, restoIcon);

}



document.addEventListener('submit', (event) => {
  if (event.target && event.target.id === 'form_reservation') {
    event.preventDefault();
    const restaurantId = event.target.children[event.target.children.length - 1].getAttribute('data-restaurant-id');
    reserver(restaurantId);
  }
});

const reserver = (id) => {
  const form = document.getElementById('form_reservation');
  const nom = form.elements.r_nom.value;
  const prenom = form.elements.r_prenom.value;
  const nbPersonne =  parseInt(form.elements.r_nb.value);
  const tel = form.elements.r_tel.value;
  const date = form.elements.r_date.value;

  if(nbPersonne <= 0){
    alert("Nombre de personnes invalide !");
    return; 
}


  const reservationData = {
    restaurant_id: parseInt(id),
    name: nom,
    surname: prenom,
    guests: nbPersonne,
    phoneNumber: tel,
    reservationTime: date
  };

  console.log(JSON.stringify(reservationData)) ;
  fetch(url + "/reservation", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData)
  })
  .then(response => {
    if (response.ok) {
      return response.json(); // Renvoie une promesse contenant le corps de la réponse parsé en tant qu'objet JSON
    } else {
      throw new Error('Erreur lors de la requête : ' + response.status);
    }
  })
  .then(data => {
    // Faites quelque chose avec la réponse (data)
    if(data.status){
      alert("Votre réservation est confirmé !"); 
    }else{
      alert("Votre réservation n'a pas pu aboutir !"); 
    }
  })
  .catch(error => {
    console.log("Une erreur s'est produite lors de la réservation :", error);
  });
};
