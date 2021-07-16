import notifyAlert from 'src/services/notify-alert'
// import { RpcError } from 'eosjs'
import { connect } from 'src/utils/smartContractRequest'
import ProtonSDK from '../../utils/proton'
import { FreeosBlockChainState } from '../../services/FreeosBlockChainState'
import { isFreeosEnabled } from './getters'

/**
 * Monitors the blockchain for changes related to the current user
 * @param {*} state
 */
export async function monitorBlockChain (state) {
  FreeosBlockChainState.getInstance().on('change', (data) => {
    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          state.commit('set' + key, data[key])
        }
      }
      /*
        this.balance = data.XPRBalance;
        this.currentIteration = data.currentIteration;
        this.nextIteration = data.nextIteration;
        this.isRegistered = data.isRegistered;
        this.user = data.user;
        this.statistics = data.statistics;
        this.unvests = data.unvests;

        this.stakeRequirement = data.stakeRequirement ;
        this.userHasStaked = data.userHasStaked;
        this.canUnvest = data.canUnvest;

        this.userClaimedAlready = data.userClaimedAlready;
        */
    }
  })
}
export async function fetch(state) {
  var result = await FreeosBlockChainState.getInstance().singleFetch()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration
  console.log('setisFreeosEnabled', result)
   return result;
}

export async function transfer ({ state }, submitData) {
  console.log('transfer', submitData)
  var result = await FreeosBlockChainState.getInstance().transfer(submitData)
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of transfer', result)
  return result;
}

export async function register () {
  var result = await FreeosBlockChainState.getInstance().register()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration
  return result;
}
export async function reregister() {
  var result = await FreeosBlockChainState.getInstance().reregister()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration
  return result;
}


export async function claim () {
  var result = await FreeosBlockChainState.getInstance().claim()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of claim', result)
  return result;
}

export async function stake ({ state }, submitData) {
  var result = await FreeosBlockChainState.getInstance().stake(submitData)
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration
  console.log('Result of stake', result)
  return result;
}

export async function unstake () {
  var result = await FreeosBlockChainState.getInstance().unstake()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of unstake', result)
  return result;
}

export async function cancelUnstake () {
  var result = await FreeosBlockChainState.getInstance().cancelUnstake()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of cancelUnstake', result)
  return result;
}

export async function convertOptions({ state }, submitData) {
  var result = await FreeosBlockChainState.getInstance().convertOptions(submitData)
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of convertOptions', result)
  return result;
}




export async function unvest() {
  var result = await FreeosBlockChainState.getInstance().unvest()
  console.log('Result of unvest', result)
}

