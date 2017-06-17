import chai from 'chai'
import server from '../server'
import chaiHttp from 'chai-http'
import * as seed from '../seeds/seeds'

let should = chai.should()
let expect = chai.expect()

chai.use(chaiHttp)

const response = {
  status: function () {},
  end: function () {},
  send: function () {}
}
let runningServer
describe("Form Tests", function () {
  before(done => {
    setTimeout(function () {
      runningServer = server
      done()
    }, 1000)
  })

  beforeEach((done) => {
    (async () => {
      var result = await seed.main('--no-kill')
      done()
    })()
  })

  after (done => {
    // limpar o banco
    done()
  })

  describe('Form', function () {
    it('should get all forms', (done) => {
      chai.request(runningServer)
      .get('/api/forms')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(3)
        done()
      })
    })

    it('should get one form', (done) => {
      chai.request(runningServer)
      .get('/api/forms/1')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.result.title.should.be.eql('Formulário 1')
        done()
      })
    })

    it('it should not post a form without title field', (done) => {
      let form = {
        form: {
          discussive: [{
            question: "Questão 1?",
            answer: "Resposta 1"
          }],
          multipleChoices: [{
            question: "Questão 2?",
            options: ["A", "B", "C", "D"],
            answer: "A"
          }]
        }
      }

      chai.request(runningServer)
      .post('/api/forms')
      .send(form)
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.success.should.be.eql(false)
        done()
      })
    })

    it('it should post a form', (done) => {
      let form = {
        form: {
          title: "Formulário 5",
          discussive: [{
            question: "Questão 1?",
            answer: "Resposta 1"
          }],
          multipleChoices: [{
            question: "Questão 2?",
            options: ["A", "B", "C", "D"],
            answer: "A"
          }]
        }
      }

      chai.request(runningServer)
      .post('/api/forms')
      .send(form)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.result.should.have.property('title')
        res.body.result.should.have.property('discussive')
        res.body.result.should.have.property('multipleChoices')
        res.body.result.should.have.property('id')
        res.body.success.should.be.eql(true)
        done()
      })
    })

    it('it should post a form with date in format MM/DD/YYYY', (done) => {
      let form = {
        form: {
          title: "Formulário 6",
          expiration_date: "06/03/2017",
          discussive: [{
            question: "Questão 1?",
            answer: "Resposta 1"
          }],
          multipleChoices: [{
            question: "Questão 2?",
            options: ["A", "B", "C", "D"],
            answer: "A"
          }]
        }
      }

      chai.request(runningServer)
      .post('/api/forms')
      .send(form)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.result.should.have.property('title')
        res.body.result.should.have.property('expiration_date')
        res.body.result.should.have.property('discussive')
        res.body.result.should.have.property('multipleChoices')
        res.body.result.should.have.property('id')
        res.body.success.should.be.eql(true)
        done()
      })
    })

    it('it should not post a form with date in format DD/MM/YYYY', (done) => {
      let form = {
        form: {
          title: "Formulário 6",
          expiration_date: "26/12/2017",
          discussive: [{
            question: "Questão 1?",
            answer: "Resposta 1"
          }],
          multipleChoices: [{
            question: "Questão 2?",
            options: ["A", "B", "C", "D"],
            answer: "A"
          }]
        }
      }

      chai.request(runningServer)
      .post('/api/forms')
      .send(form)
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.success.should.be.eql(false)
        done()
      })
    })

    it('it should update a form given the id', (done) => {
      chai.request(runningServer)
      .put('/api/forms/1')
      .send({form: {id: '1'}})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.result.should.have.property('id').eql('1')
        done()
      })
    })

    it('it should update a form given the expiration date', (done) => {
      chai.request(runningServer)
      .put('/api/forms/1')
      .send({form: {expiration_date: '12/20/2018'}})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        var date = new Date('12/20/2018')
        res.body.result.should.have.property('expiration_date')
        done()
      })
    })

    it('it should not update a form given an invalid date', (done) => {
      chai.request(runningServer)
      .put('/api/forms/1')
      .send({form: {expiration_date: '20/12/2018'}})
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.success.should.be.eql(false)
        done()
      })
    })

    it('it should delete a form given the id', (done) => {
      chai.request(runningServer)
      .delete('/api/forms/1')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.success.should.be.eql(true)
        done()
      })
    })

  })
  describe('Form Answer', function () {
    it('it should return the result of a form multiple questions correctly', (done) => {
      chai.request(runningServer)
      .get('/api/forms/1/results')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.be.eql(true)
        res.body.result['Qual melhor opção?']['Aquela'].should.be.eql(2/3)
        done()
      })
    })

    it('it should return error to unexisting form', (done) => {
      chai.request(runningServer)
      .get('/api/forms/10/results')
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.success.should.be.eql(false)
        res.body.error.should.be.eql("Formulário não encontrado.")
        done()
      })
    })

    it('it should return 0 in result for form without answers', (done) => {
      chai.request(runningServer)
      .get('/api/forms/2/results')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.be.eql(true)
        res.body.result['Qual é melhor opção?']['Sei não'].should.be.eql(0)
        res.body.result['Qual é melhor opção?']['Aquela outra'].should.be.eql(0)
        done()
      })
    })
  })
})
