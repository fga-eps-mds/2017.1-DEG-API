import { Router } from 'express'
import Form from '../models/form'

export default ({ config, db }) => {
  let router = Router()

  router.param('form', (req, resp, next, id) => {
    req.form = Form.get(id)
    next()
  })

  router.get('/', async (request, response) => {
    try {
      response.json(await Form.run())
    } catch (err) {
      console.log(err)
      response.status(404).json({ error: err.name })
    }
  })

  router.get('/:form', async ({ form }, response) => {
    var success = false
    try {
      var result = await form.getJoin({forum: true}).run()
      response.json({ result, success: !success })
    } catch (err) {
      console.log(err)
      response.status(404).json({ error: err.name })
    }
  })

  router.post('/', async ({ body }, response) => {
    var success = false
    try {
      var result = await Form.save(body.form)
      response.json({ result, success: !success })
    } catch (error) {
      // console.log(error)
      response.status(404).json({error: error.name, success})
    }
  })

  router.put('/:form', async({ form, body }, response) => {
    var success = false
    try {
      var formInstance = await form.run()

      var result = await formInstance.merge(body.form).save()
      var old = await formInstance.getOldValue()
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

  router.delete('/:form', async ({ form }, response) => {
    var success = false
    try {
      var formInstance = await form
      var result = await formInstance.delete()
      response.json({ result, success: !success })
    } catch (error) {
      var errorMessage = getCorrectError(error,
        error.name,
        "Form não encontrado"
      )
      response.status(404).json({ error: errorMessage, success })
    }
  })

  return router
}
