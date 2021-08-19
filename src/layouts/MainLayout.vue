<template>
  <q-layout view="hHh Lpr fFf">
    <q-header reveal elevated  height-hint="98" style="background-color: #00a1ed">
      <q-toolbar style="justify-content: space-between;">
        <q-btn class="burger-menu" :style="'visibility: ' + (isAuthenticated ? 'visible' : 'hidden')" @click="drawer = !drawer">
          <div></div>
          <div style="margin-left: -10px;"></div>
          <div></div>
        </q-btn>
        <div style="display: flex; align-items: center;margin-top:-3px;">
          <span class="q-mr-sm">v{{appVersion}}</span><q-btn style="margin-right:-6px;margin-left:-6px;" no-caps @click="accountURL()"  v-if="isAuthenticated">{{accountName}}</q-btn><span style="height:10px;border-right:1px solid #eee;"></span><q-btn style="margin-right:-6px;margin-left:-6px;" no-caps v-if="isAuthenticated" @click="logoutSubmit()">Logout</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="220"
      show-if-above
      bordered
      overlay
      content-class="bg-grey-0"
    >
      <q-scroll-area class="fit"
        style="box-shadow: 5px 5px #000;"
      >
      <div class="flex justify-end q-pr-md q-pt-sm q-pb-sm">
        <q-icon class="cursor-pointer" style="font-size:2rem" name="close" @click="drawer = !drawer"/>
      </div>
        <q-list>
         <q-separator />
          <template v-for="(menuItem, index) in menuList">
            <q-item v-if="handleFunctionCall(menuItem.displayCondition)" :key="index" clickable :active="selectedItemLabel === menuItem.label" active-class="bg-grey-4" v-ripple @click="onSelectMenu(menuItem)">
                <q-item-section avatar style="    align-items: center;">
                  <!-- <q-icon :name="menuItem.icon" /> -->
                  <img :src="menuItem.icon" alt="menu-icon">
                </q-item-section>
                <q-item-section class="text-subtitle1">
                   <strong>{{ menuItem.label }}</strong>
                </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="page-container page-container-main">
      <div class="flex justify-center text-center" style="width: 80px; height: 80px; margin: 20px auto 0px auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" class="freeos-logo-icon inline-block fill-current text-primary header-logoicon"><path fill="#00a1ed" d="M41.7 0C18.7 0 0 18.7 0 41.7c0 23 18.7 41.7 41.7 41.7 23 0 41.7-18.7 41.7-41.7C83.4 18.7 64.8 0 41.7 0zM26.9 68.6c-2.7 0-5.3-1-7.3-2.8-13.3-12.2-14.2-32.9-2-46.3C23.8 12.8 32.6 9 41.7 9c1.7 0 3.4.1 5.1.4h.2c-5.6 2.3-9.7 7.5-10.6 13.5-.1.6-.2 1.3-.2 1.9V26c-.1 4.1.1 8.2.6 12.3l-10.6 3.9c-.7.3-1.1 1.1-.8 1.8l.5 1.2c1.4 4 5.8 6 9.8 4.6.4-.2.9-.4 1.3-.6l1-.6.3-.2v.4c.2 3 .1 6-.2 9H38c0 .3 0 .6-.1 1-.1.6-.2 1.2-.4 1.8-1.4 4.8-5.7 8-10.6 8zm14.8 5.9c-1.8 0-3.7-.2-5.5-.5 6-2.5 10.1-8 10.8-14.5.7-5.4.7-10.9-.1-16.3l10.8-6.4c1.2-.7 1.7-2.2 1.2-3.5l-.1-.3c-.5-1.4-2-2.1-3.4-1.6L45.9 35l-.2.1V35c-.4-2.8-.5-5.7-.4-8.5.4-8.3 5.3-11.7 11.3-11.6 2.5.1 4.8.9 6.8 2.4.5.4.9.8 1.4 1.3 12.8 12.6 12.9 33.3.2 46.2-6.2 6.2-14.5 9.7-23.3 9.7z"></path></svg>
        </div>
      <router-view />
    </q-page-container>

    <!-- <q-footer bordered class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar >
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>
<script>
import { stakeRequirement } from 'src/store/freeos/getters'
// import WalletLoginDialog from 'components/accountManagement/WalletLoginDialog'
import { mapState, mapActions, mapGetters } from 'vuex'
// import dollar from '../assets/dollar-icon.svg'
const menuList = [
  {
    icon: require('@/assets/dollar-icon.svg'),
    label: 'Claim',
    separator: true,
    route: '/claim'
  },
  {
    icon: require('@/assets/transfericon.svg'),
    label: 'Transfer',
    separator: true,
    route: '/transfer'
  },
  {
    icon: require('@/assets/convert.svg'),
    label: 'Convert',
    separator: true,
    route: '/convert'
  },
  {
    icon: require('@/assets/stack.svg'),
    label: 'Stake',
    separator: true,
    displayCondition: "showStake",
    route: '/stake'
  },
  {
    icon: require('@/assets/register.svg'),
    label: 'Re-register',
    separator: true,
    route: '/re-register'
  },
  {
    icon: require('@/assets/proton.svg'),
    label: 'Proton Swap',
    separator: true,
    route: 'https://www.protonswap.com/swap'
  },
  {
    icon: require('@/assets/info.svg'),
    label: 'Info',
    separator: true,
    route: '/info'
  }
]
export default {
  data () {
    return {
      isShowDrawerButton: false,
      drawer: false,
      selectedItemLabel: null,
      menuList
    }
  },
  computed: {
    ...mapGetters('freeos', ['user', 'isAuthenticated', 'accountName', 'stakeRequirement', 'isFreeosEnabled', 'userHasStaked', 'userStake','airkeyBalance']),
    appVersion: function () {
      return process.env.APP_VERSION
    },
  },
  components: {
    // Balance
  },
   methods: {
    ...mapActions('freeos', ['monitorBlockChain']),
    async logoutSubmit(){
      await this.logout();
    },
    handleFunctionCall(functionName) {
        if(functionName)
          return this[functionName]()
        else
          return true
    },
    showStake: function () {
      //(!this.userHasStaked && !this.airkeyBalance)
       return (!this.userHasStaked && !this.airkeyBalance) || this.userStake > 0
    },
    accountURL (){
      window.open(process.env.ACCOUNT_URL + this.accountName, '_blank');
    },
    onSigninFinish (event) {
      if (event.isFinished) {
        this.isShowDrawerButton = true
        this.drawer = true
        this.onSelectMenu(menuList[0])
      }
    },
    onSelectMenu (menuItem) {
      if(!menuItem.route.startsWith("http")){
        (this.$route.path !== menuItem.route) && this.$router.push(menuItem.route)
      }else{
        window.open(menuItem.route, '_blank');
      }
      this.selectedItemLabel = menuItem.label
    },
    ...mapActions('account', ['checkIfLoggedIn', 'connectWallet', 'logout', 'getAccountInfo', 'getClaimDetailInfo']),
    ...mapActions('calendar', ['getClaimCalendar'])
  },
  created () {
    // this.getClaimCalendar()
    this.monitorBlockChain()
  },
  watch: {
    isFreeosEnabled: {
      immediate: true,
      handler: function(val, oldVal) {
          if(val===false){
            this.$router.push({path:'/'})
          }
      },
    },
    isAuthenticated: {
      handler: function(val, oldVal) {
          if(val===false){
            this.$router.push({path:'/'})
          }
      },
    },
  }
}
</script>

