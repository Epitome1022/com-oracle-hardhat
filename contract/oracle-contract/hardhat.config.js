require("@nomicfoundation/hardhat-toolbox");
const ACCOUNT_PRIVATE_KEY = "244ac182355e773cef95391540ae9f73970798d17dc8330a3a03237e3e37ca7c";
const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL || 'https://sepolia.infura.io/v3/a27749044b104f099370a5b6c5ea2914'
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24"
      },
      {
        version: "0.8.20"
      },
      {
        version: "0.8.6"
      },
      {
        version: "0.8.4"
      },
      {
        version: "0.8.3"
      },
      {
        version: "0.6.6"
      }
    ]
  },
  networks: {
    hardhat: {},
    mumbai: {
      chainId: 80001,
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    },
    // sepolia: {
    //   chainId: 421614,
    //   url: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
    //   accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    // }
    sepolia: {
      chainId: 11155111,
      url: SEPOLIA_RPC_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
      // accounts: {
      //   mnemonic: MNEMONIC,
      // },
      saveDeployments: true,
    },
  },
  etherscan: {
    apiKey: "59SG66CDK7E37DNSGEVV81GW8B2965C1GY" // Arbitrum Sepolia network Apikey
  },
  typechain: {
    outDir: '../types/typechain'
  }
};
