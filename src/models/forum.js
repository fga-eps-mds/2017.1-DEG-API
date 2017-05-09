import { thinky, type } from '../db'
import Coordinator from './coordinator'

let Forum = thinky.createModel('Forum', {
  theme: [type.string()],
  date: type.date().required(),
  hour: type.number(),
  place: {
    room: type.string(),
    building: type.string()
  }
})

export default Forum
