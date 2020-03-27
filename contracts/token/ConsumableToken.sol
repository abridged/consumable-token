pragma solidity 0.5.12;

import {MathLib} from "@abridged/contracts/contracts/utils/MathLib.sol";
import {AddressLib} from "@abridged/contracts/contracts/utils/AddressLib.sol";
import {IERC20Token} from "@abridged/contracts/contracts/token/interfaces.sol";

/**
 * @title ConsumableToken
 */
contract ConsumableToken is IERC20Token {
  using AddressLib for address;
  using MathLib for uint256;

  event ConsumerAdded(address consumer);
  event ConsumerRemoved(address consumer);

  struct Details {
    uint256 totalSupply;
    string name;
    string symbol;
    uint8 decimals;
    uint256 fromWeiMultiplier;
    uint256 fromWeiDivider;
  }

  string private constant ERR_ONLY_CONSUMER = "reverted by onlyConsumer";
  string private constant ERR_INVALID_CONSUMER = "invalid consumer";
  string private constant ERR_INVALID_CONSUMERS = "invalid consumers";
  string private constant ERR_INVALID_FROM = "invalid from";
  string private constant ERR_INVALID_TO = "invalid to";
  string private constant ERR_INVALID_OWNER = "invalid owner";
  string private constant ERR_INVALID_SPENDER = "invalid spender";
  string private constant ERR_INVALID_VALUE = "invalid value";
  string private constant ERR_SEND_FAILED = "send failed";

  mapping(address => mapping(address => uint256)) private allowances;
  mapping(address => uint256) private balances;
  mapping(address => bool) private consumers;

  Details private details;

  modifier onlyConsumer() {
    require(
      consumers[msg.sender],
      ERR_ONLY_CONSUMER
    );

    _;
  }

  /**
   * @dev public constructor
   */
  constructor(
    string memory _name,
    string memory _symbol,
    uint8 _decimals,
    uint256 _fromWeiMultiplier,
    uint256 _fromWeiDivider,
    address[] memory _consumers
  ) public {
    details.name = _name;
    details.symbol = _symbol;
    details.decimals = _decimals;
    details.fromWeiMultiplier = _fromWeiMultiplier;
    details.fromWeiDivider = _fromWeiDivider;

    require(
      _consumers.length > 0,
      ERR_INVALID_CONSUMERS
    );

    for (uint256 _i = 0; _i < _consumers.length; _i++) {
      require(
        _consumers[_i] != address(0),
        ERR_INVALID_CONSUMERS
      );

      consumers[_consumers[_i]] = true;
    }
  }

  // public views

  function name() public view returns (string memory) {
    return details.name;
  }

  function symbol() public view returns (string memory) {
    return details.symbol;
  }

  function decimals() public view returns (uint8) {
    return details.decimals;
  }

  function totalSupply() public view returns (uint256) {
    return details.totalSupply;
  }

  function getExchangeFromWeiRate() public view returns (uint256 _multiplier, uint256 _divider) {
    _multiplier = details.fromWeiMultiplier;
    _divider = details.fromWeiDivider;
  }

  function balanceOf(
    address _owner
  ) public view returns (uint256) {
    return balances[_owner];
  }

  function allowance(
    address _owner,
    address _spender
  ) public view returns (uint256) {
    return allowances[_owner][_spender];
  }

  function calcExchangeFromWei(
    uint256 _value
  ) public view returns (uint256) {
    return _value
    .mul(details.fromWeiMultiplier)
    .div(details.fromWeiDivider);
  }

  function calcExchangeToWei(
    uint256 _value
  ) public view returns (uint256) {
    return _value
    .mul(details.fromWeiDivider)
    .div(details.fromWeiMultiplier);
  }

  function hasConsumer(
    address _consumer
  ) public view returns (bool) {
    return consumers[_consumer];
  }

  /**
   * @dev fallback
   */
  function() external payable {
    uint256 _value = calcExchangeFromWei(msg.value);

    _mint(
      msg.sender,
      _value
    );
  }

  // public methods

  function addConsumer(
    address _consumer
  ) public onlyConsumer {
    require(
      _consumer != address(0) && !consumers[_consumer],
      ERR_INVALID_CONSUMER
    );

    consumers[_consumer] = true;

    emit ConsumerAdded(_consumer);
  }

  function removeConsumer(
    address _consumer
  ) public onlyConsumer {
    require(
      _consumer != msg.sender && consumers[_consumer],
      ERR_INVALID_CONSUMER
    );

    consumers[_consumer] = false;

    emit ConsumerRemoved(_consumer);
  }

  function exchangeToWei(
    uint256 _value
  ) public {
    uint256 _weiValue = calcExchangeToWei(_value);

    require(
      _weiValue > 0,
      ERR_INVALID_VALUE
    );

    _burn(
      msg.sender,
      _value
    );

    require(
      msg.sender.send(_weiValue),
      ERR_SEND_FAILED
    );
  }

  function transfer(
    address _to,
    uint256 _value
  ) public returns (bool) {
    _transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _value
  ) public returns (bool) {
    _transfer(_from, _to, _value);
    _approve(_from, msg.sender, allowances[_from][msg.sender].sub(_value));
    return true;
  }

  function approve(
    address _spender,
    uint256 _value
  ) public returns (bool) {
    _approve(msg.sender, _spender, _value);
    return true;
  }

  // internal methods

  function _transfer(
    address _from,
    address _to,
    uint256 _value
  ) internal {
    require(
      _from != address(0),
      ERR_INVALID_FROM
    );
    require(
      _to != address(0),
      ERR_INVALID_TO
    );
    require(
      _value > 0,
      ERR_INVALID_VALUE
    );

    balances[_from] = balances[_from].sub(_value);

    if (!_consume(_to, _value)) {
      balances[_to] = balances[_to].add(_value);
    }

    emit Transfer(_from, _to, _value);
  }

  function _approve(
    address _owner,
    address _spender,
    uint256 _value
  ) internal {
    require(
      _owner != address(0),
      ERR_INVALID_OWNER
    );
    require(
      _spender != address(0),
      ERR_INVALID_SPENDER
    );

    allowances[_owner][_spender] = _value;

    emit Approval(_owner, _spender, _value);
  }

  function _mint(
    address _owner,
    uint256 _value
  ) internal {
    require(
      _owner != address(0),
      ERR_INVALID_OWNER
    );
    require(
      _value > 0,
      ERR_INVALID_VALUE
    );

    balances[_owner] = balances[_owner].add(_value);
    details.totalSupply = details.totalSupply.add(_value);

    emit Transfer(address(0), _owner, _value);
  }

  function _burn(
    address _owner,
    uint256 _value
  ) internal {
    require(
      _owner != address(0),
      ERR_INVALID_OWNER
    );
    require(
      _value > 0 &&
      balances[_owner] >= _value,
      ERR_INVALID_VALUE
    );

    balances[_owner] = balances[_owner].sub(_value);
    details.totalSupply = details.totalSupply.sub(_value);

    emit Transfer(_owner, address(0), _value);
  }

  function _consume(
    address _consumer,
    uint256 _value
  ) internal returns (bool _result) {
    if (
      consumers[_consumer]
    ) {
      _result = true;

      uint256 _weiValue = calcExchangeToWei(_value);

      if (_weiValue > 0) {
        require(
          _consumer.toPayable().send(_weiValue),
          ERR_SEND_FAILED
        );
      }

      details.totalSupply = details.totalSupply.sub(_value);
    }

    return _result;
  }
}
