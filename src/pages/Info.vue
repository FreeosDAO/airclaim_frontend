<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 800px">
        <div class="panel-wrap" style="max-width: 800px">
            <q-card class="panel  q-pa-lg">
                <div class="text-h3 text-center q-ma-lg">Info</div>

                        <div id="feedback">
                            <p class="text-h4 q-mt-xl">Feedback</p>
                             <p class="text-subtitle1 q-mt-xs">For feedback and bug reporting on the Freeos AirClaim App please submit details in the following form: <a target="_blank" href="https://forms.clickup.com/f/6k0z3-1577/113THEOTIZG6PK1ZGQ">https://forms.clickup.com/f/6k0z3-1577/113THEOTIZG6PK1ZGQ</a></p>
                        </div>

                        <div id="registering">
                            <p class="text-h4 q-mt-xl">Registering</p>
                            <img class="info-img" src="../assets/info-page/register.jpg" />
                            <p class="text-subtitle1 q-mt-xs">Registering your account in the system is required for the Freeos Economic System to know if your account is verified, or not.  This verification process is done exclusively in the Proton Wallet.</p>
                            <p class="text-subtitle1 q-mt-xs">Re-registering is only needed if the Proton wallet includes additional countries, and users wish to update their verified status in our system and reduce any staking requirements.</p>
                        </div>
                        <div id="transfers">
                            <p class="text-h4 q-mt-xl">Transfers</p>
                            <p class="text-subtitle1 q-mt-xs">For convenience, we have included a transfer section. This can be convenient to send tokens to others immediately in the dApp—however transferring tokens can also be done within the Proton wallet.</p>
                            <img class="info-img" src="../assets/info-page/transfer.png" />
                            <p class="text-subtitle1 q-mt-xs">If you know the account name you wish to transfer to, enter it in the “to account” field.  Choose your token, and enter the amount.</p>           
                            <p class="text-subtitle1 q-mt-xs">If you wish, you can add some text in the memo field—this is optional. Once you’re ready, press the Send button and sign the transaction in your Proton wallet.</p>      
                        </div>
                        <div id="staking">
                            <p class="text-h4 q-mt-xl">Staking</p>

                            <p class="text-subtitle1 q-mt-xs">Staking is required as a type of collateral, for the AirClaim, for two reasons:</p>
                            <ol>
                                <li class="text-subtitle1 q-mt-xs">To allow unverified users access to the AirClaim, while providing a financial disincentive against duplicate accounts that may wish to claim more than their fair share of tokens.  Freeos is intended to be an equitable system, yet we realise that the Proton wallet does not yet have verification for every country. Staking is a compromise solution.</li>
                                <li class="text-subtitle1 q-mt-xs">To put a soft limit on the number of users in the AirClaim.  Staking requirements increase as new people join.  This is intentional.  The AirClaim is an early stage of the Freeos Economic System, and has fewer controls over inflationary forces as the system will have in later stages, as it matures.  To protect the early economy, limits to the numbers of participants will be necessary.  Increasing the Staking Requirements as more people join helps to limit the number of participants expected to enter.</li>
                            </ol>
                            <p class="text-subtitle1 q-mt-xs">XUSDC was chosen, as it does not fluctuate in value compared to other tokens.  This gives confidence to participants that they will receive the same value after the 25 weeks/iterations of the AirClaim once they release their stake.</p>
                            <p class="text-h5 q-mt-lg">Getting enough to Stake</p>
                            <img class="info-img" src="../assets/info-page/need_USDC_stake.png" />
                            <p class="text-h5 q-mt-lg">Staking your XUSDC</p>

                            <p class="text-subtitle1 q-mt-xs">Once you have the required amount of XUSDC, you are able to press the “Stake” button.</p>
                            <img class="info-img" src="../assets/info-page/staked_USDC.png" />
                            <p class="text-subtitle1 q-mt-xs">Sign the transaction in your Proton Wallet and you should get the confirmation and you will see that you are now staked.</p>
                            <img class="info-img" src="../assets/info-page/staked_USDC_2.png" />
                       
                        </div>
                        <div id="unstaking">
                            <p class="text-h4 q-mt-xl">Unstaking</p>
  
                            <p class="text-subtitle1 q-mt-xs">Any tokens staked, can be returned by choosing to unstake.  The unstaked tokens will only be returned in the next iteration.  </p>
                            <p class="text-subtitle1 q-mt-xs">If you decide to unstake, before the AirClaim completes, you will be unable to claim—unless you decide to stake again.  Remember that the staking requirements increase as new users enter the system, so if you decide to unstake expect that there is a good chance that returning later will require a greater staking amount.</p>
                            <p class="text-subtitle1 q-mt-xs">If you decide to unstake, and then change your mind before the next iteration releases your stake, you may cancel.  This has no penalty, and any future staking increase does not affect the cancellation.  You will be staked at your previous amount, regardless of any increase in the staking requirement that may have occurred.</p>
                        </div>
                        <div id="claiming">
                            <p class="text-h4 q-mt-xl">Claiming</p>

                            <p class="text-subtitle1 q-mt-xs">Claiming can be done once per iteration only if the user has passed any staking requirements and only if the user has passed any holding requirements.</p>
                            <p class="text-subtitle1 q-mt-xs">Messages, underneath the claim button, will tell you what your status is, and what you need to do.</p>
                            <p class="text-subtitle1 q-mt-xs">If the requirements have been met, you will be able to press the Claim button and receive your {{tokenCurrencyName}}s—and Locked {{tokenCurrencyName}}s.</p>
                            <p class="text-h5 q-mt-lg">Stake to Claim</p>
        <img src="../assets/info-page/stake_to_claim.png"  class="info-img" />

                            <p class="text-h5 q-mt-lg">Holding Requirements</p>
        <img src="../assets/info-page/holding_reqs.png"  class="info-img" />

                            <p class="text-subtitle1 q-mt-xs">In the later iterations, there is a requirement to hold a certain amount of FREEOS + {{tokenCurrencyName}}s, in total, in your account—this includes Locked {{tokenCurrencyName}}s as well.</p>
                            <p class="text-subtitle1 q-mt-xs">For those participants who start from the beginning and do not miss any iterations, this will never be a problem.</p>
                            <p class="text-subtitle1 q-mt-xs">The intention for this feature is to help ensure that the AirClaim delivers the 5000 FREEOS + {{tokenCurrencyName}}s required to enter the next phase of the project—the Governance Phase—where voting over economic parameters begins.</p>
                            <p class="text-subtitle1 q-mt-xs">
