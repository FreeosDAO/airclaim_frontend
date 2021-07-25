<template>
<div class="q-pa-md">

  <CompleteDialog  ref="complete"  />

    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">

        <div class="panel-wrap">
            <q-card class="panel  q-pa-lg">

                <div class="text-h4 text-center q-ma-lg">Staking Requirement</div>

                <div v-if="!bcUnstaking && !userHasStaked">
                    <p class="text-center q-mb-xs">With Freeos unverified users will need a minimum amount in their account to Claim. For more info, <router-link to="/info#staking">click here</router-link>.</p>
                    <p class="text-center q-mb-xs">In order to Claim your weekly {{tokenCurrencyName}}s, you need to stake </p>
                    <h4 class="text-center text-h4 q-ma-none q-mb-lg" style="line-height:1;">{{stakeRequirement}} {{stakeCurrency}}</h4>
                </div>

                <div class="panel panel-warning q-pa-lg text-center q-mb-lg q-pa-lg" v-if="bcUnstaking">
                    <p class="q-mb-md text-h4 text-warning" style="line-height:1.2;">Warning</p>
                    <p class="q-mb-xs text-subtitle1" style="line-height:1.2;"><strong>You have unstaked</strong></p>
                    <h4 class="text-h4 q-mt-none q-mb-sm" style="line-height:1;">{{userStake}} {{stakeCurrency}}</h4>
                    <p class="q-mb-md text-subtitle1" style="line-height:1.4;">Your will NOT be eligible to Claim your weekly {{tokenCurrencyName}} in the next iteration. You need a minimum {{stakeRequirement}} {{stakeCurrency}} to Claim. This can be rectified by cancelling the process if you wish</p>
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.4;">You are currently unstaking {{userStake}} {{stakeCurrency}}. The unstaking will complete in <strong class="text-primary">{{stakeIterationMsg}}</strong></p>
                 <p class="q-mb-md" style="line-height:1.4;">For more info, <router-link to="/info#unstaking">click here</router-link></p>
                    <q-btn unelevated outline color="primary" v-if="isAuthenticated" @click="cancelSubmit()">Cancel Unstaking</q-btn>

                </div>

                <div class="panel panel-warning q-pa-lg text-center q-mb-lg q-pa-lg" v-if="XPRBalance < stakeRequirement && !userHasStaked">
                    <p class="q-mb-md text-h4 text-warning" style="line-height:1.2;">Warning</p>
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.4;"><strong>We see your balance is short on {{stakeCurrency}} You need to transfer the following to</strong></p>
                    <h4 class="text-h5 q-ma-xs" style="line-height:1;">{{stakeRequirement - XPRBalance}} {{stakeCurrency}}</h4>
                    <q-btn @click="protonSwap()" class="q-mt-md" unelevated no-caps outline color="primary">Get {{stakeCurrency}} via ProtonSwap</q-btn>
                </div>

                <div class="panel panel-info q-pa-lg text-center q-mb-lg q-pa-lg" v-if="userHasStaked && !bcUnstaking">
                    <p class="q-mb-md text-h4" style="line-height:1.2;">You're Staked!</p>
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.4;">You've Staked so you can Claim, you've currently staked:</p>
                    <h4 class="text-h4 q-ma-xs" style="line-height:1;">{{userStake}} {{stakeCurrency}}</h4>
                    <p class="q-mt-md q-mb-sm" style="line-height:1.4;">For more info, <router-link to="/info#staking">click here</router-link></p>
                </div>

                <div class="panel panel-info q-pa-lg text-center q-mb-lg q-pa-lg" v-if="XPRBalance >= stakeRequirement && !userHasStaked">
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.4;">You currently have more than enough staked in your account to Claim your weekly {{tokenCurrencyName}}.</p><p class="q-mb-xs"><strong>Current balance:</strong></p>
                    <h4 class="text-h4 q-ma-xs" style="line-height:1;">{{XPRBalance}} {{stakeCurrency}}</h4>
                </div>


                <div class="panel panel-warning q-pa-lg text-center q-mb-lg q-pa-lg" v-if="userHasStaked && !bcUnstaking && stakeRequirement > 0">
                    <p class="q-mb-md text-h4" style="line-height:1.2;">Unstake</p>
                    <p class="text-subtitle1 q-mb-xs" style="line-height:1.4;"><strong>This process will complete at the start of the next Claim</strong> also if you unstake you will NOT be eligible to Claim your weekly {{tokenCurrencyName}}. </p>
                     <p class="q-mb-md" style="line-height:1.4;">For more info, <router-link to="/info#unstaking">click here</router-link></p>
                    
                    <div style="align-items: center;" class="row justify-center q-mb-xs q-pb-xs" v-if="userHasStaked">
                        <q-btn unelevated outline color="primary" v-if="isAuthenticated" @click="unstakeSubmit()">Unstake</q-btn>
                    </div>

                </div>


                <div style="align-items: center;" class="row justify-center q-mb-md q-pb-xs" v-if="!userHasStaked">
                    <q-btn unelevated outline size="lg" :disable="XPRBalance < stakeRequirement" color="primary" v-if="isAuthenticated" @click="stakeSubmit()">Stake</q-btn>
                </div>

            </q-card>



        </div>

    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import CompleteDialog from 'src/components/CompleteDialog.vue'
