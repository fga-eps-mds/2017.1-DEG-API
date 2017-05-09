import { thinky, type } from '../db'
import Form from './form'
import Forum from './forum'
import Notification from './notification'

var Coordinator = thinky.createModel('Coordinator', {
  name: type.string().required(),
  email: type.string().required(),
  course: type.string().required(),
  registration: type.string().required(),
  password: type.string().required()
}, {
  pk: 'registration'
})

Coordinator.defineStatic("getView", function() {
    return this.without('password')
})

Form.hasAndBelongsToMany(Coordinator, 'coordinators', 'id', 'registration')
Coordinator.hasAndBelongsToMany(Form, 'forms', 'id', 'id')
Forum.hasAndBelongsToMany(Coordinator, 'coordinators', 'id', 'registration')
Coordinator.hasAndBelongsToMany(Forum, 'forums', 'registration', 'id')

Forum.hasMany(Form, 'forms', 'id', 'forumId')
Form.belongsTo(Forum, 'forum', 'forumId', 'id')
Notification.belongsTo(Forum, 'forum', 'forumId', 'id')
Forum.hasMany(Notification, 'notifications', 'id', 'forumId')

export default Coordinator
