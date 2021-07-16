const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed
module.exports = function (ctx) {

  parsedEnv['AIRCLAIM_CONTRACT'] = ctx.dev ? "freeosa" : "freeos4",
  parsedEnv['AIRCLAIM_CONFIGURATION_CONTRACT'] = ctx.dev ? "freeoscfga" : "freeoscfg4",
  parsedEnv['FREEOSTOKENS_CONTRACT'] = ctx.dev ? "freeostokena": "freeostoken4"
  parsedEnv['TIMED_FETCH_DELAY'] = ctx.dev ? 10000000 : 10000
  parsedEnv['VUE_ROUTER_MODE'] = ctx.dev ? null : "history"

  return parsedEnv
}