<style lang="scss">
$panel-border-radius: 8px;
$panel-width: 360px;

  .page-container-main{
      background: url('../assets/bluebg.svg') center -50px no-repeat;
      background-size:4056px;
      padding-bottom:100px;
  }
  .claim-page   .page-container-main{
    background:none;
  }

  .q-btn__wrapper::before {
    display: none;
  }
  .burger-menu {
    background: none !important;
    div {
      width: 35px;
      height: 2px;
      background-color: #fff;
      margin: 3px 0;
    }
    div:nth-child(2) {
      width: 25px;
    }
  }
  .q-btn__content {
    flex-direction: column;
    /* align-items: baseline; */
  }
  .q-separator {
      border: 0;
      background: rgba(0, 0, 0, 0.05);
  }


.hide {
    display: none !important;
}

.panel-wrap {
    max-width: $panel-width;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.panel {
    border: 1px solid #eee !important;
    border-radius: $panel-border-radius !important;
    box-shadow: none;
}

.panel-strong {
    border: 2px solid #555 !important;
}

.panel-info {
    border: 2px solid var(--q-color-primary) !important;
}

.panel-warning {
    border: 2px solid var(--q-color-warning) !important;
}

.panel-top-total {
    border: 1px solid #ccc;
    border-radius: $panel-border-radius;
    padding-bottom: 45px;
    margin-bottom: -20px;
    margin-top: 4px;
}


</style>
