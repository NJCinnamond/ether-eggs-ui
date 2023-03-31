import { useEffect } from "react";

import { Web3Button } from "@thirdweb-dev/react";
import { easterEggContractAddress } from '../../services/contract';
import { useUploadAndMintEtherEgg } from "../../services/nft";

// Toast notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EggClaim = ({ lat, lon, index, hint }) => {

    const { uploadMetadata, mintEgg, isLoading, error } = useUploadAndMintEtherEgg();

    useEffect(() => {
        if (error == undefined && isLoading) {
            toast("Minting your egg!");
        }
        if (error != undefined) {
            toast.error("Failed to mint egg: " + error);
        }
    }, [error, isLoading]);

    return (
        <>
            <Web3Button
                contractAddress={easterEggContractAddress}
                action={async () => {
                    const uri = await uploadMetadata(lat, lon, hint);
                    mintEgg(lat, lon, index, uri);
                }}
                >
                Mint Egg
            </Web3Button>
            <ToastContainer />
        </>
    )
}