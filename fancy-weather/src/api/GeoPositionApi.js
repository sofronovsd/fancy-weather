export const requestGeoPosition = (place, language) => {
    return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${process.env.REACT_APP_GEO_KEY}&pretty=1&language=${language.toLowerCase()}&limit=1`)
        .then(res => res.json())
};

export const requestIpInfo = () => {
    return fetch(`https://ipinfo.io/json?token=${process.env.REACT_APP_IP_TOKEN}`)
        .then(res => res.json())
};
