import { version } from '../../package.json'
import { Router } from 'express'
import user from './user'

export default ({ config, db }) => {
  let api = Router()

  // Add model routes

  api.get('/', (req, res) => {
    console.log(version)
    res.json({ version })
  })

  api.use('/user', user({config, db}))

  return api
}
