import { Router } from 'express'
import Administrator from '../models/admin'

export default ({ config, db }) => {
  let router = Router()

  router.param('administrator', (request, response, next, id) => {
    request.administrator = Administrator.get(id)
  })

  router.get('/', async (request, response) => {
    try {
      response.json(await Administrator.orderBy('name').run())
    } catch (error) {
      response.status(404).json({error: error})
    }
  })

  router.post('/', async (request, response) => {
    try {
      if (request.body.user !== undefined) {
        var creation = await Administrator.insert(request.body.user).run()
        response.json(creation)
      } else {
        response.status(400).json({error: 'error'})
      }
    } catch (error) {
      response.status(404).json({error: error})
    }
  })

  router.put('/', async (request, response) => {
    try {
      if (request.body.id !== undefined && request.body.newUser !== undefined) {
        var edition = await Administrator.get(request.body.id).update(request.body.newUser).run()
        response.json(edition)
      } else {
        response.status(400).json({error: 'error'})
      }
    } catch (error) {
      response.status(404).json({error: error})
    }
  })

  router.delete('/', async (request, response) => {
    try {
      console.log(request.body)
      if (request.body.id !== undefined) {
        var deletion = await Administrator.get(request.body.id).delete().run()
        response.json(deletion)
      } else {
        response.status(400).json({error: 'error'})
      }
    } catch (error) {
      response.status(404).json({error: error})
    }
  })

  return router
}
