const createIcon = (image) =>{
    return L.icon({
        iconUrl: image,
        popupAnchor:  [0, -18], // point from which the popup should open relative to the iconAnchor$
        iconSize:     [35, 48], // size of the icon
    });
}

export const restoIcon = createIcon("assets/icon_resto.png");
export const veloIcon = createIcon("assets/icon_velo.png");
export const travauxIcon = createIcon("assets/icon_travaux.png");
export const univIcon = createIcon("assets/icon_univ.png");