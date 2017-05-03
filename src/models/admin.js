import { thinky, type } from '../db'

let Administrator = thinky.createModel('Administrator', {
  name: type.string().required(),
  password: type.string().required(),
  email: type.string().required(),
  registration: type.string().required(),
})

export default Administrator
