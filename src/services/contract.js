import { useContract } from "@thirdweb-dev/react";

export const easterEggContractAddress = "0x66841dBDF796dBa349bf982173FEeC73A5F05E99";

export const useEtherEggContract = () => {
    return useContract(easterEggContractAddress);
};