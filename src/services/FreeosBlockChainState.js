// import { connect } from 'src/utils/smartContractRequest'
import {
  EventEmitter
} from 'events'



const {
  JsonRpc
} = require('eosjs')
// endpoint
const rpc = new JsonRpc('https://' + process.env.NETWORK_HOST + ':' + process.env.NETWORK_PORT, {
  fetch
})

import {
  Loading,
  Notify
} from 'quasar'
import ProtonSDK from '../utils/proton'
import definition from '../store/freeos/definition'

function connect (config) {
  return rpc.get_table_rows(config)
}

export class FreeosBlockChainState extends EventEmitter {
  static sInstance = null;

  static getInstance () {
    var sInstance = FreeosBlockChainState.sInstance

    if (!sInstance) {
      FreeosBlockChainState.sInstance = sInstance = new FreeosBlockChainState()
    }

    console.log('sInstance.isRunning', sInstance.isRunning)

    return sInstance
  }

  constructor () {
    super()
    this.start()
  }

  setWalletUser (walletUser) {
    this.walletUser = walletUser
  }

  /**
   * Starts monitor for changes on the block chain
   */
  start () {
    console.log('  var isRunning = false', this.isRunning);
    if (this.isRunning) return

    this.isRunning = true
    console.log('Starting...')

    var fetchTimer = () => {
      console.log('Fetching data....')

      ProtonSDK.restoreSession().then((auth) => {
        console.log('Wallet session restored', auth)

        this.setWalletUser({
          accountName: (auth ? auth.auth.actor : null),
          walletId: ProtonSDK && ProtonSDK.link ? ProtonSDK.link.walletType : null
        })

        console.log('NOW WALLET USER IS: ', this.walletUser)

        this.actionFetch().then((data) => {
          console.log('changedata', data);
          this.emit('change', data)
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(fetchTimer, process.env.TIMED_FETCH_DELAY)
        }).catch(err => {
          console.log('Problem fetching data', err)
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(fetchTimer, process.env.TIMED_FETCH_DELAY)
        })
      })
    }
    fetchTimer()
  }

  stop () {
    this.isRunning = false
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  async register () {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'reguser')
  }

  async reregister() {
      return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'reverify')
  }

  async convertOptions(sendData) {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'convert', sendData)
  }





  async sendTransaction (contractAccountName, contractName, extraData) {
    console.log('extraData', extraData)

    var accountName = this.walletUser ? this.walletUser.accountName : null
    var actionData = {}

    if (extraData) {
      actionData = extraData
    } else {
      actionData.user = accountName
    }

    if (!accountName) {
      console.log('No account.....')
      return
    }
    try {
      const actions = [{
        account: contractAccountName,
        name: contractName,
        authorization: [{
          actor: accountName,
          permission: 'active'
        }],
        data: actionData
      }]
      console.log('Sending transaction with', actions)
      const result = await ProtonSDK.sendTransaction(actions)

      setTimeout(() => {
        this.fetch() // Do a manual fetch of current state
      }, process.env.FETCH_DELAY)

      return result
    } catch (e) {
      console.log('Problem sendingTransaction ' + contractName, e)
    }
  }

  async claim () {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'claim')
  }

  async transfer (sendData) {
    console.log('sendData', sendData)
    var contract = process.env.FREEOSTOKENS_CONTRACT
    if (sendData.token === process.env.STAKING_CURRENCY) {
      contract = process.env.CURRENCY_CONTRACT
    }
    sendData.quantity = `${parseFloat(sendData.quantity).toFixed(process.env.TOKEN_PRECISION)} ${sendData.token}`
    delete sendData.token
    return this.sendTransaction(contract, 'transfer', sendData)
  }

  async fetch () {
    try {
      this.stop()
      this.actionFetch()
    } finally {
      this.start()
    }
  }

  async singleFetch (){
      await ProtonSDK.restoreSession().then((auth) => {
        console.log('Wallet session restored', auth)

        this.setWalletUser({
          accountName: (auth ? auth.auth.actor : null),
          walletId: ProtonSDK && ProtonSDK.link ? ProtonSDK.link.walletType : null
        })


        this.actionFetch().then((data) => {
          console.log('changedata', data);
          this.emit('change', data)
        }).catch(err => {
          console.log('Problem fetching data', err)
        })
      })
  }

  async unstake () {
    console.log('unstake')
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'unstake')
  }

  async unvest() {
    console.log('unstake')
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'unvest')
  }


