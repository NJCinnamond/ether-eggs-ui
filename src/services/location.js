export const getLocation = async (lat, lon) => {
    const url = "http://api.openweathermap.org/geo/1.0/reverse" +
        "?lat=" + lat +
        "&lon=" + lon +
        "&limit=5" +
        "&appid=15147bcf87919bdb23cb253a5390ae13";

    const resp = await fetch(url, {
        method: 'GET',
    });
    const data = await resp.json();
    return data['name'];
}