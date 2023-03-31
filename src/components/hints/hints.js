import { useContractRead } from "@thirdweb-dev/react";
import { useEtherEggContract } from '../../services/contract';

import "./hints.css";

export const Hints = () => {
    const { contract } = useEtherEggContract();
    const { data: hints, isLoading, error } = useContractRead(contract, "getHints");

    return (
        <div className="hints-container">
            <h3>Hints</h3>

            <div className="hints-contents">
                {isLoading && (
                    <span>Loading hints...</span>
                )}
                {!isLoading && hints != undefined && (
                    <div>
                        <h4>Use the following hints to find the eggs</h4>
                        {hints.map((hint, index) => (
                            <p key={index}>
                                <span>{index+1}. {hint}</span>
                            </p>
                        ))}
                    </div>
                )}
            </div>
            
        </div>
    )

}