var thinky = require('thinky')({
  host: process.env.DOCKHERO_HOST,
  password: process.env.RETHINKDB_PASSWORD
})
var { type, r, Errors } = thinky

function init () {
  return new Promise((resolve, reject) => {
    thinky.dbReady().then(() => {
      resolve(thinky)
    })
  })
}
export { init, thinky, type, r, Errors }
