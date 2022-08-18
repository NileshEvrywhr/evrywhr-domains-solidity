const main = async () => {
    // owner is deployer, superCoder to test access control
    const [owner, superCoder] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("hacker");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);

    // passing value, second variable is moneyyyyyyyyyyy
    let txn = await domainContract.register("a16z", {value: hre.ethers.utils.parseEther('1')});
    await txn.wait();

    txn = await domainContract.register("banana", {value: hre.ethers.utils.parseEther('1')});
    await txn.wait();

    txn = await domainContract.register("hummus", {value: hre.ethers.utils.parseEther('1')});
    await txn.wait();

    txn = await domainContract.register("nilk", {value: hre.ethers.utils.parseEther('1')});
    await txn.wait();

    let dnames = await domainContract.getAllNames();
    console.log("all domains: ", dnames)

    // how much money is in here?
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

    // try {
    //   txn = await domainContract.connect(superCoder).withdraw();
    //   await txn.wait();
    // } catch(error) {
    //   console.log("could not rob the contract")
    // }

    // const address = await domainContract.getAddress("mortal");
    // console.log("Owner of domain mortal:", address);

    // trying to set a record that doesn't belong to superCoder
    // txn = await domainContract.connect(randomPerson).setRecord("hacks", "personal web2 domain");
    // await txn.wait();

    // let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    // console.log("balance of owner before withdrawl:", hre.ethers.utils.formatEther(ownerBalance));

    // txn = await domainContract.connect(owner).withdraw();
    // await txn.wait();

    // Fetch balance of contract & owner
    const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
    ownerBalance = await hre.ethers.provider.getBalance(owner.address);

    console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
    console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

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