import { useEthers } from '@usedapp/core'
// import React from 'react'

export const Header = () => {
    const { account, activateBrowserWallet, deactivate } = useEthers()
    const isConnected = account !== undefined
    return (
        <div>
            {isConnected
                ?
                <button color='primary' onClick={deactivate}>Disconnect</button>
                :
                <button color='primary' onClick={activateBrowserWallet}>Connect</button>
            }
        </div>
    )
}