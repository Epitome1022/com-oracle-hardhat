const { ethers } = require('ethers');
const { formatBytes32String } = require("ethers/lib/utils");
const { abi } = require('../artifacts/contracts/Main.sol/Main.json');
const { WrapperBuilder } = require("@redstone-finance/evm-connector");

const symbols = [
    "ETH", "BTC", "USDT", "BNB", "USDC", "XRP","ADA", "MATIC", "DOGE","SOL", "DOT", "SHIB",
    "TRX", "DAI", "LTC", "AVAX", "UNI", "WBTC","ATOM", "LINK", "LEO","OKB", "ETC", "XMR",
]

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://arbitrum-sepolia.blockpi.network/v1/rpc/public");
    const signer = new ethers.Wallet("244ac182355e773cef95391540ae9f73970798d17dc8330a3a03237e3e37ca7c", provider);

    const contract = new ethers.Contract("0x0818BE2Fc4638103971b24b5ecbcb991a09610f9", abi, signer);

    // symbols.map(async(item) => {
    //     const wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
    //         dataFeeds: [item]
    //     });
        
    //     const price = await wrappedContract.getLatestValueForDataFeed(formatBytes32String(item));
    //     // const price = await contract.getLatestPrice(formatBytes32String("ARB"));
    //     console.log(item + "       " + (parseInt(price._hex) / Math.pow(10, 8)).toFixed(2));
    // });
    const wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
        dataFeeds: symbols
    });

    const price = await wrappedContract.getlatesValuesForDataFeeds(symbols.map(item => formatBytes32String(item)));
    console.log(price.map(item => (parseInt(item._hex) / Math.pow(10, 8)).toFixed(2)));
};

main();