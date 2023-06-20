const createIcon = (image) =>{
    return L.icon({
        iconUrl: image,
        popupAnchor:  [0, -18], // point from which the popup should open relative to the iconAnchor$
        iconSize:     [35, 48], // size of the icon
    });
}

export const restoIcon = createIcon("icon_resto.png");
export const veloIcon = createIcon("icon_velo.png");
export const travauxIcon = createIcon("icon_travaux.png");
export const univIcon = createIcon("icon_univ.png");