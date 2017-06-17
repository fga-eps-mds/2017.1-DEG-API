import { Router } from 'express'
import Form from '../models/form'
import { getCorrectError } from '../helpers/errorHandling'
import { computeAnswersPercentage } from '../helpers/form'

export default ({ config, db }) => {
  let router = Router()

  router.param('form', (req, resp, next, id) => {
    req.form = Form.get(id)
    next()
  })

  router.get('/', async (request, response) => {
    try {
      var forms = await Form.orderBy('date').run()
      // forms = forms.reverse()
      response.json(forms)
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
      if (body.form.expiration_date) {
        body.form.expiration_date = new Date(body.form.expiration_date)
        if (isNaN(body.form.expiration_date)) {
          throw { name: 'Data inválida' }
        }
      }

      var result = await Form.save(body.form)
      response.json({result, success: !success})
    } catch (error) {
      response.status(404).json({error: error.name, success})
    }
  })

  router.put('/:form', async({ form, body }, response) => {
    var success = false
    try {
      var formInstance = await form.run()
      if (body.form.expiration_date !== undefined && body.form.expiration_date !== null) {
        body.form.expiration_date = new Date(body.form.expiration_date)
        if (isNaN(body.form.expiration_date)) {
          throw { name: 'Data inválida' }
        }
      }
      var result = await formInstance.merge(body.form).save()
      var old = await formInstance.getOldValue()
      response.json({result, old, success: !success})
    } catch (error) {
      var statusError = getCorrectError(error, 404,404, 400, 400)
      var errorMessage = getCorrectError(error,
        error.name,
        "Forum não encontrado",
        "Dados inválidos de formulário " + error.message,
        "Um erro ocorreu ao alterar esse formulário " + error.message
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

  router.get('/:form/results', async ({ form }, response) => {
    var success = false
    try {
      var formInstance = await form.getJoin({
        answers: true
      }).run()
      var result = computeAnswersPercentage(formInstance)
      console.log(result)
      success = true
      response.json({ success, result })
    } catch (error) {
      var errorMessage = getCorrectError(error,
        error.name,
        "Formulário não encontrado."
      )
      response.status(404).json({ error: errorMessage, success })      
    }
  })

  return router
}