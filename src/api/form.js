import { Router } from 'express'
import Form from '../models/form'

export default ({ config, db }) => {
  let router = Router()

  router.param('form', (req, resp, next, id) => {
    req.form = Form.get(id)
    next()
  })

  // "form": {
  //   "discussive": [{
  //     "question": "Sera que funfa?",
  //     "answer": "Talvez."
  //   }],
  //   "multipleChoices": [{
  //     "question": "Qual vai dar certo?",
  //     "options": ["A", "B", "C", "D"],
  //     "answer": "A"
  //   }]
  // }

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
      console.log(error)
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

  router.get('/:form/forum/:forum',
    async({ form, params }, response) => {
      var success = false
      try {
        var relation = await form.getJoin({
          forum: true
        }).run()

        if (relation.forum !== undefined && relation.forum !== null){
          success = (relation.forum.id === params.forum)
        }

        response.json({ success })
      } catch (error) {
        console.log(error)
        var errorMessage = getCorrectError(error,
          error.name,
          "Formulário não encontrado",
          "Dados inválidos de formulário " + error.message
        )

        var statusError = getCorrectError(error,
          404,
          404,
          400
        )
        response.status(statusError).json({ error: errorMessage })
      }
  })

  router.post('/:form/forum/:forum',
    async ({ form, params }, response) => {
    var success = false
    try {
      var formInstance = await form
      var result = formInstance.addRelation('forum', {id: params.forum})

      response.json({ result, success: !success })
    } catch (error) {
      response.status(404).json({ error: error.name, success })
    }
  })

  router.delete('/:form/forum/:forum',
    async ({ form, params }, response) => {
    var success = false
    try {
      var formInstance = await form
      var result = formInstance.removeRelation('forum', {id: params.forum}).run()

      response.json({result, success: !success })
    } catch (error) {
      console.log(error)

      response.status(404).json({ error: error.name, success })
    }
  })

  return router
}
