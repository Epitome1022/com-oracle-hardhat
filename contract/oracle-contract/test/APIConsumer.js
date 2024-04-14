const { ethers } = require('ethers');
const { formatBytes32String } = require("ethers/lib/utils");
const { abi } = require('../artifacts/contracts/APIConsumer.sol/APIConsumer.json');


const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/a27749044b104f099370a5b6c5ea2914");
    const signer = new ethers.Wallet("244ac182355e773cef95391540ae9f73970798d17dc8330a3a03237e3e37ca7c", provider);

    const contract = new ethers.Contract("0xb1e62D30653E6Ea8c956a2c547Fb11e0247735Dc", abi, signer);

    const result = await contract.requestData(
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
        "RAW,ETH,USD,VOLUME24HOUR",
        "1000000000000000000"
    );
    // console.log(result);
    const re = await result.wait(1);
    const requestId = re.events[0].topics[1];
    console.log(requestId);
    
    contract.on("ChainlinkFulfilled", async (id) => {
        console.log("request received");
        const rr = await contract.data();
        console.log(rr);
    })

    // contract.on("RequestFirstId", (requestId, id, event) => {
    //     console.log(requestId);
    //     console.log(id);
    // })
};

main();