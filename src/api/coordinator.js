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
    try {
      response.json(await Coordinator.orderBy('name').run())
    } catch (error) {
      response.status(404).json({error: error})
    }
  })

  router.get('/:coordinator', async ({ coordinator }, response) => {
    try {
      response.json(await coordinator)
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

  router.post('/', async ({ body, query }, response) => {
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

  return router
}
