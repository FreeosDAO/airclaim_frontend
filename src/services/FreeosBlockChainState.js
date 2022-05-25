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

function connect(config) {
  return rpc.get_table_rows(config)
}

export class FreeosBlockChainState extends EventEmitter {
  static sInstance = null;

  static getInstance() {
    var sInstance = FreeosBlockChainState.sInstance

    if (!sInstance) {
      FreeosBlockChainState.sInstance = sInstance = new FreeosBlockChainState()
    }

    return sInstance
  }

  constructor() {
    super()
    this.start()
  }

  setWalletUser(walletUser) {
    this.walletUser = walletUser
  }

  /**
   * Starts monitor for changes on the block chain
   */
  async start() {
    if (this.isRunning) return

    this.isRunning = true

    var fetchTimer = async () => {

      const { auth } = await ProtonSDK.restoreSession();

      console.log('Wallet session restored', auth)

      this.setWalletUser({
        accountName: (auth ? auth.actor : null),
        walletId: ProtonSDK && ProtonSDK.link ? ProtonSDK.link.walletType : null
      })


      this.actionFetch().then((data) => {
        this.emit('change', data)
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(fetchTimer, process.env.TIMED_FETCH_DELAY)
      }).catch(err => {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(fetchTimer, process.env.TIMED_FETCH_DELAY)
        console.error(err);
      })

    }
    fetchTimer()
  }

  stop() {
    this.isRunning = false
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  async register() {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'reguser')
  }

