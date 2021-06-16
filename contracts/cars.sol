// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Cars {
  address owner;
  uint256 price;
  uint256[] identifiers;
  mapping(address => Car) cars;
  struct Car {
    uint256 identifier;
    string brand;
    uint32 horses;
    uint32 kilometers;
  }

  modifier filterPrice(uint256 _price) {
    require(_price == price);
    _;
  }

  constructor(uint256 _price) {
    owner = msg.sender;
    price = _price;
  }

  function addCar(uint256 _id, string memory _brand, uint32 _horses, uint32 _kilometers) public filterPrice(msg.value) payable {
    identifiers.push(_id);
    cars[msg.sender].identifier = _id;
    cars[msg.sender].brand = _brand;
    cars[msg.sender].horses = _horses;
    cars[msg.sender].kilometers = _kilometers;
  }

  function getIdentifiers () external view returns(uint256) {
    return identifiers.length;
  }

  function getCar() external view returns(string memory brand, uint32 horses, uint32 kilometers) {
    brand = cars[msg.sender].brand;
    horses = cars[msg.sender].horses;
    kilometers = cars[msg.sender].kilometers;
  }
}
