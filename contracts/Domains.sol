// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {

    // stores what domain owned by which user address
    mapping(string => address) public domains;

    // store what domains point to values
    mapping(string => string) public records;


    constructor() {
        console.log("THIS IS A DOMAINS CONTRACT. BY HACKERS. FOR HACKERS.");
    }

    // adds domain to user address in mapping
    function register(string calldata name) public {
        require(domains[name] == address(0));
        domains[name] = msg.sender;
        console.log("%s has claimed .%s", msg.sender, name);
    }

    // searches domain owner's address
    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        // only owner can set his domain records
        require(domains[name] == msg.sender);
        records[name] = record;
    }

    function getRecord(string calldata name) public view returns(string memory) {
        return records[name];
    }


}