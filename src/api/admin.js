import { Router } from 'express'
import Administrator from '../models/admin'
import { getCorrectError } from '../helpers/errorHandling'
import _ from 'lodash'

export default ({ config, db }) => {
  let router = Router()

  router.param('administrator', (req, res, next, registration) => {
    req.administrator = Administrator.get(registration)
    next()
  })

  router.get('/', async (request, response) => {
    try {
      response.json(await Administrator.orderBy('name').run())
    } catch (error) {
      response.status(404).json({error: error})
    }
  })

  router.get('/:administrator', async ({ administrator }, response) => {
    try {
      var result = await administrator
      // result = _.pick(result, ['registration', 'name', 'email'])
      response.json(result)
    } catch (error) {
      var errorMessage = getCorrectError(error,
        error.name,
        "Administrador não encontrado",
        "Dados inválidos de administrador " + error.message
      )

      var statusError = getCorrectError(error,
        404,
        404,
        400
      )
      response.status(statusError).json({error: errorMessage})
    }
  })

  router.post('/', async ({ body }, response) => {
    var success = false
    try {
      var result = await Administrator.save(body.administrator)
      success = true
      response.json({ result, success })
    } catch (error) {
      var errorMessage = getCorrectError(error,
        error.name,
        "",
        "Dados inválidos de administrador " + error.message
      )

      var statusError = getCorrectError(error,
        404,
        404,
        400
      )
      response.status(statusError).json({error: errorMessage, success})
    }
  })

  router.put('/:administrator', async ({ administrator, body }, response) => {
    var success = false
    try {
      var admInstance = await administrator.run()
      var result = await admInstance.merge(body.administrator).save()
      var old = await admInstance.getOldValue()
      success = true
      response.json({result, old, success})
    } catch (error) {
      var statusError = getCorrectError(error,
        404,
        404,
        400,
        400
      )

      var errorMessage = getCorrectError(error,
        error.name,
        "Administrador não encontrado",
        "Dados inválidos de Administrador " + error.message,
        "Um erro ocorreu ao alterar esse administrador " + error.message
      )
      response.status(statusError).json({error: errorMessage, success})
    }
  })

  router.delete('/:administrator', async ({ administrator }, response) => {
    var success = false
    try {
      var admInstance = await administrator
      var result = admInstance.delete()
      success = true
      response.json({ result, success })
    } catch (error) {
      // console.log(error)
      var errorMessage = getCorrectError(error,
        error.name,
        "Administrador não encontrado"
      )
      response.status(404).json({error: errorMessage, success})
    }
  })

  return router
}
