import Forum from '../models/forum'

export default {
  model: Forum,
  items: [
    {
      id: "123456",
      date: "06/30/2017",
      hour: 36000,
      place: "CPD Darcy Ribeiro",
      schedules: "Discussão sobre a conveniência da criação de novos horários para o intercampi a fim de atender uma maior demanda de alunos",
      theme: "Criação de novos horários para o intercampi"
    },
    {
      date: "06/22/2017",
      hour: 50400,
      place: "CDT",
      schedules: "Matriz",
      theme: "Matriz"
    },
    {
    	theme: "Adventure Time",
    	date: "07/20/2017",
    	hour: 43200,
    	schedules: "O forum será sobre a grande obra prima de adventure time e a terra de Ooo",
    	place: "Na casa da árvore"
  	}
  ]
}
