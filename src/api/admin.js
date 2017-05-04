import { Router } from 'express'
import Administrator from '../models/admin'

export default ({config, db}) => {
  let router = Router()

  router.get('/', async (request, response) => {
    try {
      response.json(await Administrator.run())
    } catch (error) {
      throw error
    }
  })

  router.get('/:admin', async (request, response) => {
    try {
      response.json(await Administrator.run())
    } catch (error) {
      throw error
    }
  })
  return router
}
