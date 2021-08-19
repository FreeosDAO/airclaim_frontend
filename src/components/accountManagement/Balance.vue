<template>
<div>
    <div class="balance q-pt-lg q-pl-md q-pr-md q-pb-xs">
        <div class="flex justify-between q-mb-md" style="width: 100%">
            <div class="flex items-center text-h6">
                Liquid {{stakeCurrency}}:
                <q-btn class="small-icon q-mt-sm q-ml-sm">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                        This is your freely transferable {{stakeCurrency}}
                    </q-tooltip>
                </q-btn>

            </div>
            <div class=" text-h6">{{XPRBalance || '0'}}</div>
        </div>

        <div v-if="(!this.userHasStaked && !this.airkeyBalance) || this.userStake > 0" class="flex justify-between q-mb-md">
            <div class="flex items-center text-h6">
                Staked {{stakeCurrency}}:                 
                <q-btn class="small-icon q-mt-sm q-ml-sm">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                         This {{stakeCurrency}} is held for collateral to allow for claiming
                    </q-tooltip>
                </q-btn>
            </div>
            <div class="text-h6">{{userStake || '0'}}</div>
        </div>


        <div class="flex justify-between q-mb-md">
            <div class="flex items-center  text-h6">
               Locked {{tokenCurrencyName}}:
            </div>
            <div class="col-5 text-h6">{{vestedOptions || '0'}}</div>
            <div class="flex"><small class="q-mr-auto">For more info on Locked {{tokenCurrencyName}} <router-link to="/info#vested-options">click here</router-link></small></div>
            <q-btn :disable="!canUnvest || !vestedOptions" class="q-mt-lg" unelevated no-caps size="lg" outline @click="submit()" color="primary"><span>Unlock<span v-if="unvestPercentage && canUnvest && vestedOptions"> {{unvestPercentage}}%</span></span></q-btn>
        </div>

    </div>
        <CompleteDialog  ref="complete"  />
    <!-- <balance-vest /> -->
</div>
</template>

<script>
import {
    mapGetters,
    mapState,
    mapActions
} from 'vuex'
import BalanceVest from './BalanceVest'
import CompleteDialog from 'src/components/CompleteDialog.vue'
export default {
    data() {
        return {
            stakeCurrency: process.env.STAKING_CURRENCY,
            currencyName: process.env.CURRENCY_NAME,
            tokenCurrencyName: process.env.TOKEN_CURRENCY_NAME,
        }
    },
    computed: {
        ...mapGetters('freeos', ['XPRBalance', 'liquidOptions', 'userStake', 'liquidFreeos', 'totalFreeos', 'canUnvest', 'vestedOptions', 'stakeRequirement', 'unvestPercentage', 'userHasStaked', 'userStake', 'airkeyBalance']),
        unvestedAmount:function(){
            var unvestAmount = this.vestedOptions && this.unvestPercentage ? Math.ceil((this.unvestPercentage / 100) * this.vestedOptions) : 0;
            return unvestAmount;
        }
    },
    methods: {
        ...mapActions('freeos', ['unvest']),
        async submit() {
            var result = await this.unvest();
              if(!(result instanceof Error)){
                this.$refs.complete.openDialog({
                  title: "Unlocked", subtitle: "You Unlocked", value: this.unvestedAmount, currency: process.env.TOKEN_CURRENCY_NAME
                });
              }
        },
    },
    components: {
        BalanceVest,
        CompleteDialog
    }

}
</script>

<style lang="scss" scoped>
$panel-border-radius: 8px;
$panel-width: 360px;
.balance {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 15px auto;
    background-color: white;
    border-radius: $panel-border-radius;
    max-width: $panel-width;
    border: 2px solid #e5e5e5;

    .small-icon {
        display: block;
        width: 18px;
        height: 18px;
        background-image: url(../../assets/exclamation-small-icon.svg);
        background-repeat: no-repeat;
        margin-right: 5px;
    }

    .add-hover:hover {
        color: #fff !important;
        border: none !important;
        background-color: #f7931e;
        transition: .3s all ease-in-out;
    }
}
</style>
