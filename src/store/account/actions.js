import notifyAlert from 'src/services/notify-alert'
import { connect } from 'src/utils/smartContractRequest'
import ProtonSDK from '../../utils/proton'

export async function checkIfLoggedIn (state) {
  const { auth } = await ProtonSDK.restoreSession()
  if (auth && auth.actor && auth.permission) {
    state.commit('setAccount', {
      accountName: auth.actor,
      walletId: ProtonSDK.link.walletType
    })
  }
}

export function connectWallet (state, name) {
  // if (name === 'scatter') {
  //   state.dispatch('connectScatter', 'scatter')
  // } else if (name === 'anchor') {
  state.dispatch('connectProton', name)
  // }
}

/**
 * Connect to a wallet
 * Don't use arrow function here to have access to Vue prototype (this.$...)
 *
 * @param commit
 * @param walletId
 * @returns {Promise<void>}
 */
export const connectScatter = async function ({ commit }, walletId) {
  commit('setConnecting', true)
  const wallet = this.$transit.accessContext.initWallet(this.$transit.accessContext.getWalletProviders().find(r => r.id === walletId))
  wallet.subscribe(walletState => {
    let message
    let messageStatus = 1
    if (walletState.connecting) {
      message = `Connecting to ${walletId}`
    } else if (walletState.authenticating) {
      message = `Logging in to ${walletId}`
    } else if (walletState.authenticationError) {
      message = walletState.authenticationErrorMessage
      messageStatus = 0
    } else if (walletState.connectionError) {
      message = walletState.connectionErrorMessage
      messageStatus = 0
    } else if (walletState.accountInfo) {
      if (!this.$transit.wallet || !this.$transit.wallet.accountInfo) {
        message = 'login successfully'
        commit('setAccount', {
          accountName: walletState.accountInfo.account_name,
          walletId
        })
      }
    }
    if (message) {
      // You can add some snackbar message here
      // console.log(message)
      notifyAlert(messageStatus, message)
    }
  })
  await wallet.connect()
  await wallet.login()
  this.$transit.wallet = wallet
  this.$transit.eosApi = wallet.eosApi
}

export async function connectProton (state, name) {
  try {
    // this.setState({ isLoggingIn: true })
    const { auth } = await ProtonSDK.login()
    console.log('contec', auth);
    if (auth && auth.actor && auth.permission) {
      state.commit('setAccount', {
        accountName: auth.actor,
        walletId: ProtonSDK.link.walletType
      })
      // setLoggedInState(auth.actor, auth.permission)
    }
    // this.setState({ isLoggingIn: false })
  } catch (e) {
    console.error(e)
  }
}

export const logout = async function ({ commit }) {
  await commit('clearAccount', null)
  await ProtonSDK.logout()
  console.log("PUSH", this.$router)
  // this.$router.push('/')
}

export function getAccountInfo (state) {
  state.dispatch('GetFreeosRecord')
  state.dispatch('getLiquidInAccount')
  state.dispatch('getStakeRequirementInfo')
  state.dispatch('getResAirKey')
  state.dispatch('getUserStakedInfo')
  state.dispatch('getFreeosInfo')
  state.dispatch('getRespMasterSwitch')
}

export async function GetFreeosRecord (state) {
  const result = await connect({
    json: true,
    code: process.env.AIRCLAIM_CONTRACT,
    scope: state.state.accountName, // the subset of the table to query
    table: 'users' // the name of the table
  })
  const val = {
    key: 'respFreeosRecord',
    value: result.rows[0] || null
  }
  console.log(val)
  state.commit('setClaimAttributeVal', val)
}

export async function getLiquidInAccount (state) {
  const result = await connect({
    json: true,
    code: 'eosio.token', // account containing smart contract
    scope: state.state.accountName, // the subset of the table to query
    table: 'accounts', // the name of the table
    limit: -1 // limit on number of rows returned
  })
  const val = {
    key: 'liquidInAccount',
    value: result.rows[0] || null
  }
  state.commit('setClaimAttributeVal', val)
}

export async function getStakeRequirementInfo (state) {
  const result = await connect({
    json: true,
    code: process.env.AIRCLAIM_CONTRACT,
    scope: process.env.AIRCLAIM_CONTRACT,
    table: 'stakes' // the name of the table
  })

  const val = {
    key: 'respStakeRequirement',
    value: result.rows[0]
  }
  state.commit('setClaimAttributeVal', val)
}

export async function getResAirKey (state) {
  const result = await connect({
    json: true,
    code: process.env.AIRCLAIM_CONTRACT,
    scope: state.state.accountName,
    table: 'accounts',
    lower_bound: 'AIRKEY',
    limit: 1
  })

  const val = {
    key: 'respAirKey',
    value: result.rows[0]
  }
  state.commit('setClaimAttributeVal', val)
}

export async function getUserStakedInfo (state) {
  const result = await connect({
    json: true,
    code: process.env.AIRCLAIM_CONTRACT,
    scope: state.state.accountName,
    table: 'users',
    limit: 1
  })

  const val = {
    key: 'stakedInfo',
    value: result.rows[0] || null
  }
  state.commit('setClaimAttributeVal', val)
}

export async function getFreeosInfo (state) {
  const result = await connect({
    json: true,
    code: process.env.AIRCLAIM_CONTRACT,
    scope: state.state.accountName,
    table: 'accounts',
    lower_bound: 'FREEOS',
    limit: 1
  })

  const val = {
    key: 'freeosInAccount',
    value: result.rows[0]
  }
  state.commit('setClaimAttributeVal', val)
}

export async function getRespMasterSwitch (state, acccountName) {
  const result = await connect({
    json: true,
    code: process.env.AIRCLAIM_CONFIGRATION_CONTRACT,
    scope: process.env.AIRCLAIM_CONFIGRATION_CONTRACT,
    table: 'parameters',
    lower_bound: 'masterswitch',
    limit: 1
  })

  const val = {
    key: 'respMasterSwitch',
    value: result.rows[0]
  }
  state.commit('setClaimAttributeVal', val)
}

export async function getClaimDetailInfo (state, iterationNumber) {
  let respIsUserAlreadyClaimed = null
  if (iterationNumber) {
    respIsUserAlreadyClaimed = await connect({
      json: true,
      code: process.env.AIRCLAIM_CONTRACT,
      scope: state.state.accountName,
      table: 'claims',
      lower_bound: iterationNumber,
      limit: 1
    })
  }

  const respIsUserAlreadyClaimedVal = {
    key: 'respIsUserAlreadyClaimed',
    value: respIsUserAlreadyClaimed?.rows[0]
  }
  state.commit('setClaimAttributeVal', respIsUserAlreadyClaimedVal)
}

export const setpath = function ({ commit }, pathe) {
  console.log(this.$route.fullPath)
  console.log('whatever', pathe)
  commit('setPath', pathe)
  // this.$router.push('/')
}
