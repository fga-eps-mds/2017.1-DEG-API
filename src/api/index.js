import { version } from '../../package.json'
import { Router } from 'express'
import user from './user'
import administrator from './admin'
import coordinator from './coordinator'
import forum from './forum'
import form from './form'

export default ({ config, db }) => {
  let api = Router()

  // Add model routes

  api.get('/', (req, res) => {
    console.log(version)
    res.json({ version })
  })

  api.use('/users', user({config, db}))
  api.use('/administrators', administrator({config, db}))
  api.use('/forums', forum({config, db}))
  api.use('/coordinators', coordinator({config, db}))
  api.use('/forms', form({config, db}))

  return api
}
