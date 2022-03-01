// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract A {
    event FirstCall(address caller, string owner);

    string public owner;

    constructor() {
      owner = "Plankton";
    }
    /**
    * This function should accept two arguments:
    * address of Contract B
    * address of Contract C
    */
    function functionInA(address _contractB, address _contractC) public {
      _contractB.call(abi.encodeWithSignature("functionInB(address)", _contractC));
      emit FirstCall(msg.sender, owner);
      console.log("In Contract A... owner:", owner);
      console.log("In Contract A... msg.sender: ", msg.sender);
    }

    // function helloWorld(address _contractB, address _contractC) external {
    //   this.functionInA(_contractB, _contractC);
    // }
}
