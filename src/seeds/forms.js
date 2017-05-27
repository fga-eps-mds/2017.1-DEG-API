import Form from '../models/form'

export default {
  model: Form,
  items: [
    {
      id: "1",
      title: "Formulário 1",
      multipleChoices: [
        {
          question: "Qual melhor opção?",
          multiple_anwsers: false,
          options: [
            "Essa",
            "Aquela"
          ],
        }
      ],
      discussive: [
        {
          question: "Será que funfa?"
        }
      ]
    },
    {
      title: "Formulário 2",
      multipleChoices: [
        {
          question: "Qual é melhor opção?",
          multiple_anwsers: true,
          options: [
            "Aquela outra",
            "Sei não"
          ],
        }
      ],
      discussive: [
        {
          question: "Qual sua opnião?"
        }
      ]
    },
  ]
}
