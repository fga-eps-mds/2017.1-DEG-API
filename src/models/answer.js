import { thinky, type } from '../db'
import Form from './form'
import Coordinator from './coordinator'

var Answer = thinky.createModel('Answer', {
    discursiveAnswers: [{
        question: type.string(),
        answer: type.string()
    }],
    multipleChoiceAnswers: [{
        question: type.string(),
        answers: [type.string()]
    }]
})

Coordinator.hasMany(Answer, 'answers', 'registration', 'id')
Answer.belongsTo(Coordinator, 'coordinator', 'id', 'registration')
Form.hasMany(Answer, 'answers', 'id', 'id')
Answer.belongsTo(Form, 'form', 'id', 'id')

export default Answer