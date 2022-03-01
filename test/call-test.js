const { assert, expect } = require('chai');
const chai = require('chai');
const { solidity } = require("ethereum-waffle");
const { parseEther } = ethers.utils;
chai.use(solidity);

describe('Contract', function () {
    let contractA, contractB, contractC, deployedEventA, deployedEventB, owner;
    before(async () => {

        const A = await ethers.getContractFactory("A");
        contractA = await A.deploy();
        await contractA.deployed();

        const B = await ethers.getContractFactory("B");
        contractB = await B.deploy();
        await contractB.deployed();

        const C = await ethers.getContractFactory("C");
        contractC = await C.deploy();
        await contractC.deployed();

        [owner] = await ethers.provider.listAccounts();

        let responseA = await contractA.functionInA(contractB.address, contractC.address);
        let receiptA = await responseA.wait();

        artifacts = await hre.artifacts.readArtifact("A");

        // CALLS
        const topicA = contractA.interface.getEventTopic('FirstCall');
        const topicB = contractB.interface.getEventTopic('SecondCall');
        const topicC = contractC.interface.getEventTopic('LastCall');

        const logA = receiptA.logs.find(x => x.topics.indexOf(topicA) >= 0);
        const logB = receiptA.logs.find(x => x.topics.indexOf(topicB) >= 0);
        const logC = receiptA.logs.find(x => x.topics.indexOf(topicC) >= 0);

        deployedEventA = contractA.interface.parseLog(logA);
        deployedEventB = contractB.interface.parseLog(logB);
        deployedEventC = contractC.interface.parseLog(logC);

        console.log();
        console.log("A address: " + contractA.address);
        console.log("B address: " + contractB.address);
        console.log("C address: " + contractC.address);

        console.log("EOA address: " + owner);

    });

    it('should log a FirstCall event with you, the EOA, as msg.sender', async () => {
        assert(deployedEventA, "Expected a First Call event to be emitted!");
        assert.equal(deployedEventA.args[0], owner, "First caller should be you, the EOA!");
    });

    it('should log a SecondCall event with you, the EOA, as msg.sender', async () => {
        assert(deployedEventB, "Expected a Second Call event to be emitted!");
        assert.equal(deployedEventB.args[0], owner, "Second caller should be the EOA address");
    });

    it('should log a LastCall event with Contract A as the msg.sender', async () => {
        assert(deployedEventC, "Expected a Last Call event to be emitted!");
        assert.equal(deployedEventC.args[0], contractC.address, "Last caller should be the initial EOA");
    });

    // it('should log a LastCall event with Contract A as the msg.sender', async () => {
    //   assert(deployedEventC, "Expected a Last Call event to be emitted!");
    //   assert.equal(deployedEventC.args[0], owner, "Last caller should be the initial EOA");
    //   const ow = await contractA.owner();
    //   console.log(ow);
    // });
});