  async reregister() {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'reverify')
  }

  async convertOptions(sendData) {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'convert', sendData)
  }





  async sendTransaction(contractAccountName, contractName, extraData) {
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

  async claim() {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'claim')
  }

  async transfer(sendData) {
    var contract = process.env.FREEOSTOKENS_CONTRACT
    if (sendData.token === process.env.STAKING_CURRENCY) {
      contract = process.env.STAKING_CURRENCY_CONTRACT
    }
    delete sendData.token
    return this.sendTransaction(contract, 'transfer', sendData)
  }

  async fetch() {
    try {
      this.stop()
      this.actionFetch()
    } finally {
      this.start()
    }
  }

  async singleFetch() {
    const { auth } = await ProtonSDK.restoreSession()

    this.setWalletUser({
      accountName: (auth ? auth.actor : null),
      walletId: ProtonSDK && ProtonSDK.link ? ProtonSDK.link.walletType : null
    })


    this.actionFetch().then((data) => {
      this.emit('change', data)
    }).catch(err => {
      console.log('Problem fetching data', err)
    })

  }

  async unstake() {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'unstake')
  }

  async unvest() {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'unvest')
  }

  async vote(sendData) {
    return this.sendTransaction(process.env.VOTEMVP_CONTRACT, 'vote', sendData)
  }


  async cancelUnstake() {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'unstakecncl')
  }


  async stake(stakeRequirement) {
    var sendData = {}
    sendData.from = this.walletUser ? this.walletUser.accountName : null
    sendData.to = process.env.AIRCLAIM_CONTRACT
    sendData.memo = 'freeos stake'
    sendData.quantity = `${parseFloat(stakeRequirement).toFixed(process.env.STAKING_CURRENCY_PRECISION)} ` + process.env.STAKING_CURRENCY || 'XPR'
    return this.sendTransaction(process.env.STAKING_CURRENCY_CONTRACT, 'transfer', sendData)
  }


  async logout() {
    await this.setWalletUser({})
    await this.singleFetch();
  }

  capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  async actionFetch() {


    var parametersTable = await this.getRecord(process.env.AIRCLAIM_CONFIGURATION_CONTRACT, 'parameters', null, {
      lower_bound: '',
      upper_bound: '',
      limit: 100
    })

    console.log('masterswitch', parametersTable)
    var masterswitch = parametersTable.filter(function(row){
        return row.paramname == 'masterswitch';
    })[0];
    console.log('masterswitch', masterswitch)
    var isFreeosEnabled = masterswitch && masterswitch.value && masterswitch.value === '1' ? true : false


    var announcetext = parametersTable.filter(function(row){return row.paramname == 'announcetext';})[0]
    var announceid = parametersTable.filter(function(row){return row.paramname == 'announceid';})[0]
    var announcelink = parametersTable.filter(function(row){return row.paramname == 'announcelink';})[0]

    var announceObj = {
      text: announcetext && announcetext.value ? announcetext.value : null,
      id: announceid && announceid.value ? announceid.value : null,
      link: announcelink && announcelink.value ? announcelink.value : null,
    } 

    var priceLabel = parametersTable.filter(function(row){
      return row.paramname == 'pricelabel';
    })[0];
    console.log('priceLabel', priceLabel)
    // Row data
    // {"iteration_number":1,"start":"2021-04-27T22:59:59.000","end":"2021-04-28T04:00:00.000","claim_amount":100,"tokens_required":0}
    var currentIterationPromise = await this.getRecord(process.env.AIRCLAIM_CONFIGURATION_CONTRACT, 'iterations', process.env.AIRCLAIM_CONFIGURATION_CONTRACT, { 'limit': 100 })



    if (currentIterationPromise && !Array.isArray(currentIterationPromise)) {
      var newcurrentIterationPromise = [];
      newcurrentIterationPromise.push(currentIterationPromise);
      currentIterationPromise = newcurrentIterationPromise;
    }

    // {"stake":"0.0000 XPR","account_type":101,"registered_time":"2021-03-01T07:10:04","staked_iteration":0,"votes":0,"issuances":0,"last_issuance":0}

    // {"usercount":36,"claimevents":58,"unvestpercent":0,"unvestpercentiteration":1,"iteration":1,"failsafecounter":1}
    var bcStatisticsPromise = this.getRecord(process.env.AIRCLAIM_CONTRACT, 'statistics')
    // Currently empty
    var bcUnvestsPromise = this.getRecord(process.env.AIRCLAIM_CONTRACT, 'unvests',)


    var bcVotePromise = this.getRecord(process.env.VOTEMVP_CONTRACT, 'dparameters', process.env.VOTEMVP_CONTRACT, {
      upper_bound: "lockfactor",
      lower_bound: "lockfactor",
      limit: 1
    })

    var bcStateRequirementsPromise = this.getRecord(process.env.AIRCLAIM_CONFIGURATION_CONTRACT, 'stakereqs', process.env.AIRCLAIM_CONFIGURATION_CONTRACT, { 'limit': 100 })

    var bcPreRegistrationPromise = null


    var bcXPRBalancePromise = null
    var bcUnstakingPromise = null
    var optionsPromise = null
    var bcVestaccountsPromise = null
    var bcFreeosBalancePromise = null
    var bcAirkeyBalancePromise = null
    var bcUserPromise = null
    var bcCurrentExchangeRatePromise = null;
    var bcSVRVotingPromise = null;
    var stakeCurrency = process.env.STAKING_CURRENCY || 'XPR'
    var currencyName = process.env.CURRENCY_NAME || 'FREEOS'

    var dataRequests = [currentIterationPromise, bcStatisticsPromise, bcStateRequirementsPromise]

    if (this.walletUser && this.walletUser.accountName) {
      bcUnvestsPromise = this.getRecord(process.env.AIRCLAIM_CONTRACT, 'unvests', this.walletUser.accountName)

      bcPreRegistrationPromise = this.getRecord('eosio.proton', 'usersinfo', 'eosio.proton', {
        limit: 1,
        upper_bound: this.walletUser.accountName,
        lower_bound: this.walletUser.accountName
      })

      bcUserPromise = this.getUserRecord(process.env.AIRCLAIM_CONTRACT, 'users');
      // {"rows":[{"balance":"24920.0000 XPR"}],"more":false,"next_key":""}
      bcXPRBalancePromise = this.getUserRecordAsNumber(process.env.STAKING_CURRENCY_CONTRACT, 'accounts', {
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
        upper_bound: process.env.TOKEN_CURRENCY_NAME,
        lower_bound: process.env.TOKEN_CURRENCY_NAME,
        limit: 1
      }, 'balance')
      bcVestaccountsPromise = this.getUserRecordAsNumber(process.env.AIRCLAIM_CONTRACT, 'vestaccounts', {
        upper_bound: process.env.TOKEN_CURRENCY_NAME,
        lower_bound: process.env.TOKEN_CURRENCY_NAME,
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
      bcSVRVotingPromise = this.getUserRecord(process.env.VOTEMVP_CONTRACT, 'svrs', {
        limit: 1
      })
      bcCurrentExchangeRatePromise = this.getRecord(process.env.AIRCLAIM_CONFIGURATION_CONTRACT, 'exchangerate', process.env.AIRCLAIM_CONFIGURATION_CONTRACT, { 'limit': 1 })
      dataRequests = dataRequests.concat([bcUnvestsPromise, bcVotePromise, bcPreRegistrationPromise, bcUserPromise, bcXPRBalancePromise, bcUnstakingPromise, optionsPromise, bcVestaccountsPromise, bcFreeosBalancePromise, bcAirkeyBalancePromise, bcCurrentExchangeRatePromise, bcSVRVotingPromise])
    }

    var outputValues = await Promise.all(dataRequests) // .then((values) => {
    let [currentIteration, bcStatistics, bcStateRequirements, bcUnvests, bcVote, bcPreRegistration, bcUser, bcXPRBalance, bcUnstaking, liquidOptions, vestedOptions, freeosBalance, bcAirkeyBalance, bcCurrentExchangeRate, bcSVRVoting] = outputValues
    if (!bcAirkeyBalance) bcAirkeyBalance = 0
    if (!liquidOptions) liquidOptions = 0
    if (!vestedOptions) vestedOptions = 0
    if (!freeosBalance) freeosBalance = 0

  

    var unstakingIteration = bcUnstaking && bcUnstaking.iteration ? bcUnstaking.iteration : 0;
    bcUnstaking = !!bcUnstaking;

    var iterations = this.getCurrentAndNextIteration(currentIteration)

    var currentIterationIdx = (iterations != null && iterations.currentIteration ? iterations.currentIteration.iteration_number : -1)

    if (currentIterationIdx === 0 || currentIterationIdx === -1) {
      isFreeosEnabled = false;
    }

    var unvestedAlready = bcUnvests != null && bcUnvests.iteration_number == currentIterationIdx

    var canUnvest = bcStatistics && bcStatistics.unvestpercent > 0 && !unvestedAlready

    var registeredUserCount = bcStatistics && bcStatistics.usercount ? bcStatistics.usercount : 0

    var stakeRequirement = null
    var stakeRequirementKYC = null
    var userHasStaked = false
    var userClaimedAlready = false
    var userEligibleToClaim = false
    var holdingRequirement = (iterations != null && iterations.currentIteration) ? iterations.currentIteration.tokens_required : 9999999
    var userMeetsHoldingRequirement = false
    var userMeetsStakeRequirement = false
    var userStake = 0
    var totalHolding = 0
    var reasonCannotClaim = ''
    var currentIterationObj = iterations && iterations.currentIteration ? iterations.currentIteration : null
    var nextIterationObj = iterations.nextIteration
    var airclaimStatus = null

    if (nextIterationObj && nextIterationObj.startStamp) {
      airclaimStatus = "Pending"
    } else if (currentIterationObj && currentIterationObj.iteration_number === null && nextIterationObj && nextIterationObj.iteration_number === null) {
      airclaimStatus = "Complete"
    } else {
      airclaimStatus = "Running"
    }
    /*bcPreRegistration = {
      "acc": "11wl",
      "name": "AncientThunder",
      "avatar": "",
      "verified": 0,
      "date": 1642278575,
      "verifiedon": 0,
      "verifier": "",
      "raccs": [],
      "aacts": [],
      "ac": [],
      "kyc": [{
          "kyc_provider": "metal.kyc",
          "kyc_level": "trulioo:birthdate,trulioo:address,trulioo:firstname,trulioo:lastname",
          "kyc_date": 1642278852
        }
      ]
    }*/

    var accountType = null;
    if (bcUser) { // Registered
      accountType = bcUser.account_type;
    } else if (bcPreRegistration) {
      accountType = '100'; //account type d
      if(bcPreRegistration.kyc){
        var kyc = bcPreRegistration.kyc;
        for (var i = 0; i < kyc.length+1; ++i) {
          for (const prop in kyc[i]) {
            console.log(prop);
            if (kyc[i][prop].includes('firstname') && kyc[i][prop].includes('lastname')) {
              accountType = '118'; //account type v
              break
            }
          }
        }
      }
    } else {
      accountType = '101' //account type e;
    }
    console.log('accountType', accountType);

    for (var i = bcStateRequirements.length - 1; i >= 0; --i) {
      var stakeReq = bcStateRequirements[i]
      if (registeredUserCount >= stakeReq.threshold) {
        stakeRequirement = stakeReq['requirement_' + String.fromCharCode(accountType)] // ascii to char conversion (will be a 'd', 'e' or 'v')
        stakeRequirementKYC = stakeReq['requirement_v']
        break
      }
    }
    
    if (bcUser) { // Registered


      totalHolding = liquidOptions + vestedOptions + freeosBalance
      userStake = parseFloat(bcUser.stake)
      userHasStaked = bcUser.staked_iteration > 0
      userClaimedAlready = bcUser.last_issuance == currentIterationIdx

      userMeetsHoldingRequirement = bcAirkeyBalance > 0 || totalHolding >= holdingRequirement
      userMeetsStakeRequirement = bcAirkeyBalance > 0 || userHasStaked

      userEligibleToClaim = currentIterationIdx > 0 && userMeetsHoldingRequirement && userMeetsStakeRequirement && !userClaimedAlready


      if (!userEligibleToClaim) {
        if (airclaimStatus === 'Pending') {
          reasonCannotClaim = "<div class='text-h5 text-negative'>Airclaim Not Started</div>"
        } else if (airclaimStatus === 'Complete') {
          reasonCannotClaim = "<div class='text-h5 text-negative'>The Airclaim has ended</div>"
        } else if (!userMeetsHoldingRequirement) {
          reasonCannotClaim = 'Oops! In order to Claim you need a minimum ' + iterations.currentIteration.tokens_required + " " + this.capitalize(process.env.TOKEN_CURRENCY_NAME) + "s in your Wallet. Please <a style='text-decoration:underline' href='/transfer'>transfer</a> an additional " + (iterations.currentIteration.tokens_required - totalHolding) + ' ' + currencyName + ' in order to Claim'
        } else if (userClaimedAlready) {
          reasonCannotClaim = '<div class="text-h5 text-primary">You have already claimed</div>'
        } else if (!userMeetsStakeRequirement) {
          reasonCannotClaim = "<div class='text-h5 text-negative'>You must <a href='/stake' class='text-primary' style='text-decoration:underline'>stake</a> to claim!</div>"
        }
      }
    }


    console.log('bcSVRVoting',bcSVRVoting);
    var userHasVoted = false;
    for (const property in bcSVRVoting) {
      if(property.startsWith("vote") && bcSVRVoting[property] === currentIterationObj.iteration_number){
        userHasVoted = true;
        break;
      }
    }


    console.log('bcVote',bcVote);
    var output = {
      currencyName: currencyName,
      liquidOptions: liquidOptions,
      currentIteration: currentIterationObj,
      nextIteration: nextIterationObj,
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
      airclaimStatus: airclaimStatus,
      priceLabel: priceLabel && priceLabel.value ? priceLabel.value : "",
      stakeRequirement: stakeRequirement,
      stakeRequirementKYC: stakeRequirementKYC,
      userHasStaked: userHasStaked,
      userClaimedAlready: userClaimedAlready,
      userStake: userStake,
      userMeetsStakeRequirement: userMeetsStakeRequirement,
      totalFreeos: totalHolding,
      canClaim: userEligibleToClaim,
      announceObj: announceObj,
      reasonCannotClaim: reasonCannotClaim,
      currentPrice: bcCurrentExchangeRate && bcCurrentExchangeRate.currentprice ? (bcCurrentExchangeRate.currentprice / 1).toFixed(6) : 0,
      targetPrice: bcCurrentExchangeRate && bcCurrentExchangeRate.targetprice ? (bcCurrentExchangeRate.targetprice / 1).toFixed(6) : 0,
      lockFactor: (bcVote && bcVote.paramname && bcVote.paramname === 'lockfactor') ? bcVote.value : 0,
      userHasVoted: userHasVoted
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

  async getUserRecordAsNumber(scopeName, tableName, additionalParams, propertyName) {
    var obj = await this.getUserRecord(scopeName, tableName, additionalParams)
    if (obj && obj[propertyName]) {
      var s = obj[propertyName]
      return parseFloat(s)
    }
    return null
  }



  async getUserRecord(scopeName, tableName, additionalParams) {
    return this.getRecord(scopeName, tableName, this.walletUser.accountName, additionalParams)
  }

  async getRecord(codeName, tableName, scopeName, additionalParams) {
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

  getCurrentAndNextIteration(rows) {
    const currentTimeStamp = Math.floor(Date.parse(new Date().toISOString()) / 1000); // Math.floor((new Date()).getTime() / 1000)
    var nextIteration = {
      startStamp: null,
      iteration_number: null
    }
    var currentIteration = {
      iteration_number: null
    }

    if (rows && rows.length) {

      //check start
      const firstStartTimeStamp = Math.floor(Date.parse(rows[0].start + "Z") / 1000);
      if (currentTimeStamp < firstStartTimeStamp) {
        nextIteration = rows[0]
        nextIteration.startStamp = firstStartTimeStamp;

        return {
          currentIteration,
          nextIteration
        }
      }

      rows.map((row, index) => {
        const startTimeStamp = Math.floor(Date.parse(row.start + "Z") / 1000);
        const endTimeStamp = Math.floor(Date.parse(row.end + "Z") / 1000);

        // console.log('startTimeStamp', startTimeStamp);



        if (currentTimeStamp > startTimeStamp && currentTimeStamp < endTimeStamp) {
          currentIteration = rows[index]
          if (rows.length !== (index + 1)) {
            nextIteration = rows[index + 1]
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
