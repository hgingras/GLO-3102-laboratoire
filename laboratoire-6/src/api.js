import * as geo from './geolocalisation.js';

const BASEURL = 'http://api.weatherbit.io/v2.0/forecast/daily'
const KEY = 'f8ab4241139e43e7a38da4e7ec3b075f';
const jsonAppHeader = {"Content-Type": "application/json",};

export async function getWeather() {
    const position = await geo.getLocalisation();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(BASEURL);
    console.log(KEY);
    console.log(jsonAppHeader);
    let url = new URL(BASEURL);
    url.searchParams.append('lat', lat);
    url.searchParams.append('lon', lon);
    url.searchParams.append('Key', KEY); 
    url.searchParams.append('days', 5);
    const response = await fetch(url, {
        method: 'GET',
        headers: jsonAppHeader,
    });

    const jsonResponse = await response.json();
    return jsonResponse;
}

