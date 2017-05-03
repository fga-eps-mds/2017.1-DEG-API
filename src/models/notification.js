import { thinky, type } from '../db'

let Notification = thinky.createModel('Notification', {
  id: type.number().required(),
  message: type.string().required()
})

export default Notification
