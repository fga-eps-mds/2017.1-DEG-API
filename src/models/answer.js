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

Coordinator.hasMany(Answer, 'answer', 'registration', 'id')
Answer.belongsTo(Coordinator, 'coordinators', 'id', 'registration')
Form.hasMany(Answer, 'answer', 'id', 'id')
Answer.belongsTo(Form, 'forms', 'id', 'id')

export default Answer