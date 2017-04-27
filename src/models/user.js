import { thinky, type } from '../db'

let User = thinky.createModel('User', {
  name: type.string(),
  password: type.string()
})

export default User
