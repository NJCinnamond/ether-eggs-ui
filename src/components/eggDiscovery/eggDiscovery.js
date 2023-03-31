import { useEffect, useState } from 'react'
import { useContractRead  } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";

import { findMatchingHashesFromLatLon, calculateCoordinateHash } from '../../services/coordinates';
import { useEtherEggContract } from '../../services/contract';

import { EggClaim } from './eggClaim';

// CONFETTI
import JSConfetti from 'js-confetti';

import "./eggDiscovery.css";

const jsConfetti = new JSConfetti()

export const EggDiscovery = ({lat, lon}) => {
    const { contract } = useEtherEggContract();
    const { data: coordinateHashes } = useContractRead(contract, "getCoordinateHashes");

    const [matchingHashIndex, setMatchingHashIndex] = useState();

    const hash = calculateCoordinateHash(lat, lon);

    const { data: eggIsClaimed } = useContractRead(contract, "claimedHashes", hash);

    const [isLoadingEligibility, setIsLoadingEligbility] = useState(true);
    const [isEligibleToMint, setIsEligibleToMint] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Only set matching hash index if it hasn't been set already so we don't exit from EggClaim view when user claims egg
        if (matchingHashIndex == undefined && coordinateHashes != undefined && coordinateHashes.length) {
            setIsLoadingEligbility(false);

            const matchingCoordIdx = findMatchingHashesFromLatLon(coordinateHashes, lat, lon);
            if (matchingCoordIdx != undefined && matchingCoordIdx >= 0) {
                setMatchingHashIndex(matchingCoordIdx);
            }
        }
    }, [coordinateHashes]);

    useEffect(() => {
        if (matchingHashIndex != undefined && !eggIsClaimed) {
            setIsEligibleToMint(true);
        } else {
            // Hacky way to say:
            // If we were eligible and now we aren't, redirect to homepage, because we probably claimed it
            if (isEligibleToMint) {
                navigate("/");
            }
            setIsEligibleToMint(false);
        }
    }, [eggIsClaimed, matchingHashIndex])

    const { data: hint } = useContractRead(contract, "hints", matchingHashIndex);

    if(isEligibleToMint) jsConfetti.addConfetti();

    return (
        <div className="egg-discovery-container">
            {isLoadingEligibility ? (
                <span>Calculating if you found an egg...</span>
            ) : (
                <div className="egg-claim-container">
                    {matchingHashIndex == undefined && (
                        <span className="egg-claim-label">Unfortunately you didn't find an egg this time.</span>
                    )}
                    {isEligibleToMint && (
                        <>
                            <div className="egg-claim-label">
                                <span>Congratulations, you found an egg!</span>
                            </div>
                            <div>
                                <EggClaim lat={lat} lon={lon} index={matchingHashIndex} hint={hint}/>
                            </div>
                            <div className="egg-claim-hint">
                                Hint: {hint}
                            </div>
                        </>
                    )}
                    {matchingHashIndex != undefined && eggIsClaimed && (
                        <span className="egg-claim-label">This egg has already been claimed</span>
                    )}
                </div>
            )}
        </div>
        
    )
}