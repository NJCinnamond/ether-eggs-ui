import { useOwnedNFTs , useAddress } from "@thirdweb-dev/react";
import { useEtherEggContract } from "../../services/contract";
import { ActivityMap } from '../activityMap/activityMap';
import {Card, CardGroup} from "react-bootstrap";
import "./myEggs.css"

export const MyEggs = () => {
    const address = useAddress();
    const { contract } = useEtherEggContract();

    const { data: nftData, isLoading, error } = useOwnedNFTs(contract, address);

    console.log("Data: ", nftData);

    return (
        <div>
            <div className="my-eggs-title">Your Eggs</div>
            <div className="helper-text">
                {address == undefined && <span>Please connect your wallet to view your eggs.</span>}
                {address != undefined && !isLoading && nftData != undefined && !nftData.length && <span>You haven't found any eggs!</span>}
                {address != undefined && isLoading && <span>Loading eggs...</span>}
            </div>
            
            <CardGroup>
                {nftData != undefined && nftData.map((nft, index) => (
                    <Card className={"card-grid"} key={index}>
                        <div className="card-map">
                            <ActivityMap 
                                lat={nft.metadata.lat} 
                                lon={nft.metadata.lon}
                                zoom={17}
                            />
                        </div>
                        <Card.Body>
                            <Card.Title><strong>{nft.metadata.name}</strong></Card.Title>
                            <Card.Text>
                                <em>{nft.metadata.hint}</em>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </CardGroup>
        </div>
    )
}