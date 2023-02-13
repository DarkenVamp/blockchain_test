import { Contract, utils } from 'ethers'
import { useEthers, useEtherBalance, Localhost } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"
import { BuyEnergy, GetAllUsers, GetUser, Register } from '../hooks'
import { address as EnergyAddress, abi as EnergyABI } from '../artifacts/Energy.json'
import { useEffect, useState } from 'react'

export const Main = () => {
    const { account } = useEthers()
    const etherBalance = useEtherBalance(account, { chainId: Localhost.chainId })
    const energy = new Contract(EnergyAddress, new utils.Interface(EnergyABI))

    const [sellerAddress, setSellerAddress] = useState("")
    const [userName, setUserName] = useState("")
    const [userEnergy, setUserEnergy] = useState(0)
    const [buyingEnergy, setBuyingEnergy] = useState(0)

    const { value: userList, error: _errorUserList } = GetAllUsers(energy)
    const { state: statusRegister, send: register } = Register(energy)
    const { state: statusBuy, send: buyEnergy } = BuyEnergy(energy)
    const { value: accountDetails, error: _errorAccountDetails } = GetUser(energy, account as string)

    function registerUser() {
        register(userName, userEnergy)
    }

    function buy() {
        buyEnergy(sellerAddress, buyingEnergy)
    }

    useEffect(() => {
        console.log("GetUserList:")
        console.log(userList)
    }, [userList])

    useEffect(() => {
        console.log("Register:")
        console.log(statusRegister)
    }, [statusRegister])

    useEffect(() => {
        console.log("BuyEnergy:")
        console.log(statusBuy)
    }, [statusBuy])

    return (
        <div>
            {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
            {accountDetails && <div>Name: {accountDetails[0]["name"]} Energy: {accountDetails[0]["energy_amount"].toString()}</div>}

            <input placeholder='Enter Name' onChange={(e) => setUserName(e.target.value)} />
            <input placeholder='Enter Energy' onChange={(e) => setUserEnergy(parseInt(e.target.value))} />
            <button onClick={registerUser}>Register</button>
            <br />
            {userList && <ul>{userList[0].map((addr: string) => <li>{addr}</li>)}</ul>}

            <input placeholder='Enter Seller Address' onChange={(e) => setSellerAddress(e.target.value)} />
            <input placeholder='Enter Energy Amount' onChange={(e) => setBuyingEnergy(parseInt(e.target.value))} />
            <button onClick={buy}>Buy Energy</button>
            <br />
        </div>
    )
}