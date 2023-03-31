import React from "react";
  
import { BodyComponent } from '../body/body.js';

import "./main.css";

export const Main = () => {

    return (
        <div className="main-box">
            
            <BodyComponent/>
            <div>
                <img src="strava_compatible.png" className="strava-compatible"/>
            </div>
        </div>
    )
}