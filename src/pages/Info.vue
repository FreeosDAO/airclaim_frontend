<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 800px">
        <div class="panel-wrap" style="max-width: 800px">
            <q-card class="panel  q-pa-lg">
                <div class="text-h3 text-center q-ma-lg">Info</div>
                        <div id="registering">
                            <p class="text-h4 q-mt-xl">Registering</p>
                            <img src="../assets/freeostry.png" />
                            <p class="text-subtitle1 q-mt-xs">Some info</p>
                        </div>
                        <div id="transfers">
                            <p class="text-h4 q-mt-xl">Transfers</p>
                            <img src="../assets/freeostry.png" />
                            <p class="text-subtitle1 q-mt-xs">Some info</p>
                        </div>
                        <div id="staking">
                            <p class="text-h4 q-mt-xl">Staking</p>
                            <img src="../assets/freeostry.png" />
                            <p class="text-subtitle1 q-mt-xs">Some info</p>
                        </div>
                        <div id="unstaking">
                            <p class="text-h4 q-mt-xl">Unstaking</p>
                            <img src="../assets/freeostry.png" />
                            <p class="text-subtitle1 q-mt-xs">Some info</p>
                        </div>
                        <div id="claiming">
                            <p class="text-h4 q-mt-xl">Claiming</p>
                            <img src="../assets/freeostry.png" />
                            <p class="text-subtitle1 q-mt-xs">Some info</p>
                        </div>

                        <div id="convert-options">
                            <p class="text-h4 q-mt-xl">Converting Options</p>
                            <img src="../assets/freeostry.png" />
                            <p class="text-subtitle1 q-mt-xs">Some info</p>
                        </div>

                        <div id="vested-options">
                            <p class="text-h4 q-mt-xl">Vested Options</p>
                            <img src="../assets/freeostry.png" />
                            <p class="text-subtitle1 q-mt-xs">Some info</p>
                        </div>

                        <div id="unvesting">
                            <p class="text-h4 q-mt-xl">Unlocking Options</p>
                            <img src="../assets/freeostry.png" />
                            <p class="text-subtitle1 q-mt-xs">Some info</p>
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

</style>
