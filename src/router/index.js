import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import VueSanitize from 'vue-sanitize'

Vue.use(VueSanitize)
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store }) {
  const Router = new VueRouter({
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: "history", //process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    console.log('to', to);
    console.log('store', store);

    if (to.matched.some(record => record.meta.RrequiresAuth)) {
      if (store.getters['freeos/isAuthenticated']) {
        next()
      } else {
        next({ path: `/?returnUrl=${to.path}` })
      }
    } else {
      next()
    }
  })

  return Router
}
