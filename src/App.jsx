/* eslint-disable no-unused-vars */
// src/App.jsx
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContractRead, useContract, useContractWrite } from "@thirdweb-dev/react";
import { utils } from "ethers";
import { useState } from "react";

function App() {
    const [amount, setAmount] = useState(0);

    const { data: contract } = useContract("0xc243B5AC308BA6CcAe6FDCf707231EE0e444CB5f");
    const { data, isLoading, error } = useContractRead(contract, "owner");
    const { data: balance, isLoading: balanceLoading, error: balanceError } = useContractRead(contract, "getContractBalance");

    const { mutateAsync, isLoading: depLoading, error: depError } = useContractWrite(
        contract,
        "doSomething",
    );

    const { mutateAsync: withDraw, isLoading: withdrawLoading, error: withdrawError } = useContractWrite(
        contract,
        "withdrawFunds",
    );

    console.log(data);
    const balanceNumber = parseInt(balance?.toString(), 16);

    if (!contract || isLoading || balanceLoading || depLoading || withdrawLoading) return <div className="flex flex-col items-center justify-center h-screen">
        <div className="border-4 border-gray-200 border-opacity-25 rounded-full h-12 w-12 mb-4 animate-spin"></div>
        <p className="text-gray-500">Loading...</p>
    </div>;
    return (
        <div className="p-4 flex h-screen justify-center items-center rounded-md shadow-md">
            <div className="bg-zinc-100 rounded-xl shadow-xl p-14">
                <h1 className="text-3xl mb-4">Smart Contract Interaction</h1>
                <div className="flex items-center justify-end gap-4">
                    <p className="hover:cursor-pointer">owner: {data.slice(1, 5)}...{data.slice(38)}</p>
                    <button>Balance: {balanceNumber} ETH</button>
                </div>
                <p className="mb-2">Contract Owner: </p>
                <p className="mb-2">Your Account: </p>
                <p className="mb-2">Contract Balance: 0 ETH</p>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-semibold">Withdraw Amount (ETH): </label>
                    <input
                        type="number"
                        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded"
                        onClick={() => withDraw({
                                args: [utils.parseEther(amount)],
                            })
                        }
                    >
                        Withdraw
                    </button>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                    <ConnectWallet className="bg-blue-500 h-4 rounded hover:bg-blue-600 text-white font-semibold px-4 py-1" />
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-5 rounded-xl"
                        onClick={() => mutateAsync({
                            args: [],
                            overrides: {
                                value: utils.parseEther("0.01"), // send 0.1 native token with the contract call
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
