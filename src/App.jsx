/* eslint-disable no-unused-vars */
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContractRead, useContract, useContractWrite } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { utils } from "ethers";
import { useState } from "react";

function App() {
    const [amount, setAmount] = useState(0);

    const address = useAddress();

    const { data: contract } = useContract("0xc243B5AC308BA6CcAe6FDCf707231EE0e444CB5f");
    const { data, isLoading, error } = useContractRead(contract, "owner");
    const { data: balance, isLoading: balanceLoading, error: balanceError } = useContractRead(contract, "getContractBalance");

    const { mutateAsync, isLoading: depLoading, error: depError, data: mintResult } = useContractWrite(
        contract,
        "doSomething",
    );

    const { mutateAsync: withDraw, isLoading: withdrawLoading, error: withdrawError } = useContractWrite(
        contract,
        "withdrawFunds",
    );

    
    const balanceNumber = parseInt(balance?.toString()) / 10 ** 18;

    if (!contract || isLoading) return <div className="flex flex-col items-center justify-center h-screen">
        <div className="border-4 border-blue-800 border-opacity-25 rounded-full h-12 w-12 mb-4 animate-spin"></div>
        <p className="text-gray-500">Loading...</p>
    </div>;
    return (
        <div className="p-4 flex h-screen justify-center items-center rounded-md shadow-md">
            <div className="bg-zinc-100 rounded-xl shadow-xl p-14">
                <h1 className="text-3xl font-bold text-center mb-4">Smart Contract Interaction</h1>
                <p className="mb-2">Contract Owner: <span className="font-bold text-gray-500">{data}</span></p>
                <p className="mb-2">Your Account: {address ? address : 'Not connected'}</p>
                <p className="mb-2">Contract Balance: {
                    balanceLoading
                        ? <span className="font-bold text-gray-500">Loading...</span>
                        : <span className="font-bold text-gray-500">{balanceNumber}</span>
                } ETH</p>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-semibold">Withdraw Amount (ETH): </label>
                    <input
                        type="number"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                        value={amount}
                        disabled={withdrawLoading}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500 disabled:hover:bg-blue-500 disabled:shadow-none disabled:border-transparent disabled:ring-transparent disabled:text-white disabled:font-semibold disabled:px-4 disabled:py-2"
                        disabled={withdrawLoading}
                        onClick={() => withDraw({
                            args: [utils.parseEther(amount)],
                        })
                        }
                    >
                        Withdraw
                    </button>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                    <ConnectWallet
                        modalSize={"compact"}
                        theme={"light"}
                        className="h-4 rounded hover:bg-gray-600 text-white font-semibold px-4 py-1"
                    />
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-green-500 disabled:hover:bg-green-500 disabled:shadow-none disabled:border-transparent disabled:ring-transparent disabled:text-white disabled:font-semibold disabled:px-4 disabled:py-3"
                        disabled={depLoading}
                        onClick={() => mutateAsync({
                            args: [],
                            overrides: {
                                value: utils.parseEther("0.01"),
                            },
                        })}
                    >
                        Mint 0.01 ETH
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
