import { thinky, type } from '../db'

var Form = thinky.createModel('Form', {
  discussive: [{
    question: type.string(),
    answer: type.string()
  }],
  multipleChoices: [{
    question: type.string(),
    options: [type.string()],
    answer: type.string()
  }]
})

export default Form
