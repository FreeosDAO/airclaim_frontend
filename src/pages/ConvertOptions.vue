<template>
<div class="q-pa-md">    <CompleteDialog  ref="complete"  />
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">

        <div class="panel-wrap">
            <q-card class="panel  q-pa-lg">

                <div class="text-h4 text-center q-ma-lg">Convert Your Options</div>
                <p class="text-center text-subtitle1 q-mb-xs">Convert your OPTIONS into {{currencyName}}.</p>
               <p class="text-center text-negative q-mb-sm">This could be a Taxable event in your jurisdiction</p>
                 <p class="q-mb-md text-center" style="line-height:1.4;">For more info, <router-link to="/info#convert-options">click here</router-link></p>
                 <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.2;"><strong>You currently have</strong></p>
                    <h4 class="text-h4 q-ma-xs" style="line-height:1;">{{liquidOptions}}</h4>
                    <p class="q-ma-xs" style="line-height:1;"><strong>OPTIONS</strong></p>
                 </div>

                <div style="align-items: center;" class="row justify-center q-mb-md q-pb-xs">
                    <div class="col-xs-6 col-sm-5">
                        Amount to convert:
                    </div>
                    <div class="col-xs-1"></div>
                    <div class="col-xs-5 col-sm-6">
                        <q-input v-model="sendAmount" type="number" outlined dense />
                    </div>
                </div>
                <div style="align-items: center;" class="row justify-center q-mb-md q-pb-none">

                        <q-btn size="lg" unelevated no-caps outline :disable="!sendAmount || sendAmount > liquidOptions" color="primary" v-if="isAuthenticated" @click="submit()">Convert to {{currencyName}}</q-btn>



                </div>

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
import CompleteDialog from 'src/components/CompleteDialog.vue'


export default {
  name: 'ConvertOptions',
    components: {
        CompleteDialog
    },
  data () {
    return {
      sendAmount: null,
      stakeCurrency: process.env.STAKING_CURRENCY,
      currencyName: process.env.CURRENCY_NAME,
    }
  },
  computed: {
    ...mapGetters('freeos', ['liquidOptions', 'isAuthenticated', 'accountName']),
  },
  methods: {
    ...mapActions('freeos', ['convertOptions']),
    async submit () {
      var result = await this.convertOptions({owner: this.accountName, quantity: `${parseFloat(this.sendAmount).toFixed(process.env.TOKEN_PRECISION)} OPTION`})
      
        if(!(result instanceof Error)){
            this.$refs.complete.openDialog({
                    title: "Wahoo!", subtitle: "You converted", value: this.sendAmount, currency: "OPTIONS"
             });
        } 
      
      
      console.log('resultR', result)
      this.resetForm()
    },
    resetForm () {
        this.sendAmount = null
    }
  }
}
</script>

<style scoped>

</style>
