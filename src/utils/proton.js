import { ConnectWallet } from '@protonprotocol/proton-web-sdk'
import {
  FreeosBlockChainState
} from '../services/FreeosBlockChainState'

class ProtonSDK {
  constructor () {
    this.chainId = process.env.NETWORK_CHAIN_ID
    this.endpoints = [process.env.APP_CHAIN_ENDPOINT] // Multiple for fault tolerance
    this.appName = 'Freeos'
    this.requestAccount = process.env.AIRCLAIM_CONTRACT // optional
    this.session = null
    this.link = null
  }

  connect = async ({ restoreSession }) => {
    const { link, session } = await ConnectWallet({
      linkOptions: {
        chainId: this.chainId,
        endpoints: this.endpoints,
        restoreSession
      },
      transportOptions: {
        requestAccount: this.requestAccount,
        backButton: true
      },
      selectorOptions: {
        appName: this.appName,
        appLogo: process.env.APP_LOGO,
        customStyleOptions: {
          /* Optional: Custom style options for modal */
          modalBackgroundColor: '#00a1ed',
          logoBackgroundColor: 'white',
          isLogoRound: true,
          optionBackgroundColor: '#0091dd',
          optionFontColor: 'white',
          primaryFontColor: 'white',
          secondaryFontColor: '#eee',
          linkColor: '#eee'
        }
      }
    })
    this.link = link
    this.session = session
  };

  login = async () => {
    try {
      await this.connect({ restoreSession: false })
      const { auth, accountData } = this.session
      return {
        auth,
        accountData: accountData[0]
      }
    } catch (e) {
      return e
    }
  };

  sendTransaction = async (actions) => {
    try {
      const result = await this.session.transact(
        { actions: actions },
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 30
        }
      )
      return result
    } catch (e) {
      return e
    }
  };

  logout = async () => {
    console.log('this.requestAccount',this.requestAccount);
    if (this.session && this.session.auth) await this.link.removeSession(this.requestAccount, this.session.auth)
    await FreeosBlockChainState.getInstance().singleFetch();
  }

  restoreSession = async () => {
    try {
      await this.connect({ restoreSession: true })
      if (this.session) {
        const { auth, accountData } = this.session
        return {
          auth,
          accountData: accountData[0]
        }
      }
    } catch (e) {
      return e
    }
    return {
      auth: {
        actor: '',
        permission: ''
      },
      accountData: {}
    }
  }
}

const protonSDK = new ProtonSDK()
export default protonSDK
