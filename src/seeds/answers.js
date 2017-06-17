import Answer from '../models/answer'

export default {
  model: Answer,
  items: [
    {
			formId: '1',
			coordinatorRegistration: '222333444',
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
  	},
		{
			formId: '1',
			coordinatorRegistration: '111222333',
  	  discursiveAnswers: [
  	    {
  	      question: "Será que funfa?",
  	      answer: "Não sei"
  	    }
  	  ],
  	  multipleChoiceAnswers: [
  	    {
  	      question: "Qual melhor opção?",
  	      answers: [ "Essa" ]
  	    }
  	  ]
  	},
		{
			formId: '1',
			coordinatorRegistration: '333444555',
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
