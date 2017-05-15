import { Router } from 'express'
import User from '../models/user'
import Coordinator from '../models/coordinator'
import Admin from '../models/admin'

export default ({ config, db }) => {
  let router = Router()

  router.param('user', (req, resp, next, id) => {
    req.user = User.get(id)
    next()
  })

  router.post('/authenticate', async ({ body }, res) => {
    var success = false
    var user = 'null'
    try {
      var coords = await Coordinator.filter({ registration: body.registration, password: body.password }).run()
      var coordinator = coords[0]
      var admins = await Admin.filter({ registration: body.registration, password: body.password }).run()
      var administrator = admins[0]

      if (administrator !== undefined) {
        user = 'administrator'
        success = true
      } else if (coordinator !== undefined) {
        user = 'coordinator'
        success = true
      }
      res.json({coordinator, administrator, success, user})
      // if (can(user, 'login', user)) {
      //   var token = createToken(user, config)
      // } else {
      //   res.status(401).json({error: 'Não foi possível realizar login'})
      // }
//       {
// 	success: true,
// 	user: admin || coord,
// 	coord: {
//
// 	}
//
// }
    } catch (err) {
      console.log(err)
      res.status(404).json({ error: err.name, success })
    }
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

  return router
}
