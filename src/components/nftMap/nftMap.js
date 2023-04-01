import { useEffect, useState } from 'react';
import { useNFTs, useContractRead, useConnectionStatus } from "@thirdweb-dev/react";
import { useEtherEggContract } from '../../services/contract';
import { Map, Marker } from "pigeon-maps"
import { SelectedNFTDetail } from '../selectedNFTDetail/selectedNFTDetail';
import { UserEggsBtn } from '../userEggsBtn/userEggsBtn';

import "./nftMap.css";

export const NFTMap = () => {
    const { contract } = useEtherEggContract();
    const { data: nftData, isLoading, error } = useNFTs(contract);
    const { data: hints } = useContractRead(contract, "getHints");

    const [positionData, setPositionData] = useState();
    const [selected, setSelected] = useState();

    useEffect(() => {
        if (nftData != undefined) {
            const markers = nftData.map((token) => [token.metadata.lat, token.metadata.lon]);
            setPositionData(markers);
        }
    }, [nftData]);

    const calcAvgPos = () => {
        if (positionData == undefined) return [0,0];
        let avg_x = 0, avg_y = 0;
        positionData.forEach((pos) => {
            avg_x += (pos[0]/positionData.length)
            avg_y += (pos[1]/positionData.length)
        });
        return [avg_x, avg_y];
    }

    const onMarkerClick = ({ event, anchor, payload }) => setSelected(nftData[payload]);

    const shouldShowMap = !isLoading && positionData && positionData.length;
    const totalEggs = hints != undefined ? hints.length : 0;

    const connectionStatus = useConnectionStatus();
    const isConnected = connectionStatus === 'connected';

    return (
        <div>
            <div className="map-label">
                {isLoading && <p>Loading map of found eggs...</p>}
                {!isLoading && positionData != undefined && <p>A total of {positionData.length} / {totalEggs} eggs have been found</p>}
                {isConnected && positionData != undefined && positionData.length && <UserEggsBtn/>}
            </div>
            
            <div className="map-contents">
                {shouldShowMap ? (
                    <>
                        <Map height={300} defaultCenter={calcAvgPos()} defaultZoom={12}>
                            {positionData.map((position,index) => {
                                return <Marker width={50} key={index} payload={index} anchor={position} onClick={onMarkerClick}/>
                            })}
                        </Map>
                        <SelectedNFTDetail selected={selected}/> 
                    </> 
                ) : (
                    <p>
                        A map will show here once the first Eth Egg is minted.
                    </p>
                )}
            </div>
        </div>
        
    )
}