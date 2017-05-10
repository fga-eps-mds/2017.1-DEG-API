import { thinky, type } from '../db'
import Coordinator from './coordinator'

let Forum = thinky.createModel('Forum', {
  theme: type.string(),
  date: type.date().required(),
  hour: type.number(),
  schedules: type.string(),
  place: type.string()
  // place: {
  //   room: type.string(),
  //   building: type.string()
  // }
})

export default Forum
