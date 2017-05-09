import { Router } from 'express'
import Forum from '../models/forum'

export default ({ config, db }) => {
  let router = Router()

  router.param('forum', (req, resp, next, id) => {
    req.forum = Forum.get(id)
    next()
  })

  router.get('/', async ({ params }, response) => {
    try {
      response.json(await Forum.run())
    } catch (err) {
      response.status(404).json({ error: err.name })
    }
  })

  router.get('/:forum', async ({ forum }, response) => {
    try {
      response.json(await forum)
    } catch (err) {
      response.status(404).json({ error: err.name })
    }
  })

  router.post('/', async ({ body, query }, response) => {
    try {
      console.log(body, 'aeaeaeu')
      console.log(query)
      response.json(await Forum.save(body.forum))
    } catch (err) {
      response.status(404).json({ error: err.name })
    }
  })

  return router
}
