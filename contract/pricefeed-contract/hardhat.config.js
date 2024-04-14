require("@nomicfoundation/hardhat-toolbox");
const ACCOUNT_PRIVATE_KEY = "244ac182355e773cef95391540ae9f73970798d17dc8330a3a03237e3e37ca7c";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  mocha: {
    timeout: 120_000,
  },

  networks: {
    hardhat: {},
    mumbai: {
      chainId: 80001,
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    },
    sepolia: {
      chainId: 421614,
      url: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: "NEAKP8CSYHD3Y7F8P5UHU44J87E9A5FNCV"
  }
};
