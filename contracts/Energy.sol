// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct User {
    string name;
    uint256 energy_amount;
}

contract Energy {
    mapping(address => User) private users;
    mapping(address => bool) private inserted;
    address[] private keys;

    function isRegistered(address uid) private view returns (bool) {
        return inserted[uid];
    }

    function register(string memory name, uint256 energy_amount) external {
        address uid = msg.sender;
        require(!isRegistered(uid));
        users[uid] = User(name, energy_amount);
        inserted[uid] = true;
        keys.push(uid);
    }

    function getAllUsers() external view returns (address[] memory) {
        return keys;
    }

    function getUser(address uid) public view returns (User memory) {
        require(isRegistered(uid));
        return users[uid];
    }

    function updateEnergy(address uid, uint256 amount) public {
        require(isRegistered(uid));
        users[uid].energy_amount = amount;
    }

    function buy_energy(address payable seller_acc, uint256 amount)
        external
        payable
    {
        require(seller_acc != msg.sender);

        User memory seller = getUser(seller_acc);
        User memory buyer = getUser(msg.sender);
        require(seller.energy_amount > amount);

        seller_acc.transfer(address(this).balance);
        updateEnergy(seller_acc, seller.energy_amount - amount);
        updateEnergy(msg.sender, buyer.energy_amount + amount);
    }
}
