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
  let html = "<div>"; 
  heuresApresDateCourante.forEach(heure => {
    const dateTime = `${currentYear}-${currentMonth}-${currentDay} ${heure}:00:00`;
    console.log(data[dateTime]);
    html += `
        <h3>Météo d'aujourd'hui à Nancy à ${heure} heure</h3>
        <p>Temperature : ${data[dateTime].temperature["2m"]-273.15}</p>
        <p>Pluie : ${data[dateTime].pluie}</p>
        <p>Neige : ${data[dateTime].risque_neige}</p>


    `
  });

  meteoFrance.innerHTML = `
    ${html}
  `

  
}



export const afficherMeteoCoord = async (lat, lon) =>{
    const data = await getMeteoCoord(lat, lon);
    console.log(data); 
    meteoGps.innerHTML = `
        <h2>Météo actuelle selon votre position</h2>
        <table>
            <tr>
                <th>Heure</th>
                <th>Température</th>
                <th>Vitesse du vent</th>
            </tr>
            <tr>
                <td>${data.current_weather.time}</td>
                <td>${data.current_weather.temperature}</td>
                <td>${data.current_weather.windspeed}</td>
            </tr>
        </table>
    `;
}