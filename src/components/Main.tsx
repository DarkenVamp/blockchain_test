import { Contract, utils } from 'ethers'
import { useEthers, useEtherBalance, Localhost } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"
import { GetAllUsers, GetUser, Register } from '../hooks'
import { address as EnergyAddress, abi as EnergyABI } from '../artifacts/Energy.json'
import { useEffect, useState } from 'react'

export const Main = () => {
    const { account } = useEthers()
    const etherBalance = useEtherBalance(account, { chainId: Localhost.chainId })
    const energy = new Contract(EnergyAddress, new utils.Interface(EnergyABI))

    const [accountAddress, setAccountAddress] = useState("")
    const [userName, setUserName] = useState("")
    const [userEnergy, setUserEnergy] = useState(0)

    const { value: userList, error: errorUserList } = GetAllUsers(energy)
    const { state: statusRegister, send: register } = Register(energy)
    const { value: accountDetails, error: errorAccountDetails } = GetUser(energy, accountAddress)


    function getValue() {
        if (errorUserList) console.error(errorUserList.message)
        else console.log(...userList)
    }

    function setValue() {
        register(userName, userEnergy)
    }

    function getAccount() {
        const { name, energy_amount } = accountDetails[0]
        if (errorAccountDetails) console.error(errorAccountDetails.message)
        else console.log(name, energy_amount.toString())
    }

    useEffect(() => {
        console.log("Get:")
        console.log(userList)
    }, [userList])

    useEffect(() => {
        console.log("Set:")
        console.log(statusRegister)
    }, [statusRegister])


    return (
        <div>
            {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
            <input placeholder='Enter Name' onChange={(e) => setUserName(e.target.value)} />
            <input placeholder='Enter Energy' onChange={(e) => setUserEnergy(parseInt(e.target.value))} />
            <button onClick={setValue}>Register</button>
            <br />
            <button onClick={getValue}>Get Users</button>
            <br />
            <input placeholder='Enter User Address' onChange={(e) => setAccountAddress(e.target.value)} />
            <button onClick={getAccount}>Get User Info</button>
        </div>
    )
}