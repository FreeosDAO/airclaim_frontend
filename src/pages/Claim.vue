<template>
<div class="text-center relative">

    <q-dialog v-model="registerModalTrigger">
        <q-card style="max-width: 440px;" class="q-pa-lg">
            <q-card-actions class="q-pa-none" align="right">
                <q-icon  class="q-ma-none cursor-pointer" style="font-size:2rem" name="close" v-close-popup />
           </q-card-actions>
            <div class="flex justify-center text-center q-mt-md" style="width: 80px; height: 80px; margin: -25px auto 0;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" class="freeos-logo-icon inline-block fill-current text-primary header-logoicon">
                    <path fill="#00a1ed" d="M41.7 0C18.7 0 0 18.7 0 41.7c0 23 18.7 41.7 41.7 41.7 23 0 41.7-18.7 41.7-41.7C83.4 18.7 64.8 0 41.7 0zM26.9 68.6c-2.7 0-5.3-1-7.3-2.8-13.3-12.2-14.2-32.9-2-46.3C23.8 12.8 32.6 9 41.7 9c1.7 0 3.4.1 5.1.4h.2c-5.6 2.3-9.7 7.5-10.6 13.5-.1.6-.2 1.3-.2 1.9V26c-.1 4.1.1 8.2.6 12.3l-10.6 3.9c-.7.3-1.1 1.1-.8 1.8l.5 1.2c1.4 4 5.8 6 9.8 4.6.4-.2.9-.4 1.3-.6l1-.6.3-.2v.4c.2 3 .1 6-.2 9H38c0 .3 0 .6-.1 1-.1.6-.2 1.2-.4 1.8-1.4 4.8-5.7 8-10.6 8zm14.8 5.9c-1.8 0-3.7-.2-5.5-.5 6-2.5 10.1-8 10.8-14.5.7-5.4.7-10.9-.1-16.3l10.8-6.4c1.2-.7 1.7-2.2 1.2-3.5l-.1-.3c-.5-1.4-2-2.1-3.4-1.6L45.9 35l-.2.1V35c-.4-2.8-.5-5.7-.4-8.5.4-8.3 5.3-11.7 11.3-11.6 2.5.1 4.8.9 6.8 2.4.5.4.9.8 1.4 1.3 12.8 12.6 12.9 33.3.2 46.2-6.2 6.2-14.5 9.7-23.3 9.7z"></path>
                </svg>
            </div>
            <q-card-section class="q-mt-none text-center">
                <div class="text-h4">Register Your Interest</div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
                <p class="text-body1">Before you start, we need to register your
                    interest in the Freeos AirClaim.
                    It’s just a press of a button.</p>

                <p class="text-body2">By connecting you accept Freeos’s <a class="cursor-pointer" style="text-decoration:underline" @click="toggleTerms()">Terms of Service</a></p>
                <div v-show="showTerms" class="" style="width:100%;max-height:120px;overflow-y: auto;" class="text-left">
                    <p class="text-body1"><strong>Freeos Terms of Service</strong></p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                </div>
            </q-card-section>

            <q-card-actions align="center">
                <q-btn unelevated size="lg" class="q-mb-m" outline color="primary" @click="registerUser()">Register</q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>

    <CompleteDialog  ref="complete"  />
    <div class="add-bg">
        <svg v-if="airkeyBalance > 0 && showAirkey" xmlns="http://www.w3.org/2000/svg" style="height:36px;width:36px;" viewBox="0 0 100 100"><path d="M86.776 33.97l-7.106-6.611 4.926-5.294a7.101 7.101 0 001.876-4.6c.043-1.796-.61-3.413-1.84-4.554-2.465-2.288-6.641-1.974-9.12.689L41.613 50.008c-7.916-3.722-17.394-1.937-23.437 4.547-7.612 8.179-7.153 21.027 1.023 28.642 3.784 3.521 8.658 5.436 13.797 5.436a20.11 20.11 0 0014.843-6.457 20.251 20.251 0 002.863-23.705l14.529-15.606 7.104 6.616c.291.271.677.406 1.076.401a1.502 1.502 0 001.045-.478l4.109-4.422a1.501 1.501 0 00-.076-2.119l-7.104-6.615 2.126-2.279 7.102 6.62a1.502 1.502 0 002.12-.075l4.117-4.422c.271-.291.416-.678.401-1.076a1.487 1.487 0 00-.475-1.046zm-5.214 3.4l-7.101-6.619a1.5 1.5 0 00-2.119.074l-4.173 4.474a1.502 1.502 0 00.075 2.121l7.105 6.617-2.066 2.224-7.104-6.615a1.455 1.455 0 00-1.076-.401 1.5 1.5 0 00-1.044.477L47.986 56.985l-.015.01a1.5 1.5 0 00-.42 2.051 17.252 17.252 0 01-1.907 21.085 17.133 17.133 0 01-12.015 5.49c-4.592.152-9.007-1.478-12.385-4.62-6.966-6.487-7.357-17.435-.873-24.402a17.283 17.283 0 0112.651-5.51c2.812 0 5.647.688 8.245 2.106a1.5 1.5 0 002.038-.604l34.4-36.948c1.35-1.448 3.63-1.698 4.884-.535.591.548.903 1.359.882 2.284a4.056 4.056 0 01-1.074 2.628l-5.947 6.392a1.499 1.499 0 00.078 2.12l7.106 6.611-2.072 2.227z"/><path d="M32.999 61.242a6.964 6.964 0 00-4.923 2.135 6.964 6.964 0 00-1.973 4.989c.063 3.826 3.196 6.896 7.009 6.896l.116-.001a6.967 6.967 0 004.923-2.134 6.97 6.97 0 001.972-4.99c-.031-1.872-.789-3.621-2.135-4.923s-3.117-1.962-4.989-1.972zm2.997 9.798a3.985 3.985 0 01-2.816 1.221l-.067.001a4.016 4.016 0 01-4.01-3.944 3.981 3.981 0 011.128-2.854 3.987 3.987 0 012.817-1.221l.067-.001c1.046 0 2.034.399 2.788 1.129a3.979 3.979 0 011.221 2.815 3.98 3.98 0 01-1.128 2.854z"/></svg>

        <div v-if="!isFreeosEnabled">
            <b>Freeos system is not currently operational. Please check back later.</b>
        </div>

            <div class="panel-wrap panel-top-total q-pt-lg" v-if="isFreeosEnabled">
                <div class="row">
                    <div class="col">
                        <p class="text-subtitle1 q-mb-xs" style="line-height:1;"><strong>{{tokenCurrencyName}}</strong></p>
                        <p class="text-bold text-h4" style="line-height:1;letter-spacing:-2px;">{{liquidOptions}}</p>
                    </div>
                    <div class="col" style="max-width:40px;">
                        <router-link class="convert-btn" v-if="liquidOptions > 0" to="/convert">
                            <small>Convert</small>
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                                    <path d="M14,12.6H1.5c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7H14c0.4,0,0.7,0.3,0.7,0.7C14.7,12.3,14.4,12.6,14,12.6z" />
                                    <path d="M10.6,16c-0.2,0-0.3-0.1-0.5-0.2c-0.3-0.3-0.3-0.7,0-0.9l3-3l-3-3c-0.3-0.3-0.3-0.7,0-0.9c0.3-0.3,0.7-0.3,0.9,0l3.5,3.5
                                    c0.3,0.3,0.3,0.7,0,0.9L11,15.9C10.9,16,10.7,16,10.6,16z" />
                                    <path d="M13.2,21.5c-4,0-7.4-2.4-8.9-6.1c-0.1-0.3,0-0.7,0.4-0.8c0.3-0.1,0.7,0,0.8,0.4c1.3,3.2,4.3,5.2,7.7,5.2
                                    c4.5,0,8.3-3.7,8.3-8.3s-3.7-8.3-8.3-8.3c-3.4,0-6.4,2.1-7.7,5.2C5.4,9.2,5,9.4,4.7,9.3C4.3,9.1,4.2,8.8,4.3,8.4
                                    c1.4-3.7,4.9-6.1,8.9-6.1c5.3,0,9.6,4.3,9.6,9.6S18.5,21.5,13.2,21.5z" />
                                </svg>                        
                        </router-link></div>
                    <div class="col">
                        <p class="text-subtitle1 q-mb-xs" style="line-height:1;"><strong>{{currencyName}}</strong></p>
                        <p class="text-bold text-h4" style="line-height:1;letter-spacing:-2px;">{{liquidFreeos}}</p>
                    </div>
                </div>
            </div>

        <div class="add-bg-white" v-if="isFreeosEnabled">
            <div class="flex justify-between add-custome-width">

                <div class="flex column text-left"  style="flex:1">
                    <div class="text-subtitle1">Iteration</div>
                    <div style="background: none; border: none; outline: none;  padding-right: 0; text-align: left;line-height:1;" class="text-subtitle1 text-capitalize">
                            <strong>{{notes}}</strong>
                    </div>
                </div>


                <div class="wrap-avatar" v-bind:class="{'enable-btn': canClaim}">
                    <div class="avatar claim-btn" @click="startClaim()">
                        <q-icon size="md" style="margin-top: -0px; margin-bottom: 2px;" v-bind:class="{'hide': canClaim}">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                        <path fill="#ffffff" d="M501.362,383.95L320.497,51.474c-29.059-48.921-99.896-48.986-128.994,0L10.647,383.95
                      c-29.706,49.989,6.259,113.291,64.482,113.291h361.736C495.039,497.241,531.068,433.99,501.362,383.95z M256,437.241
                      c-16.538,0-30-13.462-30-30c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30C286,423.779,272.538,437.241,256,437.241z
                      M286,317.241c0,16.538-13.462,30-30,30c-16.538,0-30-13.462-30-30v-150c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30
                      V317.241z" />
         
                            </svg>
                        </q-icon>
                        <div class="claim-text">
                        <h4 style="line-height: 1; margin: 0;">CLAIM</h4>
                        <p  style="line-height: 1; margin: 0;"><small style="font-size:90%;">Your Freeos<br/>{{tokenCurrencyName}}s</small></p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" class="claim-btn-logo"><path d="M42.1.4C19.1.4.4 19.1.4 42.1s18.7 41.7 41.7 41.7 41.7-18.7 41.7-41.7S65.2.4 42.1.4zM27.3 69c-2.7 0-5.3-1-7.3-2.8C6.7 54 5.8 33.3 18 19.9c6.2-6.7 15-10.5 24.1-10.5 1.7 0 3.4.1 5.1.4h.2c-5.6 2.3-9.7 7.5-10.6 13.5-.1.6-.2 1.3-.2 1.9v1.2c-.1 4.1.1 8.2.6 12.3l-10.6 3.9c-.7.3-1.1 1.1-.8 1.8l.5 1.2c1.4 4 5.8 6 9.8 4.6.4-.2.9-.4 1.3-.6l1-.6.3-.2v.4c.2 3 .1 6-.2 9h-.1c0 .3 0 .6-.1 1-.1.6-.2 1.2-.4 1.8-1.4 4.8-5.7 8-10.6 8zm14.8 5.9c-1.8 0-3.7-.2-5.5-.5 6-2.5 10.1-8 10.8-14.5.7-5.4.7-10.9-.1-16.3l10.8-6.4c1.2-.7 1.7-2.2 1.2-3.5l-.1-.3c-.5-1.4-2-2.1-3.4-1.6l-9.5 3.6-.2.1v-.1c-.4-2.8-.5-5.7-.4-8.5.4-8.3 5.3-11.7 11.3-11.6 2.5.1 4.8.9 6.8 2.4.5.4.9.8 1.4 1.3 12.8 12.6 12.9 33.3.2 46.2-6.2 6.2-14.5 9.7-23.3 9.7z" fill="#ffffff" /></svg>
                    </div>

                </div>

                <div class="flex column text-right"  style="flex:1">
                    <div class="text-subtitle1">Next Claim</div>
                    <div style="background: none; border: none; outline: none;  padding-right: 0; text-align: right;line-height:1;" class="text-subtitle1">
                            <strong>{{nextClaimDescription}}</strong>
                    </div>
                </div>
            </div>

            <div class="flex justify-center text-center" style="align-items:center;height:80px;margin-top:-4px;">
                <div class="text-h6" style="line-height:1.25" v-if="canClaim">
                    <a class="text-primary" style="cursor:pointer;text-decoration:underline" @click="startClaim()" v-if="canClaim">Claim now</a> to get your weekly {{tokenCurrencyName}}
                </div>
                <div v-if="!canClaim" v-html="reasonCannotClaim">
                </div>
                <div class="flex"><small class="q-mr-auto">For more info on Claiming <router-link to="/info#claiming">click here</router-link></small></div>
            </div>

        </div>
    </div>

    <div v-if="isFreeosEnabled">
        <!-- <balance class="col-xs-12 col-md-5 row text-left" /> -->
        <balance />
    </div>
    <div style="width: 300px; margin: 0 auto;" v-if="false">
        <q-btn class="add-hover q-mt-sm q-mb-md" style="width: 300px; height: 40px; border: 2px solid #00a1ed; border-radius: 8px; color: #00a1ed; width: 100%;">Invite friends and family</q-btn>
    </div>

    <div class="box" v-if="false">
        <div class="flex justify-end q-pr-md q-mt-lg">
            <q-icon class="cursor-pointer text-h5" name="close" />
        </div>
        <div class="flex column justify-center q-mx-auto items-center">
            <div class="q-mt-md" style="width: 50px; height: 50px;">
                <!-- Envelop---Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="80.846" height="51.005" viewBox="0 0 80.846 51.005">
                    <g id="Group_25" data-name="Group 25" transform="translate(-766.538 -268.64)">
                        <path id="Path_34" data-name="Path 34" d="M846.384,319.645H767.538a1,1,0,0,1-1-1v-49a1,1,0,0,1,1-1h78.846a1,1,0,0,1,1,1v49A1,1,0,0,1,846.384,319.645Zm-77.846-2h76.846v-47H768.538Z" fill="#00aced" />
                        <path id="Path_35" data-name="Path 35" d="M806.961,295.143a1,1,0,0,1-.527-.151l-39.424-24.5a1,1,0,0,1,1.056-1.7l38.9,24.173,38.9-24.173a1,1,0,0,1,1.056,1.7l-39.423,24.5A1,1,0,0,1,806.961,295.143Z" fill="#00aced" />
                    </g>
                </svg>
            </div>
            <div class="q-mb-lg q-mt-lg">
                Hi Jerome, we’ve noticed you <br /> haven’t signed up for <br /> notifcations. Signup to <br /> get notified of claims.
            </div>
            <div class="flex justify-between items-basline q-pb-md">
                <div class="add-input flex justify-between" style="width: 200px; margin-right: 20px; height: 35px;">
                    <input placeholder="Email" />
                </div>
                <span class="curve-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="59.438" height="59.439" viewBox="0 0 59.438 59.439">
                        <g id="Group_31" data-name="Group 31" transform="translate(-777.242 -556.374)">
                            <g id="Group_29" data-name="Group 29">
                                <circle id="Ellipse_3" data-name="Ellipse 3" cx="28.719" cy="28.719" r="28.719" transform="translate(778.242 557.374)" fill="#fff" />
                                <path id="Path_39" data-name="Path 39" d="M806.961,615.813a29.719,29.719,0,1,1,29.719-29.72A29.754,29.754,0,0,1,806.961,615.813Zm0-57.439a27.719,27.719,0,1,0,27.719,27.719A27.751,27.751,0,0,0,806.961,558.374Z" fill="#00aced" />
                            </g>
                            <g id="Group_30" data-name="Group 30">
                                <path id="Path_40" data-name="Path 40" d="M789.223,593.7l7.748-7.748h25.194" fill="#fff" />
                                <path id="Path_41" data-name="Path 41" d="M789.223,594.7a1,1,0,0,1-.707-1.707l7.748-7.748a1,1,0,0,1,.707-.293h25.2a1,1,0,0,1,0,2H797.385L789.93,594.4A.993.993,0,0,1,789.223,594.7Z" fill="#00aced" />
                            </g>
                            <path id="Path_42" data-name="Path 42" d="M815.936,595.507a1,1,0,0,1-.707-1.707l7.758-7.758-7.654-7.655a1,1,0,0,1,1.414-1.414l8.361,8.362a1,1,0,0,1,0,1.414l-8.465,8.465A1,1,0,0,1,815.936,595.507Z" fill="#00aced" />
                        </g>
                    </svg>
                </span>
            </div>
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
    FreeosBlockChainState
} from '../services/FreeosBlockChainState'
import Balance from 'components/accountManagement/Balance'
import CompleteDialog from 'src/components/CompleteDialog.vue'

