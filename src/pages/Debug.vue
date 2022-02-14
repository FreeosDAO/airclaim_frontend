<template>
  <div class="text-center">
    <div>
      <b>Debug</b>
      <div>Balance: {{balance}}</div>
      <div>Is Registered: {{isRegistered}}</div>
      <div>currentIteration: {{currentIteration ? currentIteration.iteration_number : "N/A"}}</div>
      <div>nextIteration: {{nextIteration ? nextIteration.iteration_number : "N/A"}}</div>

      <div v-if="user">
          <h2>Registered User</h2>
          <div>Stake {{user.stake}}</div>
          <div>account_type {{user.account_type}}</div>
          <div>registered_iteration {{user.registered_iteration}}</div>
          <div>staked_iteration {{user.staked_iteration}}</div>
          <div>votes {{user.votes}}</div>
      </div>

      <div v-if="statistics">
          <h2>Statistics</h2>
          <div>claimevents {{statistics.claimevents}}</div>
          <div>failsafecounter {{statistics.failsafecounter}}</div>
          <div>iteration {{statistics.iteration}}</div>
          <div>unvestpercent {{statistics.unvestpercent}}</div>
          <div>unvestpercentiteration {{statistics.unvestpercentiteration}}</div>
          <div>usercount {{statistics.usercount}}</div>
      </div>

      <div v-if="unvests">
          <h2>unvests</h2>
          <div>unvests {{unvests.claimevents}}</div>
      </div>
      <div v-if="!unvests">
          <div>USER HAS NEVER UNVESTED</div>
      </div>

      <div>
          stakeRequirement: {{stakeRequirement}}
      </div><div>
          userHasStaked: {{userHasStaked}}
          userClaimedAlready: {{userClaimedAlready}}
      </div>
      <div v-if="!canUnvest">
      </div>

      <div>
          <button @click="register()">Register</button>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FreeosBlockChainState } from '../services/FreeosBlockChainState'
import ProtonSDK from '../utils/proton'

export default {
  name: 'Debug',
  data () {
    return {
      currentIteration: null,
      nextIteration: null,
      isNotification: true,
      balance: 12,
      freeosState: null,
      isRegistered: false,
      user: null,
      unvests: null,
      statistics: null,
      stakeRequirement: null,
      userHasStaked: null,
      canUnvest: false,
      userClaimedAlready: false
    }
  },
  computed: {
    ...mapGetters('account', ['claimInfo'])
  },
  methods: {
    async register () {
      alert(this.freeosState)

      if (this.freeosState) {
        var output = await this.freeosState.register()
        alert(JSON.stringify(output))
      }
    }
  },
  async created () {
    const { auth } = await ProtonSDK.restoreSession()
    // if (auth && auth.actor && auth.permission) {

    freeosState.on('change', (data) => {
      console.log('data is now', data)
      if (data) {
        this.balance = data.XPRBalance
        this.currentIteration = data.currentIteration
        this.nextIteration = data.nextIteration
        this.isRegistered = data.isRegistered
        this.user = data.user
        this.statistics = data.statistics
        this.unvests = data.unvests

        this.stakeRequirement = data.stakeRequirement
        this.userHasStaked = data.userHasStaked
        this.canUnvest = data.canUnvest

        this.userClaimedAlready = data.userClaimedAlready
      }
    })
  }
}
</script>
