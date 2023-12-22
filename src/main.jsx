import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    ThirdwebProvider,
    metamaskWallet,
    coinbaseWallet,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThirdwebProvider
            supportedWallets={[
                metamaskWallet(),
                coinbaseWallet(),
            ]}
            activeChain={Sepolia}
            clientId="977d7986125cdc4e8ba10204d53935cc"
        >
            <App />
        </ThirdwebProvider>
    </React.StrictMode>,
)
