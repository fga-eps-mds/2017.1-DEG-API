import { thinky, type } from '../db'
import Forum from './forum'

var Notification = thinky.createModel('Notification', {
  message: type.string().required()
})

export default Notification