export default {
    name: 'Claim',
    data() {
        return {
            showCompleteDialog: false,
            dialogTitle: "", 
            dialogSubtitle: null, 
            dialogValue: null,
            tokenCurrencyName: process.env.TOKEN_CURRENCY_NAME,
            dialogCurrency: process.env.CURRENCY_NAME + ' ' + process.env.TOKEN_CURRENCY_NAME, 
            stakeCurrency: process.env.STAKING_CURRENCY,
            currencyName: process.env.CURRENCY_NAME,
            registerModalOverride: true,
            showTerms: false, 
            claimWatch: null,
            showAirkey: process.env.SHOW_AIRKEY
        }
    },
    components: {
        Balance,
        CompleteDialog
    },
    computed: {
        ...mapGetters('freeos', ['isRegistered', 'isFreeosEnabled', 'totalFreeos', 'liquidFreeos', 'liquidOptions', 'canClaim', 'reasonCannotClaim', 'currentIteration', 'airkeyBalance']),
        nextClaimDescription: function () {
            var daysToNextClaim = "";
            if(this.currentIteration && this.currentIteration.end){
                const dateEnd =  Math.floor(Date.parse(this.currentIteration.end + "Z") / 1000);
                const currentTimeStamp = Math.floor(Date.parse(new Date().toISOString()) / 1000);
                daysToNextClaim = this.secondsToDhms(dateEnd - currentTimeStamp);
            }
            return daysToNextClaim
        },
        notes: function () {
            return this.currentIteration && this.currentIteration.iteration_number ? ('Week ' + this.currentIteration.iteration_number) : ''
        },
        registerModalTrigger: {
            get () {
                return (this.isRegistered === false && this.registerModalOverride === true)
            },
            async set (value) {
                console.log(value);
                this.registerModalOverride = value;
                if(this.isRegistered === false){
                    console.log("LOGOUT");
                    await this.logout();
                }
            }
        },
    },
    methods: {
        ...mapActions('freeos', ['fetch', 'register', 'claim']),
        ...mapActions('account', ['logout']),
        toggleTerms(){
            this.showTerms = !this.showTerms;
        },
        async registerUser() {
            await this.register()
            //await this.fetch()
        },
        async startClaim() {
            if(this.canClaim){
                const _ = this;
                var result = await _.claim()
                if(!(result instanceof Error)){
                    this.$refs.complete.openDialog({
                            title: "Woohoo", subtitle: "You earned", value: this.currentIteration.claim_amount
                     });
                } 
            }
        },
        secondsToDhms(seconds) {
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);

            var dDisplay = d > 0 ? d + (d == 1 ? "day" : "days") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? "hr" : "hrs") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? "min" : "mins") : "";

            if(dDisplay && hDisplay){
                return dDisplay + ", " + hDisplay
            }else if(hDisplay){
                return hDisplay + ", " + mDisplay
            }else if(dDisplay){
               return dDisplay
            }else{
               return "0hrs, " + mDisplay
            }
        }


    },
    async created () {

    },
    async mounted() {
        document.body.classList.add('claim-page');
        var result = await this.fetch();
        console.log('awaitresult', result);
    },
    destroyed () {
        document.body.classList.remove('claim-page')
    }
}
</script>