Additionally, participants that come in late and are keen to participate, will need to obtain some of the FREEOS tokens from the open market.  The demand for these FREEOS tokens can kickstart the economy and help ensure that FREEOS tokens are hitting the price floor.</p>
                            <p class="text-subtitle1 q-mt-xs">The chart below shows the number of {{tokenCurrencyName}}s + FREEOS required for the holding requirements each iteration.</p>
                           
                           
         <img src="../assets/info-page/holding_reqs_chart.png" class="info-img" />
                        </div>

                        <div id="convert">
                            <p class="text-h4 q-mt-xl">Converting {{tokenCurrencyName}}</p>
                
                            <p class="text-subtitle1 q-mt-xs">Any unlocked {{tokenCurrencyName}}s can be converted for FREEOS at any time.  This requires an action to be signed by the participant in the Proton Wallet.</p>
                                    <img src="../assets/info-page/convert.png"  class="info-img" />
                           
                           
                            <p class="text-subtitle1 q-mt-xs">{{tokenCurrencyName}}s are not a transferable, exchangeable token.  They are simply a way to track successful participation in the Freeos Economic System.</p>
                            <p class="text-subtitle1 q-mt-xs">Participants can convert these {{tokenCurrencyName}}s for FREEOS tokens—which may have a monetary value as decided by the open market.  Or the participants may choose not to convert for various reasons. Perhaps they wish to volunteer their time to a project they believe in, without any expectation of compensation.  Perhaps they wish to simply study the system.</p>
                            <p class="text-subtitle1 q-mt-xs">Others may be expecting to be rewarded for their participation, and can decide to convert {{tokenCurrencyName}}s into FREEOS tokens that represent their efforts and tracked data that is used to improve the system.</p>
                            <p class="text-subtitle1 q-mt-xs">As some countries/jurisdictions around the world expect taxes to be paid when value is transferred, this event may be considered a taxable event in your country/jurisdiction.  Check with your local tax authorities to determine whether converting is considered a taxable event.</p>
                            <p class="text-h5 q-mt-lg">Locked {{tokenCurrencyName}}s</p>
                            <p class="text-subtitle1 q-mt-xs">When the price of FREEOS is below the price floor of $0.0167 XUSDC, a portion of the awarded {{tokenCurrencyName}}s are temporarily locked.</p>
                            <p class="text-subtitle1 q-mt-xs">These locked {{tokenCurrencyName}}s can be unlocked when the price is equal, or above, the price floor.  </p>
                            <p class="text-subtitle1 q-mt-xs">Alternatively, every 8 iterations that are consecutively below the price floor, 15% will be available to be unlocked. This is called the Failsafe unlocking condition.</p>
                                            <img src="../assets/info-page/locked_points.png" class="info-img"/>   
                            <p class="text-subtitle1 q-mt-xs">When unlocking is available, simply press the “unlock” button and a portion of your points will be free to be converted.</p>
                        </div>

                        <div id="vested-options">
                            <p class="text-h4 q-mt-xl">Locked {{tokenCurrencyName}}s</p>
                            <p class="text-subtitle1 q-mt-xs">Info Coming Soon</p>
                        </div>

                        <div id="unvesting">
                            <p class="text-h4 q-mt-xl">Unlocking {{tokenCurrencyName}}s</p>
                      <img src="../assets/info-page/unlock.png"  class="info-img" />   
                            <p class="text-subtitle1 q-mt-xs">Info Coming Soon</p>
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

export default {
    name: 'Info',
    data() {
        return {
            stakeCurrency: process.env.STAKING_CURRENCY,
            currencyName: process.env.CURRENCY_NAME,
            tokenCurrencyName: process.env.TOKEN_CURRENCY_NAME,
        }
    },
    computed: {
   
    },
    mounted: function()
    {
        // From testing, without a brief timeout, it won't work.
        setTimeout(() => this.scrollFix(this.$route.hash), 1);
    },
    methods: {
        scrollFix: function(hashbang)
        {
        location.hash = hashbang;
        }
    }
}
</script>

<style scoped>
    .info-img{
       max-width:75%;margin:10px auto;display: block;
    }
</style>
