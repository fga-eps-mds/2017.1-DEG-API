import { thinky, type } from '../db'

var Forum = thinky.createModel('Forum', {
  theme: [type.string()],
  date: type.date(),
  hour: type.number(),
  place: {
    room: type.string(),
    building: type.string()
  }
})

export default Forum
