const stravaCallback = "https://ethereggs.xyz/callback";
//const stravaCallback = "http://localhost:3000/callback";

export const getStravaAuthURL = () => {
    return "https://www.strava.com/oauth/authorize/?" +
        "&client_id=49168" +
        "&redirect_uri=" + stravaCallback +
        "&response_type=code" +
        "&scope=activity:read_all";
}

export const getAccessToken = async (nonce) => {
    const url = "https://www.strava.com/api/v3/oauth/token?" +
        "client_id=49168" +
        "&client_secret=189fdf1b71a449d8a1e101f571af3e37c7fc63f9" +
        "&code=" + nonce +
        "&grant_type=authorization_code";

    const resp = await fetch(url, {
        method: 'POST',
    })
    const data = await resp.json();
    return data['access_token'];
}

export const getStravaActivites = async (code) => {
    const url = "https://www.strava.com/api/v3/athlete/activities";

    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + code
        }
    })
    const data = await resp.json();
    return data;
}