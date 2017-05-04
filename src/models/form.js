import { thinky, type } from '../db'

var Form = thinky.createModel('Form', {
  question: type.string().required(),
  date: type.date()
})


export default Form
