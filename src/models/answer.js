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
    }],
    formId: type.string(),
    coordinatorRegistration: type.string()
})

Coordinator.hasMany(Answer, 'answers', 'registration', 'coordinatorRegistration')
Answer.belongsTo(Coordinator, 'coordinator', 'coordinatorRegistration', 'registration')
Form.hasMany(Answer, 'answers', 'id', 'formId')
Answer.belongsTo(Form, 'form', 'formId', 'id')

export default Answer
