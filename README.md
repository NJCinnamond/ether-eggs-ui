# Ether Eggs

This repo contains the frontend UI code for the Ether Eggs project, a Harvard Blockchain Conference 2023 Hackathon submission.

This is a web3 social dApp that allows users to mint on-chain easter egg NFTs if they prove they travelled to the egg's real-world geolocation. Users
provide their real-world location by connecting to the Strava API and whitelisting the dApp to view their activities and corresponding latitudinal and
longitudinal data. The dApp checks if the activity location satisfies the on-chain location of the egg by checking that their hashes are equal. If it does, the user can mint the egg NFT as proof that they were the first to find the easter egg.

An egg's real-world location is defined by the EtherEggs smart contract 'coordinate hash', which is publically accessible. The EtherEgg smart contract can contain any number of eggs, each defined by a keccack256 hash of the latitude/longitude pair of the egg location and a hint string that users
can follow to find the egg. By using hashes of coordinates, we can ensure that the minting eligibility logic remains on-chain without making the
egg location accessible.

### Use of Thirdweb

This project makes extensive use of the Thirdweb React SDK, which greatly simplifies the smart contract interaction logic and NFT collection retrieval.

On the app home page, defined in mapView.js, we render
- NFTMap component, which uses useNFTs hook to get all the NFT eggs minted from the EtherEggs ERC721 contract. If eggs exist, we show a map that is
populated with markers based on the metadata coordinates returned in the hook
- In the Hints component, we use useContractRead to get the hints state variable in the ERC721 contract and show hints to the users
- If the user has not connected their wallet, we render the ConnectWallet component which prompts the user to connect via Metamask, Coinbase Wallet etc. If the user has connected their wallet, we render the 'Connect with Strava' button to prompt the user to provide their activity data.

The /my-eggs subdomain renders a card view of all eggs found by the connected address, using the useOwnedNFTs hook.

See the Egg Minting flow section below for how Thirdweb is used to create egg metadata and mint the NFT.

### Workflow Description and Strava Integration

If the user connects their wallet to the dApp, the home screen will show the 'Connect to Strava' button defined in stravaLogin.js. This links the
user to a page where they can give the dApp access to the user's activities via OAuth 2.0. When the user authorizes the app, they are redirected
to the ethereggs.xyz/callback URL which is handled by react-router-dom.

The callback URL will contain a one-time access token that the app uses to query Strava for the activities using the Strava service. This logic is contained in activityList.js which renders a list of activity items for the user's 10 most recent activities. Each activity item is defined by ActivityListItem component. This component renders a split view: on the left, the activity map renders a map with a marker at the *end* coordinate of the activity, which we interpret as the user's guess to where the egg is. On the right is the EggDiscovery component, which performs the crucial task of hashing the end coordinates (using the Coordinate service) and checking if it is equal to any egg's coordinate hash on the smart contract. If it is, then the user found the egg, and we render the EggClaim component which allows the user to call the contract mint function to claim their egg.

### Egg Minting Flow

The Egg minting flow begins when the user clicks 'Mint Egg' in the EggClaim component. See the section above for eligibility and flow information.

The Mint egg action is defined by a custom useUploadAndMintEtherEgg egg, which wraps two Thirdweb hooks: 
- useUploadMetadata, which creates an ipfs uri containing egg metadata. Metadata includes egg location (lat/lon pair) and the hint.
- useContractWrite, which calls the mintEtherEgg function on the contract. The arguments are 1) transformed latitude and longitude pairs of the user's activity (coordinate service handles transform by adding 180 to ensure coordinates are positive and multipling by 1000 to ensure we get a 3d.p accuracy on the smart contract side. The same transform is done to egg position coordinates on smart contract initialiazation), and 2) the index of the coordinateHash contract state variable array that corresponds to the hash of the egg the user is trying to mint.

### NFT View Components

If at least one egg has been minted from the contract, the home page will render NFTMap which renders a map with markers at locations of all discovered eggs. If the user clicks/taps on a marker, the selectedNFTDetail component below the map will provide more information, such as a link to the IPFS metadata of the egg, the address that found it, and the hint they used. 

The Home page contains a 'Your Eggs' button which links to the /my-eggs subdomain. This renders the MyEggs component which uses the useOwnedNFTs Thirdweb hook to get all egg NFTs minted by the connected address. We show these NFTs in a card view where each card shows an egg's map location and metadata.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### How to Deploy

Simply push to the main branch. An AWS Amplify CI/CD pipeline will take care of deploying to https://ethereggs.xyz
