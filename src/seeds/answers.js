import Answer from '../models/answer'

export default {
  model: Answer,
  items: [
    {
  	  discursiveAnswers: [
  	    {
  	      question: "Será que funfa?",
  	      answer: "Talvez"
  	    }
  	  ],
  	  multipleChoiceAnswers: [
  	    {
  	      question: "Qual melhor opção?",
  	      answers: [ "Aquela" ]
  	    }
  	  ]
  	}
  ]
}
