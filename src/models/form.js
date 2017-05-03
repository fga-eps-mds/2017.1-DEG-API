import { thinky, type } from '../db'

let Form = thinky.createModel('Form', {
  id: type.number().required(),
  question: type.string().required(),
  data: type.data()
})

export default Form
