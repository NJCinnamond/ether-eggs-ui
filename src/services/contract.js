import { useContract } from "@thirdweb-dev/react";

export const easterEggContractAddress = "0xEbBbE36D456551fF9Ba4199E2015c835132c18E4";

export const useEtherEggContract = () => {
    return useContract(easterEggContractAddress);
};