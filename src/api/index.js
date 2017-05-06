import { version } from '../../package.json'
import { Router } from 'express'
import user from './user'
import administrator from './admin'
import coordinator from './coordinator'
// import form from './form'

export default ({ config, db }) => {
  let api = Router()

  // Add model routes

  api.get('/', (req, res) => {
    console.log(version)
    res.json({ version })
  })

  api.use('/users', user({config, db}))
  api.use('/administrator', administrator({config, db}))
  api.use('/coordinator', coordinator({config, db}))

  return api
}
