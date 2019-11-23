pragma solidity ^0.5.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract BatchSend {
    using SafeMath for uint256;

    function sendBatch(address payable[] memory _addresses) public payable {
        uint split_value = msg.value.div(_addresses.length);
        for (uint i = 0; i < _addresses.length; i++) {
            _addresses[i].transfer(split_value);
        }
    }
}
