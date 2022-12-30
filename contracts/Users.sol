// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct User {
    string name;
    uint256 energy_amount;
}

contract Users {
    mapping(address => User) private users;
    mapping(address => bool) private inserted;
    address[] private keys;

    function isRegistered(address uid) private view returns (bool) {
        return inserted[uid];
    }

    function register(
        address uid,
        string memory name,
        uint256 energy_amount
    ) external {
        require(!isRegistered(uid));
        users[uid] = User(name, energy_amount);
        inserted[uid] = true;
        keys.push(uid);
    }

    function getAllUsers() external view returns (address[] memory) {
        return keys;
    }

    function getUser(address uid) external view returns (User memory) {
        require(isRegistered(uid));
        return users[uid];
    }

    function updateEnergy(address uid, uint256 amount) external {
        require(isRegistered(uid));
        users[uid].energy_amount = amount;
    }
}
