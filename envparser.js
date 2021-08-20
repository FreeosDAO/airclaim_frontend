const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed
module.exports = function (ctx) {

  parsedEnv['AIRCLAIM_CONTRACT'] = ctx.dev ? "freeos4" : "statsb",
  parsedEnv['AIRCLAIM_CONFIGURATION_CONTRACT'] = ctx.dev ? "freeoscfg4" : "statscfg",
  parsedEnv['FREEOSTOKENS_CONTRACT'] = ctx.dev ? "freeostoken4" : "statstokens"
  parsedEnv['TOKEN_CURRENCY_NAME'] = ctx.dev ? "OPTION" : "POINT"
  parsedEnv['TIMED_FETCH_DELAY'] = ctx.dev ? 10000000 : 10000
  parsedEnv['VUE_ROUTER_MODE'] = ctx.dev ? "hash" : "history"

  return parsedEnv
}
