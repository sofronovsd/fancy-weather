export const requestGeoPosition = (place, language) => {
    return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=4b03f4c134e542c8a16851109aa96bd4&pretty=1&language=${language.toLowerCase()}&limit=1`)
        .then(res => res.json())
};

export const requestIpInfo = () => {
    return fetch(`https://ipinfo.io/json?token=0b1225981c188c`)
        .then(res => res.json())
};
