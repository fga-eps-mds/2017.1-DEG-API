import { thinky, type } from '../db'
import Form from './form'
import Forum from './forum'
import Notification from './notification'

var Coordinator = thinky.createModel('Coordinator', {
  name: type.string().required(),
  password: type.string().required(),
  email: type.string().required(),
  registration: type.string().required(),
  course: type.string().required()
})

Form.hasAndBelongsToMany(Coordinator, 'coordinators', 'id', 'id')
Coordinator.hasAndBelongsToMany(Form, 'forms', 'id', 'id')
Forum.hasAndBelongsToMany(Coordinator, 'coordinators', 'id', 'id')
Coordinator.hasAndBelongsToMany(Forum, 'forums', 'id', 'id')
Forum.hasMany(Form, 'forms', 'id', 'forumId')
Form.belongsTo(Forum, 'forum', 'forumId', 'id')
Notification.belongsTo(Forum, 'forum', 'forumId', 'id')
Forum.hasMany(Notification, 'notifications', 'id', 'forumId')

export default Coordinator
