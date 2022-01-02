const startTimestamp = Date.now();
const ethers = require('ethers');
const config = {
    "private_key": "f8ecdf82c55df2fad204b78295506ae857c5c36c33076ef1b57ca7365c411546",
    "network": "ropsten",
}

const fs = require('fs-extra');

const provider = ethers.getDefaultProvider(config["network"], {
    infura: {
        projectId: "ac7dd9c52b7c46cbbaa07783eb437574",
        projectSecret: "d5b6068b8ec94e0397647462bfbb38a7",
    },
});

let compiled = require(`./build/Token.json`);

async function createToken(network, tokenName, tokenVersion, tokenSymbol, tokenDecimals, tokenTotalSupply) {

    // Load Service Wallet for Deploy
    const wallet = new ethers.Wallet(config["private_key"], provider);
    console.log(`Loaded wallet ${wallet.address}`);

    console.log(`\nDeploying Token in ${network}...`);
    let contract = new ethers.ContractFactory(
        compiled.abi,
        compiled.bytecode,
        wallet
    );

    let instance = await contract.deploy(tokenName, tokenVersion, tokenSymbol, tokenDecimals, tokenTotalSupply);
    console.log(`deployed at ${instance.address}`)
    console.log("Waiting for the contract to get mined...")
    await instance.deployed()
    console.log("Contract deployed")
    fs.outputJsonSync(
        'config.json',
        config,
        {
            spaces: 2,
            EOL: "\n"
        }
    );
    return instance.address
}
