const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CommuneAPIConsumerModule", (m) => {

  const lock = m.contract("CommuneAPIConsumer", [
    "0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD",   // Arbitrum Sepolia Oracle
    "ca98366cc7314957b8c012c72f05aeeb",             // JobId
    "100000000000000000",                           // Fee
    // "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E"    // Arbitrum Sepolia Link Token
    "0x779877A7B0D9E8603169DdbD7836e478b4624789"    // Sepolia Link Token
  ]);

  return { lock };
});
