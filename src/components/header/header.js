import React from 'react';
import Container from 'react-bootstrap/Container';
import { ConnectWallet } from "@thirdweb-dev/react";
import "./header.css";

export const Header = () => {
    return (
        <Container className="container">
            <div className="contents-left">
                <h1>
                    <a href="/">
                        Ether Eggs
                    </a>
                </h1>
            </div>
            <div className="contents-right">
                <div className="connect-container">
                    <ConnectWallet
                        theme="light"
                        btnTitle="Connect"
                    />
                </div>
            </div>
        </Container>
    );
}