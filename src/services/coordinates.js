import { ethers } from "ethers";

export const findMatchingHashesFromLatLon = (coordinateHashes, lat, lon) => {
    const coordHash = calculateCoordinateHash(lat, lon);
    return coordinateHashes.indexOf(coordHash);
}

export const calculateCoordinateHash = (lat, lon) => {
    return ethers.utils.solidityKeccak256(["uint256", "uint256"],[ transformPosition(lat), transformPosition(lon) ]);
}

export const transformPosition = (pos) => Math.round((pos+90)*1000);