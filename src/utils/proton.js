import ProtonWebSDK from '@proton/web-sdk'
import {
  FreeosBlockChainState
} from '../services/FreeosBlockChainState'

class ProtonSDK {
  constructor () {
    this.chainId = process.env.NETWORK_CHAIN_ID
    this.endpoints = process.env.APP_CHAIN_ENDPOINT.split(", "); // Multiple for fault tolerance
    this.appName = 'Freeos'
    this.requestAccount = process.env.AIRCLAIM_CONTRACT // optional
    this.session = null
    this.link = null
  }

  connect = async (restoreSession) => {
    console.log('login', this.options)
    try {
      const { link, session } = await ProtonWebSDK({
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
      });
      console.log('login', session)
      console.log('loginLink', link)
      this.link = link;
      this.session = session;
    } catch (e) {
      console.error(e);
    }
  }


  login = async () => {
    console.log('login', this.options)
    try {
      await this.connect(false);
      return { auth: this.session.auth};
    } catch (e) {
      console.error(e);
      return e;
    }
  }



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
      console.error(e);
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
      await this.connect(true);
      if (this.session) {
        return { auth: this.session.auth };
      } else {
        return { auth: { actor: '', permission: '' }};
      }
    } catch(e) {
      console.error(e);
      return e;
    }
  }
}

const protonSDK = new ProtonSDK()
export default protonSDK
