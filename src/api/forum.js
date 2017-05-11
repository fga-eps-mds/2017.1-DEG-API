import { Router } from 'express'
import Forum from '../models/forum'
import { getCorrectError } from '../helpers/errorHandling'

export default ({ config, db }) => {
  let router = Router()

  router.param('forum', (req, resp, next, id) => {
    req.forum = Forum.get(id)
    next()
  })

  router.get('/', async (request, response) => {
    try {
      response.json(await Forum.orderBy('date').run())
    } catch (err) {
      response.status(404).json({ error: err.name })
    }
  })

  router.get('/:forum', async ({ forum }, response) => {
    var success = false
    try {
      response.json({result: await forum, success: !success})
    } catch (error) {   
      var errorMessage = getCorrectError(error,
        error.name,
        "Forum não encontrado",
        "Dados inválidos de Forum " + error.message
      )

      var statusError = getCorrectError(error,
        404,
        404,
        400
      )
      response.status(statusError).json({ error: errorMessage, success })
    }
  })

  router.post('/', async ({body}, response) => {
    var success = false
    try {
      var result = await Forum.save(body.forum)
      response.json({result, success: !success})
    } catch (error) {
      var statusError = getCorrectError(error, 404,404, 400, 400)
      var errorMessage = getCorrectError(error,
        error.name,
        "Forum não encontrado",
        "Dados inválidos de fórum" + error.message
      )
      response.status(statusError).json({error: errorMessage, success})
    }
  })

  return router
}
