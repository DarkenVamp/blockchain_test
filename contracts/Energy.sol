// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Users.sol";

contract Energy {
    Users private users = new Users();

    function register(string memory name, uint256 energy_amount) external {
        users.register(msg.sender, name, energy_amount);
    }

    function buy_energy(address payable seller_acc, uint256 amount)
        external
        payable
    {
        require(seller_acc != msg.sender);

        User memory seller = users.getUser(seller_acc);
        User memory buyer = users.getUser(msg.sender);
        require(seller.energy_amount > amount);

        seller_acc.transfer(address(this).balance);
        users.updateEnergy(seller_acc, seller.energy_amount - amount);
        users.updateEnergy(msg.sender, buyer.energy_amount + amount);
    }

    function getUserData(address uid) external view returns (User memory) {
        return users.getUser(uid);
    }

    function getAllUsers() external view returns (address[] memory) {
        return users.getAllUsers();
    }
}
