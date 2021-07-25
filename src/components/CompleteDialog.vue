<template>
<q-dialog v-model="isOpen">
    <q-card style="max-width: 450px;width:100%;" class="q-pa-md">
        <q-card-actions class="q-pa-none" align="right">
            <q-icon class="q-ma-none cursor-pointer" style="font-size:2rem" name="close" v-close-popup />
        </q-card-actions>
        <q-card-section class="flex justify-center column items-center">
            <div class="text-h2 text-center">{{dialogObj.title}}</div>
            <div class="col-6">
                <span class="text-h6 q-mt-sm">{{dialogObj.subtitle}}</span>
            </div>
            <div class="q-full w-full" style="width:100%;">                
              <q-img src="../assets/fireworks.svg" />
            </div>
            <div class="text-center q-pb-lg" style="margin-top:-3rem">
                <span class="text-h1">{{dialogObj.value}}</span>
                <br />
                <span class="text-h4">{{dialogObj.currency}}</span>
            </div>
        </q-card-section>

    </q-card>
</q-dialog>
</template>

<script>
export default {
    props: {

    },
    computed: {

    },
    data() {
        return {
            isOpen: null,
            dialogObj:{
                title: "Woohoo", 
                subtitle: null,
                value: 0, 
                currency: process.env.TOKEN_CURRENCY_NAME
            }
        }
    },
    methods:{
        openDialog(dialogObj){
            this.dialogObj = Object.assign(this.dialogObj, dialogObj);
                setTimeout(() => {
                      this.isOpen = true;
                      setTimeout(() => {
                            this.isOpen = false;
                      }, 5000);
                }, 1500);
        }
    }
}
</script>
