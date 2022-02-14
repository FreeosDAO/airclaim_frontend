<template>
  <q-layout view="hHh Lpr fFf">



    <q-page-container class="page-container">
      <div class="flex justify-center text-center" style="width: 110px; height: 110px; margin: 80px auto 0px auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" class="freeos-logo-icon inline-block fill-current text-primary header-logoicon"><path fill="#00a1ed" d="M41.7 0C18.7 0 0 18.7 0 41.7c0 23 18.7 41.7 41.7 41.7 23 0 41.7-18.7 41.7-41.7C83.4 18.7 64.8 0 41.7 0zM26.9 68.6c-2.7 0-5.3-1-7.3-2.8-13.3-12.2-14.2-32.9-2-46.3C23.8 12.8 32.6 9 41.7 9c1.7 0 3.4.1 5.1.4h.2c-5.6 2.3-9.7 7.5-10.6 13.5-.1.6-.2 1.3-.2 1.9V26c-.1 4.1.1 8.2.6 12.3l-10.6 3.9c-.7.3-1.1 1.1-.8 1.8l.5 1.2c1.4 4 5.8 6 9.8 4.6.4-.2.9-.4 1.3-.6l1-.6.3-.2v.4c.2 3 .1 6-.2 9H38c0 .3 0 .6-.1 1-.1.6-.2 1.2-.4 1.8-1.4 4.8-5.7 8-10.6 8zm14.8 5.9c-1.8 0-3.7-.2-5.5-.5 6-2.5 10.1-8 10.8-14.5.7-5.4.7-10.9-.1-16.3l10.8-6.4c1.2-.7 1.7-2.2 1.2-3.5l-.1-.3c-.5-1.4-2-2.1-3.4-1.6L45.9 35l-.2.1V35c-.4-2.8-.5-5.7-.4-8.5.4-8.3 5.3-11.7 11.3-11.6 2.5.1 4.8.9 6.8 2.4.5.4.9.8 1.4 1.3 12.8 12.6 12.9 33.3.2 46.2-6.2 6.2-14.5 9.7-23.3 9.7z"></path></svg>
      </div>
      <div class="flex justify-center text-center" style="width: 120px; margin: 5px auto">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 120" class="freeos-logo-text inline-block fill-current text-primary header-logotext"><path fill="#00a1ed" d="M262.4 34.4c-18.1 0-31.2 15.8-31.2 32.9 0 14.4 9.6 24.6 26.3 24.6 18.1 0 31.2-15.6 31.2-32.8 0-14.4-9.6-24.7-26.3-24.7zm-4.5 47c-9 0-14.3-5.7-14.3-14.6 0-11.1 7.6-21.8 18.5-21.8 9 0 14.3 5.7 14.3 14.6 0 11.2-7.6 21.8-18.5 21.8zM318.4 57.4c-5.7-2-10.5-3.9-10.5-7 0-3.6 3.5-6.5 9.6-6.5 6.8 0 13.6 3.6 16.2 7.3l6.3-7.8c-4.5-5.2-12.9-9-22.2-9-14.1 0-21.8 8.5-21.8 17.8 0 9.1 9.4 12.5 17.3 15.3 5.8 2 10.9 3.9 10.9 7.6 0 3.9-3.7 7.4-9.9 7.4-8 0-15.6-4.5-18.7-8.6l-7 8.3c5.7 6.3 14.7 9.7 24.7 9.7 14.4 0 22.8-8.6 22.8-18.7 0-9.4-9.7-12.9-17.7-15.8zM111.4 46.9l2.8-12.8h-.5c-7.9 0-13.7 2.4-19.1 8l1.6-6.8H83.5L71.2 90.9h12.7l8.2-37.3c2.8-3.4 8.1-7.4 14.1-7.4 2.1 0 4 .3 4.8.6l.4.1zM141.8 34c-17.8 0-31.7 14.7-31.7 33.4 0 15.3 10.7 24.9 28 24.9 7 0 14.3-2.3 19.5-6.1l.3-.2-4.1-9-.4.3c-3.5 2.7-9.2 4.5-14.4 4.5-10.6 0-16.3-6.6-16.3-12.7l.1-1.6h42.3l.1-.3c.5-1.9 1-5.6 1-8.5.1-14.8-9.7-24.7-24.4-24.7zm13 24.3h-30.6c1.5-6.7 7.8-13.7 16.6-13.7 8.5 0 14 4.9 14 12.5.1.3.1.8 0 1.2zM202.2 34c-17.8 0-31.7 14.7-31.7 33.4 0 15.3 10.7 24.9 28 24.9 7 0 14.3-2.3 19.5-6.1l.3-.2-4.1-9-.4.3c-3.5 2.7-9.2 4.5-14.4 4.5-10.6 0-16.3-6.6-16.3-12.7l.1-1.6h42.3l.1-.3c.5-1.9 1-5.6 1-8.5.1-14.8-9.7-24.7-24.4-24.7zm13.1 24.3h-30.6c1.5-6.7 7.8-13.7 16.6-13.7 8.5 0 14 4.9 14 12.5v1.2zM75.2 33.1H58.5l1.3-5.6c2.3-10.5 7-15.3 14.8-15.3 3-.1 6.1.7 8.6 2.4l.3.2 5.3-9.6-.3-.2c-4.5-2.7-9.7-4-15-3.8-14.1 0-23.3 8.8-27.3 26.2L44.9 33H31.3l-2.7 11.6h13.6l-7.4 32.5-2.9 10-1.7 6c-2.8 10.3-7.8 15-15.6 14.6-3 0-6-1-8.5-2.8l-.3-.3-5.8 9.3.3.2c4.4 2.9 9.5 4.5 14.8 4.6h1.7c13.2 0 22.3-8.3 27-24.8l1.7-6.1.2-1 10.2-42.2h16.7l2.6-11.5z"></path></svg>
     </div>
      <router-view />
    </q-page-container>
    <div style="position:fixed;top:0;right:0;max-width:550px;margin:0 auto;">
        <span class="q-ml-auto q-mr-sm">v{{appVersion}}</span> 
    </div>

  </q-layout>
