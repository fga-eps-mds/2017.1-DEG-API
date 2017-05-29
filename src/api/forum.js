import { Router } from 'express'
import Forum from '../models/forum'
import { getCorrectError } from '../helpers/errorHandling'
import _ from 'lodash'

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
      console.log(err)
      response.status(404).json({ error: err.name })
    }
  })

  router.get('/:forum', async ({ forum }, response) => {
    var success = false
    try {
      var result = await forum.getJoin({
        coordinators: {
          _apply: (coordinators) => {
            return coordinators.count()
          },
          _array: false
        }
      }).run()

      response.json(result)
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

  router.post('/', async ({ body }, response) => {
    var success = false
    try {
      if (body.forum.date) {
        body.forum.date = new Date(body.forum.date)
        var result = await Forum.save(body.forum)
        response.json({result, success: !success})
      } else {
        var error = {name: 'Dados inválidos de fórum. Data inválida.'}
        throw {name: 'Dados inválidos de fórum. Data inválida.'}
      }
    } catch (error) {
      var statusError = getCorrectError(error, 404, 404, 400, 400)
      var errorMessage = getCorrectError(error,
        error.name,
        "Forum não encontrado",
        "Dados inválidos de fórum" + error.message
      )
      response.status(statusError).json({error: errorMessage, success})
    }
  })

  router.put('/:forum', async({ forum, body }, response) => {
    var success = false
    try {
      var forumInstance = await forum.run()

      if (body.forum.date !== undefined && body.forum.date !== null) {
        body.forum.date = new Date(body.forum.date)
      }
      var result = await forumInstance.merge(body.forum).save()
      var old = await forumInstance.getOldValue()
      response.json({result, old, success: !success})
    } catch (error) {
      var statusError = getCorrectError(error, 404,404, 400, 400)
      var errorMessage = getCorrectError(error,
        error.name,
        "Forum não encontrado",
        "Dados inválidos de fórum" + error.message,
        "Um erro ocorreu ao alterar esse forum " + error.message
      )
      response.status(statusError).json({error: errorMessage, success})
    }
  })

  router.delete('/:forum', async ({ forum }, response) => {
    var success = false
    try {
      var forumInstance = await forum
      var result = await forumInstance.delete()
      response.json({ result, success: !success })
    } catch (error) {
      var errorMessage = getCorrectError(error,
        error.name,
        "Forum não encontrado"
      )
      response.status(404).json({ error: errorMessage, success })
    }
  })

  router.get('/:forum/confirmations', async ({ forum }, response) => {
    var success = false
    try {
      var forumResult = await forum.getJoin({
        coordinators: true
      }).run()

      var result = forumResult.coordinators.map((coord) => {
        return _.pick(coord, ['email', 'course', 'registration', 'name'])
      })

      response.json({ result, success: !success })
    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error, success })
    }
  })

  return router
}
