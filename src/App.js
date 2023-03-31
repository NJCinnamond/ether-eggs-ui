import {
  ThirdwebProvider,
} from "@thirdweb-dev/react";
import { MilkomedaC1Testnet, MilkomedaC1 } from '@thirdweb-dev/chains'

import Container from 'react-bootstrap/Container';

import './App.css';
import { Header } from './components/header/header.js';
import { Main } from './components/main/main.js';

function App() {
  return (
    <div className="App">
      <ThirdwebProvider
      desiredChain={MilkomedaC1Testnet}
      activeChain={MilkomedaC1Testnet} // The chains that the SDK will use at this point in time.
      chains={[MilkomedaC1Testnet, MilkomedaC1]} // Allow users to switch between Polygon and Mumbai chains.
    >
      <Header/>
      <Container maxWidth="lg">
      <Main/>

      </Container>
    </ThirdwebProvider>
    </div>
  );
}

export default App;
