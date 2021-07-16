<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">

        <div class="panel-wrap">
            <q-card class="panel">

                <div class="text-h4 text-center q-mt-lg q-mb-sm">Send Tokens</div>

                <div class="text-center q-pb-lg">
                    For more info <router-link to="/info#transfer">click here</router-link>.
                </div>  
                <div v-if="!liquidFreeos && !XPRBalance" class="q-pa-lg text-center">
                    You have nothing in your account to transfer currently
                </div>  

                <div v-if="liquidFreeos || XPRBalance">
                  <div class="flex justify-between q-mb-xs q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                      <div class="flex items-center text-h6 text-weight-bold">
                          Liquid {{stakeCurrency}}:
                      </div>
                      <div class=" text-h6">{{XPRBalance || '0'}}</div>
                  </div>
                  <div class="flex justify-between q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                      <div class="flex items-center text-h6 text-weight-bold">
                          {{currencyName}}:
                      </div>
                      <div class=" text-h6">{{liquidFreeos || '0'}}</div>
                  </div>


                  <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                      <div class="col-xs-5 col-sm-4">
                          <p class="q-mt-sm q-mb-none">To account:</p>
                      </div>
                      <div class="col-xs-6 col-sm-8">
                          <q-input maxlength="12" required v-model="submitData.to" type="text" outlined dense />
                      </div>
                  </div>
                  <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                      <div class="col-xs-5 col-sm-4">
                          <p class="q-mt-sm q-mb-none">Token:</p>
                      </div>
                      <div class="col-xs-6 col-sm-8">
                          <q-select required dense outlined v-model="submitData.token" :options="tokensSelectOptions" />
                      </div>
                  </div>
                  <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                      <div class="col-xs-5 col-sm-4">
                          <p class="q-mt-sm q-mb-none">Amount:</p>
                      </div>
                      <div class="col-xs-6 col-sm-8">
                          <q-input required v-model="submitData.quantity" type="number" outlined dense />
                          <p class="q-mb-none text-grey" v-if="submitData.token === stakeCurrency"><small>{{XPRBalance}} {{stakeCurrency}} available to transfer</small></p>
                          <p class="q-mb-none text-grey" v-if="submitData.token === currencyName"><small>{{liquidFreeos}} {{currencyName}} available to transfer</small></p>
                      </div>
                  </div>
                  <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                      <div class="col-xs-5 col-sm-4">
                          <p class="q-mt-sm q-mb-none">Memo:</p>
                      </div>
                      <div class="col-xs-6 col-sm-8">
                          <q-input maxlength="256" v-model="submitData.memo" type="text" outlined dense />
                      </div>
                  </div>
                  <div style="align-items: center;" class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                      <q-btn size="lg" unelevated no-caps outline color="primary" :disable="!submitData.quantity || !submitData.to  || !submitData.token" @click="submit()">Send</q-btn>
                  </div>
                </div>
            </q-card>

            <q-card class="panel q-mt-lg q-pa-lg">

                <div class="text-h4 text-center  q-mt-lg q-mb-sm">Receive Tokens</div>

                <div class="text-center q-pb-xs">
                    For more info <router-link to="/info#transfer">click here</router-link>.
                </div>  

                <div class="q-mt-md text-center text-h5">@{{accountName}}</div>

                <q-btn size="lg" @click="protonSwap()" href="https://www.protonswap.com/swap" class="q-mt-lg" unelevated no-caps outline color="primary" v-if="isAuthenticated">Need Tokens?<br />try Proton Swap</q-btn>

            </q-card>

        </div>
     
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from 'vuex'
import {
    getAbsoluteAmount
} from '@/utils/currency'

export default {
    name: 'Transfer',
    data() {
        return {
            stakeCurrency: process.env.STAKING_CURRENCY,
            currencyName: process.env.CURRENCY_NAME,
            submitData: {
                to: null,
                token: null,
                quantity: null,
                memo: '',
                from: null
            },
            isShowApprovedDialog: false,
            isShowFailedDialog: false
        }
    },
    computed: {
        ...mapGetters('freeos', ['accountName', 'XPRBalance', 'liquidFreeos', 'isAuthenticated']),
        tokensSelectOptions() {
            const types = []
            if (this.XPRBalance > 0) {
                types.push(this.stakeCurrency)
            }
            if (this.liquidFreeos > 0) {
                types.push(this.currencyName)
                this.submitData.token = this.currencyName
            }
            return types
        },
        isFormFilled() {
            return !Object.values(this.submitData).some(x => (x === null || x === ''))
        }
    },
    methods: {
        ...mapActions('freeos', ['fetch', 'transfer']),
        async submit() {
            this.submitData.from = this.accountName
            var result = await this.transfer(this.submitData)
            console.log('resultR', result)
            this.resetForm()
        },
        protonSwap() {
            window.open("https://www.protonswap.com/swap", '_blank');
        },
        resetForm() {
            this.submitData = {
                to: null,
                token: null,
                quantity: null,
                memo: '',
                from: null
            }
        }
    }
}
</script>

<style scoped>

</style>
