export const createMarker = (map, lat, lon, icon) =>{
    // on crée un marker, on l'ajoute à la map et on le return 
    return icon === undefined ? L.marker([lat, lon]).addTo(map) : L.marker([lat, lon], {icon: icon}).addTo(map);
}

export const createMarkerWithPopUp = (map, lat, lon, content, icon) =>{
    const marker = createMarker(map, lat, lon, icon); 
    const popupContent = content; 
    marker.bindPopup(popupContent);
}