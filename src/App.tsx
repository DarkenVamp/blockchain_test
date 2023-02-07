import { DAppProvider, Config, Mainnet, Goerli, Localhost } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { Header } from './components/Header'
import { Main } from './components/Main'
import './App.css'

const config: Config = {
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
    [Localhost.chainId]: 'http://127.0.0.1:8545',
  }
}

function App() {
  return (
    <DAppProvider config={config}>
      <Header />
      <Main />
    </DAppProvider>
  )
}

export default App
