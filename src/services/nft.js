import { useContractWrite } from "@thirdweb-dev/react";
import { useEtherEggContract } from './contract';
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { transformPosition } from "./coordinates";

const storage = new ThirdwebStorage();

export const useUploadAndMintEtherEgg = () => {
    // Mints in 2 parts
    // 1. Uses Thirdweb useStorage to upload metadata to IPFS

    const uploadMetadata = async (lat, lon, hint) => {
        const data = {
            "name": "Ether Egg",
            "lat": lat,
            "lon": lon,
            "hint": hint,
        };

        const uri = await storage.upload(data);
        return uri;
    }

    // 2. Uses EtherEggs mintEtherEgg implementation to mint egg to user address
    const { contract } = useEtherEggContract();
    const { mutateAsync: mint, isLoading, error } = useContractWrite(
        contract,
        "mintEtherEgg",
      ); 

    const mintEgg = (lat, lon, index, uri) => {
        const transformedLat = transformPosition(lat);
        const transformedLon = transformPosition(lon);
        mint([transformedLat, transformedLon, index, uri]);
    }

    return { uploadMetadata, mintEgg, isLoading, error }
}