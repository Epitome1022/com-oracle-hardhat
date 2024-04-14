// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.6/vendor/Ownable.sol";

contract CommuneAPIConsumer is ChainlinkClient, Ownable {
  uint256 public data;

  address private oracle;
  bytes32 private jobId;
  uint256 private fee;

  constructor(
    address _oracle,
    string memory _jobId,
    uint256 _fee,
    address _link
  ) public {
    if (_link == address(0)) {
      setPublicChainlinkToken();
    } else {
      setChainlinkToken(_link);
    }

    oracle = _oracle;
    jobId = stringToBytes32(_jobId);
    fee = _fee;
  }

  function requestData(
    string memory url,
    string memory path,
    int256 timesAmount
  ) public returns (bytes32 requestId) {
    Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

    request.add("get", url);

    request.add("path", path);

    request.addInt("times", timesAmount);

    return sendChainlinkRequestTo(oracle, request, fee);
  }

  function fulfill(bytes32 _requestId, uint256 _data) public recordChainlinkFulfillment(_requestId) {
    data = _data;
  }

  function withdrawLink() external onlyOwner {
    LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
    require(linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))), "Unable to transfer");
  }

  function stringToBytes32(string memory src) public pure returns (bytes32 res) {
    bytes memory tempEmptyStringTest = bytes(src);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }

    assembly {
      res := mload(add(src, 32))
    }
  }
}
