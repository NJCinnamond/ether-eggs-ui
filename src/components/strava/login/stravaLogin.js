import "./stravaLogin.css";
import { getStravaAuthURL } from "../../../services/strava";

export const StravaLogin = () => {
    return (
        <a href={getStravaAuthURL()}>
            <img src="./strava_connect.png" className="strava-login-btn"/>
        </a>
    )
}