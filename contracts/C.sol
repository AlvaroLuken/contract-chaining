// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract C {
    event LastCall(address caller, string owner);

    string public owner;

    constructor() {
      owner = "Squidward";
    }

    function functionInC() public {
      console.log("In Contract C... owner: ", owner);
      emit LastCall(msg.sender, owner);
      console.log("In Contract C... msg.sender: ", msg.sender);
    }
}