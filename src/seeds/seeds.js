import seeds from '.'
import { init } from '../db'

async function seed () {
  var promises = []

  for (var s of seeds) {
    for (var i of s.items) {
      try {
        var model = new s.model(i)
        promises.push(await model.save())
      } catch (error) {
        console.log(error)
        promises.push(false)
      }
    }
  }

  return Promise.all(promises)
}

async function drop () {
  return new Promise((resolve, reject) => {
    init()
    .then(db => {
      var promises = []
      seeds.forEach(async (s) => {
        var modelName = s.model.getTableName()
        try {
          promises.push(db.r.table(modelName).delete().run())
        } catch (error) {
          console.log('Fail at drop' + modelName)
          console.log(error)
        }
      })
      resolve(Promise.all(promises))
    })
  })
}

async function main (flag) {
  if (process.argv[2] !== '--no-drop') {
    await drop()
  }
  var result = await seed()

  if (flag !== '--no-kill') {
    process.exit(0)
  }

  return result
}

export { main, drop, seed }
