const main = async () => {
    // owner is deployer, randomPerson to test access control
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("hacker");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    // console.log("Contract deployed by:", owner.address);

    // passing value, second variable is moneyyyyyyyyyyy
    const txn = await domainContract.register("mortal", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();

    const address = await domainContract.getAddress("mortal");
    console.log("Owner of domain mortal:", address);

    // trying to set a record that doesn't belong to randomPerson
    // txn = await domainContract.connect(randomPerson).setRecord("hacks", "personal web2 domain");
    // await txn.wait();

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

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