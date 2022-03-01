// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract B {
    event SecondCall(address caller, string owner);

    string public owner = "Patrick";

    /**
    * This function should accept one argument:
    * address of Contract C
    */
    function functionInB(address _contractC) public {
      // current caller context is Contract A (cuz contract A made this call)
      _contractC.delegatecall(abi.encodeWithSignature("functionInC()"));
      emit SecondCall(msg.sender, owner);
      console.log("In Contract B... owner: ", owner);
      console.log("In Contract B... msg.sender: ", msg.sender);
    }
}