<style lang="scss">

$panel-border-radius: 8px;
$panel-width: 360px;

.convert-btn{
    text-decoration: none;
    opacity: .5;
    color:#000;
    line-height:1;
    small{
        margin-bottom:0;
        display: block;
    }
    &:hover{
        opacity:1;
    }
}

.claim-btn{
    .st0{fill:#FFFFFF;}
}
.claim-text{
    color:#fff;
    position: relative;
    display:flex;
    opacity:.7;
    flex-direction: column;
}
.claim-btn-logo{
    position: absolute;
    left:50%;
    top:50%;
    width:110px;
    height:110px;
    opacity: .15;
    transform: translate(-50%,-50%);
}
.add-bg {
    position: relative;
    padding: 10px 0;

    &:after {
        content: "";
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        pointer-events: none;
        background: url('../assets/bluebg.svg') bottom center no-repeat;
        background-size: 4096px;
    }

    .add-blue-bg {
        position: absolute;
        top: -40px;
        left: 0;
        right: 0;
        width: 100%;

    }

    .add-blue-bg-clip {
        position: relative;
        width: 100%;
    }

    .add-blue-bg>svg {
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5000px;
        clip: rect(0px, 5000px, 520px, 0px);

    }

    .add-bg-white {
        position: relative;
        z-index: 2000;
        margin: 20px auto 0;
        max-width: $panel-width;
        width:100%;
        height: 150px;
        background: #fff;
        border-radius: 8px;
        padding: 10px 20px;

        .custome-width {
            flex-direction: row;
        }

        .wrap-avatar {
            position: relative;
            background-color: #cccccc;
             box-shadow:none;
                border: 5px solid #fff;
            margin: -4.5rem -10px 0;
            /* margin-left:  35px; */
            opacity: .9;
            width: 8rem;
            height: 8rem;
            cursor: default;
            /* width: inherit; */
            /* height: inherit; */
            border-radius: 100%;

            .behind-bg {
                position: absolute;
                top: 20px;
                left: 13px;
                bottom: 0;
                right: 0;
                background-image: url("../assets/freeos.svg");
                width: 70px;
                height: 70px;
                z-index: -1;
            }

            &.enable-btn{
                border: 2px solid #fff;
                 box-shadow: 0 0 14px rgba(0,0,0,.3),0 0 5px rgba(0,0,0,.3);
                 transition:all .1s linear;
                 cursor: pointer;
                .claim-text{
                    margin-top:14px;
                    opacity:1;
                }
                .avatar:before {
                    opacity: 1;
                    background-color: var(--q-color-primary);
                }
                &:hover{
                   transform:scale(.95);
                   box-shadow: 0 0 1px rgba(0,0,0,1),0 0 1px rgba(0,0,0,1);
                }
            } 

            .avatar {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                color: #fff;
                position: relative;
                flex-direction: column;
                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background-color: #cccccc;

                    border-radius: 100%;
                }

            }
        }

    }
}

.add-hover:hover {
    color: #fff !important;
    border: none !important;
    background-color: #f7931e;
    transition: .3s all ease-in-out;
}

.wrapper-box {
    position: relative;
    z-index: 1000;
}

.box {
    position: absolute;
    right: 20px;
    top: 60px;
    z-index: 2000;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12);
    width: 300px;
    border-radius: 8px;
}

.add-input {
    border-left: 2px solid #00a1ed;
    border-bottom: 2px solid #00a1ed;
    margin-bottom: 20px;

    input {
        border: none;
        outline: none;
        padding-left: 10px;
        font-size: 13px;
    }
}

.curve-arrow {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;

    img {
        width: 20px;
        height: 20px;
    }
}

// remove the bg on hover
.q-focus-helper {
    display: none;
}

/* remove padding-right */
/* .q-btn__wrapper {
  padding-right: 0;
} */

.q-ripple {
    display: none;
}
</style>
