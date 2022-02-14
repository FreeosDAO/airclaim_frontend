<template>
  <div class="q-pa-md">
    <CompleteDialog ref="complete" />
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">
      <div class="panel-wrap">
        <q-card class="panel q-pa-lg">
          <div class="text-h4 text-center q-ma-lg">Mint Your {{ currencyName }}</div>
          <p
            class="text-center text-subtitle1 q-mb-xs"
          >Mint your {{ tokenCurrencyName }}s into {{ currencyName }}.</p>
          <p
            class="text-center text-negative q-mb-sm"
          >This could be a Taxable event in your jurisdiction</p>
          <p class="q-mb-md text-center" style="line-height:1.4;">
            For more info,
            <router-link to="/info#mint">click here</router-link>
          </p>
          <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
            <p class="q-mb-sm text-subtitle1" style="line-height:1.2;">
              <strong>You currently have</strong>
            </p>
            <h4 class="text-h4 q-ma-xs" style="line-height:1;">{{ liquidOptions }}</h4>
            <p class="q-ma-xs" style="line-height:1;">
              <strong>{{ tokenCurrencyName }}s</strong>
            </p>
          </div>

          <div style="align-items: center;" class="row justify-center q-mb-md q-pb-xs">
            <div class="col-xs-6 col-sm-5">Amount to mint:</div>
            <div class="col-xs-1"></div>
            <div class="col-xs-5 col-sm-6">
              <label
                data-v-052b630f
                for="f_6eee53df-da8d-4f65-9fad-d55fd4c1e7e7"
                class="q-field row no-wrap items-start q-input q-field--outlined q-field--dense q-validation-component"
              >
                <div class="q-field__inner relative-position col self-stretch">
                  <div tabindex="-1" class="q-field__control relative-position row no-wrap">
                    <div
                      class="q-field__control-container col relative-position row no-wrap q-anchor--skip max-btn-holder"
                    >
                      <input
                        v-model="sendAmount"
                        tabindex="0"
                        required="required"
                        id="f_6eee53df-da8d-4f65-9fad-d55fd4c1e7e7"
                        type="number"
                        class="q-field__native q-placeholder"
                      />

                        <q-btn  class="max-btn"
                          size="sm"
                          unelevated
                          no-caps
                          outline
                          color="secondary"
                          v-if="isAuthenticated"
                          @click="sendAmount = liquidOptions"
                        >Max</q-btn>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div style="align-items: center;" class="row justify-center q-mb-md q-pb-none">
            <q-btn
              size="lg"
              unelevated
              no-caps
              outline
              :disable="!sendAmount || sendAmount > liquidOptions"
              color="primary"
              v-if="isAuthenticated"
              @click="submit()"
            >Mint to {{ currencyName }}</q-btn>
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
  data() {
    return {
      sendAmount: null,
      tokenCurrencyName: this.$options.filters.capitalize(process.env.TOKEN_CURRENCY_NAME),
      stakeCurrency: process.env.STAKING_CURRENCY,
      currencyName: process.env.CURRENCY_NAME,
    }
  },
  computed: {
    ...mapGetters('freeos', ['liquidOptions', 'isAuthenticated', 'accountName']),
  },
  methods: {
    ...mapActions('freeos', ['convertOptions']),
    async submit() {
      var result = await this.convertOptions({ owner: this.accountName, quantity: `${parseFloat(this.sendAmount).toFixed(process.env.TOKEN_PRECISION)} ${process.env.TOKEN_CURRENCY_NAME}` })

      if (!(result instanceof Error)) {
        this.$refs.complete.openDialog({
          title: "Woohoo!", subtitle: "You minted", value: this.sendAmount, currency: process.env.CURRENCY_NAME
        });
      }


      console.log('resultR', result)
      this.resetForm()
    },
    resetForm() {
      this.sendAmount = null
    }
  }
}
</script>

<style scoped>
</style>
