const main = async () => {
    // owner is deployer, randomPerson to test access control
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy();
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);

    const txn = await domainContract.register("hacks");
    await txn.wait();

    const domainOwner = await domainContract.getAddress("hacks");
    console.log("Owner of domain .hacks:", domainOwner);

    // trying to set a record that doesn't belong to randomPerson
    txn = await domainContract.connect(randomPerson).setRecord("hacks", "personal web2 domain");
    await txn.wait();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();