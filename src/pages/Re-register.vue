<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">
        <div class="panel-wrap">
            <q-card class="panel  q-pa-lg">
                <div class="text-h4 text-center q-ma-lg">Registration</div>
                 <p class="q-mb-md text-center" style="line-height:1.4;">For more info, <router-link to="/info#registration">click here</router-link></p>

             <q-checkbox id="termsCheckbox" v-model="termsCheckbox" /><label  for="termsCheckbox">I accept Freeos's <a class="cursor-pointer" style="text-decoration:underline" target="_blank" href="https://www.freedao.io/t-cs">Terms of Service</a></label>


                <div v-show="showTerms" class="" style="width:100%;max-height:120px;overflow-y: auto;" class="text-left">
                    <p class="text-body1"><strong>Freeos Terms of Service</strong></p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                    <p class="text-body2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
                </div>


            <q-card-actions align="center">
                <q-btn :disabled="!termsCheckbox" unelevated size="lg" class="q-mb-m" outline color="primary" @click="submit()">Register</q-btn>
            </q-card-actions>
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
    name: 'Re-register',
    data() {
        return {
            termsCheckbox:false,
            showTerms: false, 
        }
    },
    computed: {
        ...mapGetters('freeos', ['accountName', 'XPRBalance', 'liquidFreeos', 'isAuthenticated']),
    },
    methods: {
        ...mapActions('freeos', ['reregister']),
        async submit() {
            var result = await this.reregister();
            console.log('registerResult', result)
            if(result){

            }
        },
    }
}
</script>

<style scoped>

</style>
