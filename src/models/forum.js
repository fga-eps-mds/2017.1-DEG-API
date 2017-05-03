import { thinky, type } from '../db'

let Forum = thinky.createModel('Forum', {
  id: type.number().required(),
  theme: [type.string()].required(),
  data: type.data(),
  hour: type.number(),
  place: {
    room: type.string(),
    building: type.string()
  }
})

export default Forum
