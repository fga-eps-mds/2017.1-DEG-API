import { thinky, type } from '../db'

let User = thinky.createModel('User', {
  name: type.string().required(),
  password: type.string().required(),
  email: type.string().required(),
  registration: type.string().required()
})

export default User
