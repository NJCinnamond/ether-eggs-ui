import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import React from "react";
import { StravaLogin } from "../strava/login/stravaLogin";
import { NFTMap } from '../nftMap/nftMap';
import { Hints } from '../hints/hints';

import './mapView.css';

export const MapView = () => {
    const address = useAddress();
    console.log("Address in mapview: ", address);
    return (
        <div className="map-view">
            
            <div className="map-container">
                <NFTMap/>
            </div>

            <Hints/>

            <div>
                <p>
                    Do you have what it takes to find the remaining eggs?
                </p>
                <p>
                    Connect your wallet and upload your Strava activities now!
                </p>

                <div className="strava-login-field">
                    {address == undefined && (
                        <ConnectWallet 
                            accentColor="#fc4c02"
                            colorMode="dark"
                            btnTitle="Connect Wallet"
                        />
                    )}
                    {address && (
                        <StravaLogin/>  
                    )}
                </div>
            </div>
        </div>
    )
}