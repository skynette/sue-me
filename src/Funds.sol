// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Funds {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        // This function is called when Ether is sent to the contract without data or function call
    }

    function withdrawFunds(uint256 amount) public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        require(address(this).balance >= amount, "Insufficient balance");

        payable(msg.sender).transfer(amount);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function doSomething() external payable  {
        // You can specify the amount of Ether to transfer along with the function call
        uint256 amount = msg.value; // The amount of Ether sent with the transaction

        // Perform actions or logic here as needed

        // Transfer Ether to the smart contract
        (bool success, ) = address(this).call{value: amount}("");
        require(success, "Transfer failed");
    }
}