async cancelUnstake () {
  console.log('cancelUnstake')
  return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'unstakecncl')
}


  async stake (stakeRequirement) {
    var sendData = {}
    sendData.from = this.walletUser ? this.walletUser.accountName : null
    sendData.to = process.env.AIRCLAIM_CONTRACT
    sendData.memo = 'freeos stake'
    sendData.quantity = `${parseFloat(stakeRequirement).toFixed(process.env.TOKEN_PRECISION)} ` + process.env.STAKING_CURRENCY || 'XPR'
    return this.sendTransaction(process.env.CURRENCY_CONTRACT, 'transfer', sendData)
  }


async logout() {
    await this.setWalletUser({})
    await this.singleFetch();
}



  async actionFetch () {
    console.log('state.state.accountName', this.walletUser ? this.walletUser.accountName : 'N/A')

    var masterswitch = await this.getRecord(process.env.AIRCLAIM_CONFIGURATION_CONTRACT, 'parameters', null, {
      lower_bound: 'masterswitch',
      upper_bound: 'masterswitch',
      limit: 1
    })
    console.log('masterswitch', masterswitch)
    var isFreeosEnabled = masterswitch && masterswitch.value && masterswitch.value === '1' ? true : false

    // Row data
    // {"iteration_number":1,"start":"2021-04-27T22:59:59.000","end":"2021-04-28T04:00:00.000","claim_amount":100,"tokens_required":0}
    var currentIterationPromise = await this.getRecord(process.env.AIRCLAIM_CONFIGURATION_CONTRACT, 'iterations')



    if (currentIterationPromise && !Array.isArray(currentIterationPromise)){
      var newcurrentIterationPromise = [];
      newcurrentIterationPromise.push(currentIterationPromise);
      currentIterationPromise = newcurrentIterationPromise;
    }

    // {"stake":"0.0000 XPR","account_type":101,"registered_time":"2021-03-01T07:10:04","staked_iteration":0,"votes":0,"issuances":0,"last_issuance":0}

    // {"usercount":36,"claimevents":58,"unvestpercent":0,"unvestpercentiteration":1,"iteration":1,"failsafecounter":1}
    var bcStatisticsPromise = this.getRecord(process.env.AIRCLAIM_CONTRACT, 'statistics')
    // Currently empty
    var bcUnvestsPromise = this.getRecord(process.env.AIRCLAIM_CONTRACT, 'unvests', )

    var bcStateRequirementsPromise = this.getRecord(process.env.AIRCLAIM_CONFIGURATION_CONTRACT, 'stakereqs')

    var bcXPRBalancePromise = null
    var bcUnstakingPromise = null
    var optionsPromise = null
    var bcVestaccountsPromise = null
    var bcFreeosBalancePromise = null
    var bcAirkeyBalancePromise = null
    var bcUserPromise = null
    var stakeCurrency = process.env.STAKING_CURRENCY || 'XPR'
    var currencyName = process.env.CURRENCY_NAME || 'FREEOS'


    var dataRequests = [currentIterationPromise, bcStatisticsPromise, bcStateRequirementsPromise]

    if (this.walletUser && this.walletUser.accountName) {
      bcUnvestsPromise = this.getRecord(process.env.AIRCLAIM_CONTRACT, 'unvests', this.walletUser.accountName)


      bcUserPromise = this.getUserRecord(process.env.AIRCLAIM_CONTRACT, 'users')
      // {"rows":[{"balance":"24920.0000 XPR"}],"more":false,"next_key":""}
      bcXPRBalancePromise = this.getUserRecordAsNumber(process.env.CURRENCY_CONTRACT, 'accounts', {
        upper_bound: stakeCurrency,
        lower_bound: stakeCurrency,
        limit: 1
      }, 'balance')

      bcUnstakingPromise = this.getRecord(process.env.AIRCLAIM_CONTRACT, 'unstakereqs', process.env.AIRCLAIM_CONTRACT, {
        limit: 1,
        upper_bound: this.walletUser.accountName,
        lower_bound: this.walletUser.accountName
      })
      optionsPromise = this.getUserRecordAsNumber(process.env.AIRCLAIM_CONTRACT, 'accounts', {
        upper_bound: 'OPTION',
        lower_bound: 'OPTION',
        limit: 1
      }, 'balance')
      bcVestaccountsPromise = this.getUserRecordAsNumber(process.env.AIRCLAIM_CONTRACT, 'vestaccounts', {
        upper_bound: 'OPTION',
        lower_bound: 'OPTION',
        limit: 1
      }, 'balance')
      bcFreeosBalancePromise = this.getUserRecordAsNumber(process.env.FREEOSTOKENS_CONTRACT, 'accounts', {
        upper_bound: currencyName,
        lower_bound: currencyName,
        limit: 1
      }, 'balance')
      bcAirkeyBalancePromise = this.getUserRecordAsNumber(process.env.AIRCLAIM_CONTRACT, 'accounts', {
        lower_bound: 'AIRKEY',
        upper_bound: 'AIRKEY',
        limit: 1
      }, 'balance')
      dataRequests = dataRequests.concat([bcUnvestsPromise, bcUserPromise, bcXPRBalancePromise, bcUnstakingPromise, optionsPromise, bcVestaccountsPromise, bcFreeosBalancePromise, bcAirkeyBalancePromise])
    }

    var outputValues = await Promise.all(dataRequests) // .then((values) => {
    let [currentIteration, bcStatistics, bcStateRequirements, bcUnvests, bcUser, bcXPRBalance, bcUnstaking, liquidOptions, vestedOptions, freeosBalance, bcAirkeyBalance] = outputValues
    if (!bcAirkeyBalance) bcAirkeyBalance = 0
    if (!liquidOptions) liquidOptions = 0
    if (!vestedOptions) vestedOptions = 0
    if (!freeosBalance) freeosBalance = 0

    var unstakingIteration = bcUnstaking && bcUnstaking.iteration ? bcUnstaking.iteration : 0;
    bcUnstaking = !!bcUnstaking;

    var iterations = this.getCurrentAndNextIteration(currentIteration)

    var currentIterationIdx = (iterations != null && iterations.currentIteration ? iterations.currentIteration.iteration_number : -1)

    console.log('currentIterationIdx', currentIterationIdx)

    if (currentIterationIdx === 0 || currentIterationIdx === -1) {
      isFreeosEnabled = false;
    }

    var unvestedAlready = bcUnvests != null && bcUnvests.iteration_number == currentIterationIdx

    var canUnvest = bcStatistics && bcStatistics.unvestpercent > 0 && !unvestedAlready

    var registeredUserCount = bcStatistics && bcStatistics.usercount ? bcStatistics.usercount : 0

    var stakeRequirement = null
    var userHasStaked = false
    var userClaimedAlready = false
    var userEligibleToClaim = false
    var holdingRequirement = (iterations != null && iterations.currentIteration) ? iterations.currentIteration.tokens_required : 9999999
    var userMeetsHoldingRequirement = false
    var userMeetsStakeRequirement = false
    var userStake = 0
    var totalHolding = 0
    var reasonCannotClaim = ''

    if (bcUser) { // Registered
      for (var i = bcStateRequirements.length - 1; i >= 0; --i) {
        var stakeReq = bcStateRequirements[i]
        if (registeredUserCount >= stakeReq.threshold) {
          stakeRequirement = stakeReq['requirement_' + String.fromCharCode(bcUser.account_type)] // ascii to char conversion (will be a 'd', 'e' or 'v')
          break
        }
      }

      totalHolding = liquidOptions + vestedOptions + freeosBalance
      userStake = parseFloat(bcUser.stake)
      userHasStaked = bcUser.staked_iteration > 0
      userClaimedAlready = bcUser.last_issuance == currentIterationIdx

      userMeetsHoldingRequirement = bcAirkeyBalance > 0 || totalHolding >= holdingRequirement
      userMeetsStakeRequirement = bcAirkeyBalance > 0 || userHasStaked

      userEligibleToClaim = currentIterationIdx > 0 && userMeetsHoldingRequirement && userMeetsStakeRequirement && !userClaimedAlready

      if (!userEligibleToClaim) {
        if (currentIterationIdx <= 0) {
          reasonCannotClaim = "<div class='text-h5 text-negative'>Airclaim Not Started</div>"
        } else if (!userMeetsHoldingRequirement) {
          reasonCannotClaim = 'Opps! In order to Claim you need a minimum ' + iterations.currentIteration.tokens_required + " OPTIONS in your Wallet. Please <a href='/transfer'>transfer</a> an additional " + (iterations.currentIteration.tokens_required - totalHolding) + ' ' + currencyName + ' in order to Claim'
        } else if (userClaimedAlready) {
          reasonCannotClaim = '<div class="text-h5 text-primary">You have already claimed</div>'
        } else if (!userMeetsStakeRequirement) {
          reasonCannotClaim = "<div class='text-h5 text-negative'>You must <router-link to='/stake' class='text-negative'>stake</router-link> to claim!</div>"
        }
      }
    }

    var output = {
      currencyName: currencyName,
      liquidOptions: liquidOptions,
      currentIteration: iterations && iterations.currentIteration ? iterations.currentIteration : null,
      nextIteration: iterations.nextIteration,
      user: bcUser,
      accountName: this.walletUser.accountName,
      isAuthenticated: this.walletUser.accountName && this.walletUser.accountName !== '' ? true : false,
      isRegistered: bcUser !== null ? true : false, 
      statistics: bcStatistics,
      unvests: bcUnvests,
      unvestPercentage: bcStatistics && bcStatistics.unvestpercent ? bcStatistics.unvestpercent : 0,
      canUnvest: canUnvest,
      bcStateRequirements,
      isFreeosEnabled: isFreeosEnabled,
      XPRBalance: bcXPRBalance ? bcXPRBalance : null,
      bcUnstaking,
      unstakingIteration: unstakingIteration,
      vestedOptions,
      liquidFreeos: freeosBalance,
      airkeyBalance: bcAirkeyBalance,
      allIterations: currentIteration,

      stakeRequirement: stakeRequirement,
      userHasStaked: userHasStaked,
      userClaimedAlready: userClaimedAlready,
      userStake: userStake,
      userMeetsStakeRequirement: userMeetsStakeRequirement,
      totalFreeos: totalHolding,
      canClaim: userEligibleToClaim,

      reasonCannotClaim: reasonCannotClaim
    }

    console.log('output', output)

    return output
    // alert(process.env.AIRCLAIM_CONTRACT)
    /*
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

    console.log('val', val)

    return val
    */
  }

  async getUserRecordAsNumber (scopeName, tableName, additionalParams, propertyName) {
    var obj = await this.getUserRecord(scopeName, tableName, additionalParams)
    if (obj && obj[propertyName]) {
      var s = obj[propertyName]
      return parseFloat(s)
    }
    return null
  }

  async getUserRecord (scopeName, tableName, additionalParams) {
    return this.getRecord(scopeName, tableName, this.walletUser.accountName, additionalParams)
  }

  async getRecord (codeName, tableName, scopeName, additionalParams) {
    // console.log('getRecord...',codeName, tableName)

    if (!scopeName) scopeName = codeName

    var query = {
      json: true,
      code: codeName,
      scope: scopeName,
      table: tableName // the name of the table
    }

    if (additionalParams) {
      query.limit = additionalParams.limit
      query.upper_bound = additionalParams.upper_bound
      query.lower_bound = additionalParams.lower_bound
    }

    const result = await connect(query)
    // console.log('result',codeName, tableName,result)

    if (result && result.rows) {
      if (result.rows.length === 1) {
        return result.rows[0]
      } else if (result.rows.length > 0) {
        return result.rows
      } else {
        return null
      }
    }
    return null
  }

  getCurrentAndNextIteration (rows) {
    console.log('getCurrentAndNextIteration', rows)

    const currentTimeStamp = Math.floor(Date.parse(new Date().toISOString()) / 1000); // Math.floor((new Date()).getTime() / 1000)
    var nextIteration = {
      iteration_number: 0
    }
    var currentIteration = null

    if (rows && rows.length) {
      rows.map((row, index) => {
        const startTimeStamp = Math.floor(Date.parse(row.start + "Z") / 1000);
        const endTimeStamp = Math.floor(Date.parse(row.end + "Z") / 1000);

        // console.log('startTimeStamp', startTimeStamp);

        if (currentTimeStamp > startTimeStamp && currentTimeStamp < endTimeStamp) {
          currentIteration = rows[index]
          if (rows.length !== (index + 1)) {
            nextIteration = rows[index + 1]
          } else {
            nextIteration = null
          }
        }
      })
    }
    return {
      currentIteration,
      nextIteration
    }
  }
}
