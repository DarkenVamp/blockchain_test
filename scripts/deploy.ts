import { ethers } from "hardhat";
import * as fs from "fs";
import { abi } from '../artifacts/contracts/Energy.sol/Energy.json'


async function main() {
  const Energy = await ethers.getContractFactory("Energy")

  const energy = await Energy.deploy()
  await energy.deployed()

  const ContractData = {
    address: energy.address,
    abi: abi,
  }

  console.log("Writing Files to JSON")

  fs.mkdirSync('./src/artifacts', { recursive: true })
  fs.writeFileSync("./src/artifacts/Energy.json", JSON.stringify(ContractData))

  console.log(`Deployed Energy.sol at ${energy.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
