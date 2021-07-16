<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">
        <div class="panel-wrap">
            <q-card class="panel  q-pa-lg">
                <div class="text-h4 text-center q-ma-lg">Registration</div>
                 <p class="q-mb-md text-center" style="line-height:1.4;">For more info, <router-link to="/info#registration">click here</router-link></p>
                <q-btn class="q-mt-md" size="lg" unelevated no-caps outline color="primary" @click="submit()">Re-Register</q-btn>

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
