import { getMeteo, getMeteoCoord } from "./getMeto.js";
const meteoFrance = document.getElementById("meteo_france");
const meteoGps = document.getElementById("meto_gps");
const heurePossible = ["02", "05", "08", "11", "14", "17", "20", "23"];

export const afficherMeteo = async () => {
  const date = new Date();
  const currentDay = String(date.getDate()).padStart(2, '0');
  const currentMonth = String(date.getMonth() + 1).padStart(2, '0');
  const currentYear = date.getFullYear();
  const currentHour = date.getHours();


  const data = await getMeteo();

  // Filtrer les heures après la date courante
  const heuresApresDateCourante = heurePossible.filter(heure => heure > currentHour);

  // Afficher les données pour les heures après la date courante
  let html = `
  <h3>Météo à Nancy Aujourd'hui</h3>
  <table>
    <tr>
      <th>Heure</th>
      <th>Température</th>
      <th>Pluie</th>
      <th>Neige</th>
    </tr>
  `; 
  heuresApresDateCourante.forEach(heure => {
    const dateTime = `${currentYear}-${currentMonth}-${currentDay} ${heure}:00:00`;
    html += `
        <tr>
          <td>${heure}</td>
          <td>${data[dateTime].temperature["2m"]-273.15}</td>
          <td>${data[dateTime].pluie}</td>
          <td>${data[dateTime].risque_neige}</td>
        </tr>
    `
  });
  html += "</table>";
  meteoFrance.innerHTML = `
    ${html}
  `

  
}



export const afficherMeteoCoord = async (lat, lon) =>{
    const data = await getMeteoCoord(lat, lon);
    let good = false;

  
    if(data.current_weather != undefined){
        good = true; 
    }
    meteoGps.innerHTML = `
        <h3>Météo actuelle selon votre position</h3>
        <table>
            <tr>
                <th>Température</th>
                <th>Vitesse du vent</th>
            </tr>
            <tr>
                <td>${good ? data.current_weather.temperature : "Indisponible pour le moment"}</td>
                <td>${good ? data.current_weather.windspeed : "indisponible pour le moment"}</td>
            </tr>
        </table>
    `;
}