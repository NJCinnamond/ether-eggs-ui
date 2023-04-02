import { useContract } from "@thirdweb-dev/react";

export const easterEggContractAddress = "0x0b1Cb89F5a2EBF27298030B824afC056DAE76381";

export const useEtherEggContract = () => {
    return useContract(easterEggContractAddress);
};