</template>
<script>
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
    icon: require('@/assets/stack.svg'),
    label: 'Stake',
    separator: true,
    route: '/stake'
  },
  {
    icon: require('@/assets/register.svg'),
    label: 'Re-register',
    separator: true,
    route: '/register'
  },
  {
    icon: require('@/assets/proton.svg'),
    label: 'Alcor',
    separator: true,
    route: '/proton'
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
    ...mapState({
      accountName: state => state.account.accountName,
      iterationNumber: state => state.calendar.currentIteration.iteration_number
    }),
    ...mapGetters('account', ['isAuthenticated', 'connecting']),  
    appVersion: function () {
      return process.env.APP_VERSION
    }
  },
  components: {
    // Balance
  },
  created () {
    // this.getClaimCalendar()
    this.monitorBlockChain()
  },
  methods: {
    ...mapActions('freeos', ['monitorBlockChain']),
    onSigninFinish (event) {
      if (event.isFinished) {
        this.isShowDrawerButton = true
        this.drawer = true
        this.onSelectMenu(menuList[0])
      }
    },
    onSelectMenu (menuItem) {
      (this.$route.path !== menuItem.route) && this.$router.push(menuItem.route)
      this.selectedItemLabel = menuItem.label
    },
    ...mapActions('account', ['checkIfLoggedIn', 'connectWallet', 'logout', 'getAccountInfo', 'getClaimDetailInfo']),
    ...mapActions('calendar', ['getClaimCalendar'])
  },
  watch: {

  }
}
</script>
<style>
.freeos-logo-icon{
    animation:fadeInRotate;
    opacity:0;
    animation-duration:1s;
    animation-iteration-count: 1;
    animation-delay:1s;
    animation-fill-mode: forwards;
}
.freeos-logo-text{
    animation:fadeIn;
    opacity:0;
    animation-duration:1s;
    animation-iteration-count: 1;
    animation-delay:1.5s;
    animation-fill-mode: forwards;
}
.intro-info{
    animation:fadeIn;
    opacity:0;
    animation-duration:1s;
    animation-iteration-count: 1;
    animation-delay:2s;
    animation-fill-mode: forwards;
}

@keyframes fadeInRotate {
    0% {
        opacity:0;
        transform: scale(3);
    }
    100% {
        opacity:1;
        transform: scale(1) rotate(360deg);
    }
}
@keyframes fadeIn {
    0% {
        opacity:0;
    }
    100% {
        opacity:1;
    }
}
</style>