import { Notify } from 'quasar'


export default {
    name: 'Stake',
    data() {
        return {
            countdown: 1,
            stakeCurrency: process.env.STAKING_CURRENCY,
            currencyName: process.env.CURRENCY_NAME,
            tokenCurrencyName: process.env.TOKEN_CURRENCY_NAME,
        }
    },
    components: {
        CompleteDialog
    },
    computed: {
        ...mapGetters('freeos', ['accountName', 'bcUnstaking', 'XPRBalance', 'liquidFreeos', 'isAuthenticated', 'stakeRequirement', 'userHasStaked', 'userStake', 'userMeetsStakeRequirement', 'currentIteration','unstakingIteration']),
      stakeIterationMsg () {

        //Handle
        if(this.unstakingIteration && this.currentIteration && this.unstakingIteration === this.currentIteration.iteration_number){
              const dateEnd =  Math.floor(Date.parse(this.currentIteration.end + "Z") / 1000);
              const currentTimeStamp = Math.floor(Date.parse(new Date().toISOString()) / 1000);
              var daysToNextClaim = this.secondsToDhms(dateEnd - currentTimeStamp);
              return daysToNextClaim;
        }else{
            return "a minute"
        }

      }
   },
    created(){
      //this.setCountdown();
    },
    methods: {
        ...mapActions('freeos', ['fetch', 'stake', 'unstake', 'cancelUnstake']),
        protonSwap() {
            window.open("https://www.protonswap.com/swap", '_blank');
        },
        async stakeSubmit() {
            const _ = this;
              var result = await _.stake(_.stakeRequirement)
                if(!(result instanceof Error)){
                this.$refs.complete.openDialog({
                  title: "Great Stake", subtitle: "You staked", value: this.stakeRequirement, currency: process.env.STAKING_CURRENCY
                });
              }
        },
        async unstakeSubmit() {
              var result = await this.unstake()
              if(!(result instanceof Error)){
                this.$refs.complete.openDialog({
                  title: "Unstaked", subtitle: "You've unstaked", value: this.userStake, currency: process.env.STAKING_CURRENCY
                });
              }
        },
        async cancelSubmit() {
                var result = await this.cancelUnstake()
                if(!(result instanceof Error)){
                  this.$refs.complete.openDialog({
                    title: "Cancel Unstaking", 
                    subtitle: "You've cancelled Unstaking", 
                    value: this.userStake,
                    currency: process.env.STAKING_CURRENCY
                  });
                }
        },
        setCountdown(){
            const t = this;
            const dateEnd =  Math.floor(Date.parse(this.currentIteration.end + "Z") / 1000);

            setInterval(function(){
               const currentTimeStamp = Math.floor(Date.parse(new Date().toISOString()) / 1000);
               t.countdown = t.secondsToDhms(dateEnd - currentTimeStamp);
            }, 1000);

        },
        secondsToDhms(seconds) {
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);

            var dDisplay = d > 0 ? d + (d == 1 ? " day" : " days") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " hour" : " hours") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " min" : " mins") : "";

            if(dDisplay && hDisplay){
                return dDisplay + ", " + hDisplay
            }else if(hDisplay){
                return hDisplay + ", " + mDisplay
            }else if(dDisplay){
               return dDisplay
            }else{
               return "0 hours " + mDisplay
            }
        }

    }
}
</script>

<style scoped>

</style>