import { Router } from 'express'
import User from '../models/user'

export default ({ config, db }) => {
  let router = Router()

  router.param('user', (req, resp, next, id) => {
    req.user = User.get(id)
    next()
  })

  router.get('/', async ({ params }, response) => {
    try {
      response.json(await User.run())
    } catch (err) {
      response.status(404).json({ error: err.name })
    }
  })

  router.get('/:user', async ({ user }, response) => {
    try {
      response.json(await user)
    } catch (err) {
      response.status(404).json({ error: err.name })
    }
  })

  router.post('/', async ({ body, query }, response) => {
    try {
      console.log(body, 'aeaeae')
      console.log(query)
      response.json(await User.save(body.user))
    } catch (err) {
      response.status(404).json({ error: err.name })
    }
  })

  return router
}
