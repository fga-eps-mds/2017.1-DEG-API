import { Router } from 'express'
import Coordinator from '../models/coordinator'
import { getCorrectError } from '../helpers/errorHandling'

export default ({ config, db }) => {
  let router = Router()

  router.param('coordinator', async (req, resp, next, registration) => {
    req.coordinator = Coordinator.get(registration)
    next()
  })

  router.get('/', async (request, response) => {
    console.log("GET ALL")
    try {
      response.json(await Coordinator.orderBy('name').run())
    } catch (error) {
      response.status(404).json({error: error})
    }
  })

  router.get('/:coordinator', async ({ coordinator }, response) => {
    console.log("GET ONE")
    try {
      var result = await coordinator.getJoin({forums: true}).run()
      response.json(result)
    } catch (error) {
      var errorMessage = getCorrectError(error,
        error.name,
        "Coordenador não encontrado",
        "Dados inválidos de coordenador " + error.message
      )

      var statusError = getCorrectError(error,
        404,
        404,
        400
      )
      response.status(statusError).json({ error: errorMessage })
    }
  })

  router.post('/', async ({ body, query }, response) => {
    console.log("POST")
    var success = false
    try {
      var result = await Coordinator.save(body.coordinator)
      success = true
      response.json({ result, success })
    } catch (error) {
      var errorMessage = getCorrectError(error,
        error.name,
        "Coordenador não encontrado",
        "Dados inválidos de coordenador " + error.message
      )

      var statusError = getCorrectError(error,
        404,
        404,
        400
      )
      response.status(statusError).json({ error: errorMessage, success })
    }
  })

  router.put('/:coordinator', async ({ coordinator, body }, response) => {
    console.log("PUT")
    var success = false
    try {
      // var result = await coordinator.update(body.coordinator).run()
      var coordInstance = await coordinator.run()
      var result = await coordInstance.merge(body.coordinator).save()
      var old = await coordInstance.getOldValue()
      success = true
      response.json({ result, old, success })
    } catch (error) {
      console.log(error)
      var statusError = getCorrectError(error,
        404,
        404,
        400,
        400
      )

      var errorMessage = getCorrectError(error,
        error.name,
        "Coordenador não encontrado",
        "Dados inválidos de coordenador " + error.message,
        "Um erro ocorreu ao alterar esse cordenador " + error.message
      )
      response.status(statusError).json({ error: errorMessage, success })
    }
  })

  router.delete('/:coordinator', async ({ coordinator }, response) => {
    console.log("DELETE")
    var success = false
    try {
      var coordinatorInstance = await coordinator
      var result = await coordinatorInstance.delete()
      success = true
      response.json({ result, success })
    } catch(error) {
      var errorMessage = getCorrectError(error,
        error.name,
        "Coordenador não encontrado"
      )
      response.status(404).json({ error: errorMessage, success })
    }
  })

  router.post('/:coordinator/forum/:forum',
    async ({ coordinator, params }, response) => {
    console.log("POST FORUM")
    var success = false
    try {
      var coordinatorInstance = await coordinator
      var result = coordinatorInstance.addRelation("forums", {id: params.forum})
      success = true
      response.json({ result , success })
    } catch (error) {
      response.status(404).json({ error: error.name, success })
    }
  })

  router.delete('/:coordinator/forum/:forum',
    async ({ coordinator, params }, response) => {
      var success = false
      console.log(params)
      try {
        var coordinatorInstance = await coordinator
        var result = coordinatorInstance.removeRelation("forums", {id: params.forum}).run()
        success = true
        response.json({ result, success })
      } catch (error) {
        console.log(error)
        var errorMessage = getCorrectError(error, error.name, "Coordenador não encontrado.")
        var errorStatus = getCorrectError(error, 404, 401)

        response.status(errorStatus).json({ error: errorMessage, success })
      }
    })

    router.get('/:coordinator/forum/:forum',
      async ({ coordinator, params }, response) => {
      console.log("GET ONE FORUM")
      var success = false
      try {
        var result = await coordinator.getJoin({
          forums: true
        }).run()

        result.forums.forEach((forum) => {
          console.log(forum)
          if (forum.id === params.forum){
            success = true
          }
        })

        response.json({ success })
      } catch (error) {
        var errorMessage = getCorrectError(error,
          error.name,
          "Coordenador não encontrado",
          "Dados inválidos de coordenador " + error.message
        )

        var statusError = getCorrectError(error,
          404,
          404,
          400
        )
        response.status(statusError).json({ error: errorMessage })
      }
    })

  return router
}
