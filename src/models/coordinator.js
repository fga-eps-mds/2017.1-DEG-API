import { thinky, type } from '../db'

let Coordinator = thinky.createModel('Coordinator', {
  name: type.string().required(),
  password: type.string().required(),
  email: type.string().required(),
  registration: type.string().required(),
  course: type.string().required()
})

export default Coordinator
