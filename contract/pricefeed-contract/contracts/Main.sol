pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@redstone-finance/evm-connector/contracts/data-services/MainDemoConsumerBase.sol";

contract Main is MainDemoConsumerBase {
  /**
   * Returns the latest price of STX stocks
   */
  function getLatestETHPrice() public view returns (uint256) {
    bytes32 dataFeedId = bytes32("ETH");
    return getOracleNumericValueFromTxMsg(dataFeedId);
  }

  function getLatestValueForDataFeed(bytes32 dataFeedId) public view returns (uint256) {
    return getOracleNumericValueFromTxMsg(dataFeedId);
  }

  function getlatesValuesForDataFeeds(bytes32[] memory dataFeedIds) public view returns (uint256[] memory) {
    uint256[] memory dataFeeds = new uint256[](dataFeedIds.length);
    for (uint256 i = 0;i < dataFeedIds.length; i ++) {
        dataFeeds[i] = getOracleNumericValueFromTxMsg(dataFeedIds[i]);
    }
    return dataFeeds;
  }
}
