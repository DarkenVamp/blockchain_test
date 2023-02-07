import { ethers } from "hardhat";
import * as fs from "fs";
import { abi as UsersABI } from '../artifacts/contracts/Users.sol/Users.json'
import { abi as EnergyABI } from '../artifacts/contracts/Energy.sol/Energy.json'


async function main() {
  const Users = await ethers.getContractFactory("Users")
  const Energy = await ethers.getContractFactory("Energy")

  const users = await Users.deploy()
  await users.deployed()

  const energy = await Energy.deploy()
  await energy.deployed()

  const UsersData = {
    address: users.address,
    abi: UsersABI,
  }

  const EnergyData = {
    address: energy.address,
    abi: EnergyABI,
  }

  console.log("Writing Files to JSON")

  fs.mkdirSync('./src/artifacts', { recursive: true })
  fs.writeFileSync("./src/artifacts/Users.json", JSON.stringify(UsersData))
  fs.writeFileSync("./src/artifacts/Energy.json", JSON.stringify(EnergyData))

  console.log(`Deployed Users.sol at ${users.address}`)
  console.log(`Deployed Energy.sol at ${energy.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
