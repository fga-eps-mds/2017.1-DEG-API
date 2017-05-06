import { Router } from 'express'
import Coordinator from '../models/coordinator'

export default ({ config, db }) => {
  let router = Router()

  router.param('coordinator', (request, response, next, id) => {
    request.coordinator = Coordinator.get(id)
  })

  router.get('/', async (request, response) => {
    try {
      response.json(await Coordinator.orderBy('name').run())
    } catch (error) {
      response.status(404).json({error: error})
    }
  })

  router.delete('/', async (request, response) => {
    try {
      console.log(request.body)
      if (request.body.id !== undefined) {
        var deletion = await Coordinator.get(request.body.id).delete().run()
        response.json(deletion)
      } else {
        response.status(500).json({error: 'error'})
      }
    } catch (error) {
      response.status(404).json({error: error})
    }
  })

  return router
}
