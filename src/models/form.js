import { thinky, type } from '../db'

var Form = thinky.createModel('Form', {
  title: type.string().required(),
  expiration_date: type.date().required(),
  discussive: [{
    question: type.string(),
    answer: type.string()
  }],
  multipleChoices: [{
    multiple_anwsers: type.boolean(),
    question: type.string(),
    options: [type.string()],
    answer: type.string()
  }]
})

export default Form
