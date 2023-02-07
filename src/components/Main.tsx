import { Contract, utils } from 'ethers'
import { useEthers, useEtherBalance, Localhost } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"
import Users from '../Users.json'
import { GetAllUsers, Register } from '../hooks'
// import Energy from '../Energy.json'
import { useEffect } from 'react'

export const Main = () => {
    const { account } = useEthers()
    const etherBalance = useEtherBalance(account, { chainId: Localhost.chainId })
    const USERS_ADDRESS = '0x6D11948C194C466eBB59362bDF5dA86F527bb0A2'
    // const ENERGY_ADDRESS = '0x49cD6Eb11e9aCa1Ce45E8d0D980fc384A1256219'
    const users = new Contract(USERS_ADDRESS, new utils.Interface(Users.abi))
    // const energy = new Contract(ENERGY_ADDRESS, new utils.Interface(Energy.abi))

    const { value: userList, error: errorUserList } = GetAllUsers(users)
    const { state: statusRegister, send: register } = Register(users)

    function getValue() {
        if (errorUserList) console.error(errorUserList.message)
        else console.log(...userList)
    }

    function setValue() {
        register(account, "Bob", 500)
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
            <button onClick={setValue}>Register</button>
            <button onClick={getValue}>Get Users</button>
        </div>
    )
}