import seeds from '.'

async function seed () {
  var promises = []

  for (var s of seeds) {
    for (var i of s.items) {
      try {
        var model = new s.model(i)
        promises.push(await model.save())
      } catch (error) {
        console.log(error)
      }
    }
  }

  return Promise.all(promises)
}

async function drop () {
  return seeds.forEach(async s => s.model.delete())
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
