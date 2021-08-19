const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed
module.exports = function (ctx) {

  parsedEnv['AIRCLAIM_CONTRACT'] = ctx.dev ? "statsb" : "statsb",
  parsedEnv['AIRCLAIM_CONFIGURATION_CONTRACT'] = ctx.dev ? "statscfg" : "statscfg",
  parsedEnv['FREEOSTOKENS_CONTRACT'] = ctx.dev ? "statstokens": "statstokens"
  parsedEnv['TIMED_FETCH_DELAY'] = ctx.dev ? 10000000 : 10000
  parsedEnv['VUE_ROUTER_MODE'] = ctx.dev ? "hash" : "history"

  return parsedEnv
}
