import chai from 'chai'
import server from '../server'
import chaiHttp from 'chai-http'
import * as seed from '../seeds/seeds'

let should = chai.should()

chai.use(chaiHttp)

const response = {
  status: function () {},
  end: function () {},
  send: function () {}
}
let runningServer
describe("Forum Tests", function () {
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

  describe('Forum', function () {
    it('should get all forums', (done) => {
      chai.request(runningServer)
      .get('/api/forums')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(3)
        done()
      })
    })

    it('should get one forum', (done) => {
      chai.request(runningServer)
      .get('/api/forums/123456')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.result.theme.should.be.eql('Criação de novos horários para o intercampi')
        done()
      })
    })

    it('it should not post a forum without date field', (done) => {
      let forum = {
        forum: {
          place: 'CPD Darcy Ribeiro',
          schedules: 'Internet do Campus'
        }
      }

      chai.request(runningServer)
      .post('/api/forums')
      .send(forum)
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.success.should.be.eql(false)
        done()
      })
    })

    it('it should post a forum', (done) => {
      let forum = {
        forum: {
          place: 'CPD Darcy Ribeiro',
          schedules: 'Internet do Campus',
          date: '24/01/1999'
        }
      }

      chai.request(runningServer)
      .post('/api/forums')
      .send(forum)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.result.should.have.property('place')
        res.body.result.should.have.property('schedules')
        res.body.result.should.have.property('date')
        res.body.success.should.be.eql(true)
        done()
      })
    })

    it('it should update a forum given the id', (done) => {
      chai.request(runningServer)
      .put('/api/forums/123456')
      .send({forum: {id: '6544321'}})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.result.should.have.property('registration').eql('654321')
        done()
      })
    })

    it('it should delete a forum given the id', (done) => {
      chai.request(runningServer)
      .delete('/api/forums/123456')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.success.should.be.eql(true)
        done()
      })
    })

  })

})
