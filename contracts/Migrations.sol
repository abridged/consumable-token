pragma solidity 0.5.12;

/**
 * @title Migrations
 */
contract Migrations {

  address public owner;

  uint public last_completed_migration;

  // modifiers

  modifier restricted() {
    if (msg.sender == owner) {
      _;
    }
  }

  /**
   * @dev public constructor
   */
  constructor() public {
    owner = msg.sender;
  }

  // public methods

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
