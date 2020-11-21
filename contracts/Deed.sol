// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

// user funds smart contract with money that can only been sent to
// a beneficiary by a designated lawyer

contract Deed {
    address public lawyer;
    address payable public beneficiary;
    uint public earliestExecutionTime;

    constructor(address _lawyer, address payable _beneficiary, uint fromNow) payable public {
        lawyer = _lawyer;
        beneficiary = _beneficiary;
        earliestExecutionTime = now + fromNow; // fromNow: time in seconds
    }

    // send all the Ether in this smart contract to the beneficiary
    function withdraw() public {
        require(msg.sender == lawyer, 'Only lawyer can withdraw');
        require(now > earliestExecutionTime);
        // send Ether from "this" smart contract to "beneficiary"
        beneficiary.transfer(address(this).balance);
    }

}
