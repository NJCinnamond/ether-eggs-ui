import React from 'react';
import { useConnectionStatus } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import "./header.css";

export const Header = () => {
    const connectionStatus = useConnectionStatus();

    const connectClassName = connectionStatus === 'connected' ? "connect-container-connected" : "connect-container-disconnected";
    return (
        <div>
            <div className="header-container">
                <div className="contents-left">
                    <a href="/">
                        Ether Eggs
                    </a>
                </div>
                <div className="contents-right">
                    <div className={connectClassName}>
                        <ConnectWallet
                            theme="light"
                            btnTitle="Connect"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}