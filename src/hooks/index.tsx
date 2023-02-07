import { useCall, useContractFunction } from '@usedapp/core'
import { Contract } from 'ethers'

export function GetAllUsers(contract: Contract) {
    const { value, error } = useCall({
        contract: contract,
        method: "getAllUsers",
        args: []
    }) ?? {}

    return { value, error }
}

export function Register(contract: Contract) {
    const { state, send } = useContractFunction(contract, "register")
    return { state, send }
}