import { Router } from 'express'

export default ({ config, db }) => {
  let router = Router()

  router.get('/', (request, response) => {
    response.json({name: 'teste'})
  })

  return router
}
