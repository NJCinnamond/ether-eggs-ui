import { useContract } from "@thirdweb-dev/react";

export const easterEggContractAddress = "0x55827916fBC0c93AEb825402C20a8B53AbaC4073";

export const useEtherEggContract = () => {
    return useContract(easterEggContractAddress);
};