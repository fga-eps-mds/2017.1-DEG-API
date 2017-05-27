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
describe("Coordinator Tests", function () {
  before(done => {
    setTimeout(function () {
      runningServer = server
      done()
    }, 1000);
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

  describe('Coordinator', function () {
    it('should get all coordinators', (done) => {
      chai.request(runningServer)
      .get('/api/coordinators')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(4)
        done()
      })
    })

    it('should get one coordinator', (done) => {
      chai.request(runningServer)
      .get('/api/coordinators/123456789')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.name.should.be.eql('Finn, The Human')
        done()
      })
    })

    it('should not get one coordinator', (done) => {
      chai.request(runningServer)
      .get('/api/coordinators/123')
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.have.property('error')
        done()
      })
    })

    it('it should not post a coordinator without email field', (done) => {
      let coordinator = {
        coordinator: {
          course: 'Engenharia de Software',
          name: 'Vitor Bertulucci',
          password: 'Vb1234567',
          registration: '12345678'
        }
      }

      chai.request(runningServer)
      .post('/api/coordinators')
      .send(coordinator)
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        // res.body.message.should.be.eql('Coordenador não encontrado')
        res.body.success.should.be.eql(false)
        done()
      })
    })

    it('it should post a coordinator', (done) => {
      let coordinator = {
        coordinator:{
          course: 'Engenharia de Software',
          name: 'Vitor Bertulucci',
          password: 'Vb1234567',
          email: 'vitor@b.com',
          registration: '12345678'
        }
      }

      chai.request(runningServer)
      .post('/api/coordinators')
      .send(coordinator)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.result.should.have.property('course')
        res.body.result.should.have.property('name')
        res.body.result.should.have.property('password')
        res.body.result.should.have.property('email')
        res.body.result.should.have.property('registration')
        res.body.success.should.be.eql(true)
        done()
      })      
    })

    it('it should update a coordinator given the registration', (done) => {
      chai.request(runningServer)
      .put('/api/coordinators/111222333')
      .send({coordinator: {registration: '12345'}})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.result.should.have.property('registration').eql('12345')
        done()
      })
    })

    it('should not update one coordinators', (done) => {
      chai.request(runningServer)
      .put('/api/coordinators/123')
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.have.property('error')
        res.body.success.should.be.eql(false)
        done()
      })
    })

    it('it should delete a coordinator given the registration', (done) => {
      chai.request(runningServer)
      .delete('/api/coordinators/123456789')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.success.should.be.eql(true)
        done()
      })
    })

    it('should not delete one coordinator given the registration', (done) => {
      chai.request(runningServer)
      .delete('/api/coordinators/123')
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.have.property('error')
        res.body.success.should.be.eql(false)
        done()
      })
    })

    it('it should post a presence of the coordinator in the forum', (done) => {
      chai.request(runningServer)
      .post('/api/coordinators/123456789/forum/123456')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.result.should.have.property('isFulfilled').eql(false)
        res.body.result.should.have.property('isRejected').eql(false)
        res.body.success.should.be.eql(true)
        done()
      })      
    })

    it('it should not post a presence of the coordinator in the forum', (done) => {
      chai.request(runningServer)
      .post('/api/coordinators/123/forum/123')
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.have.property('error')
        res.body.success.should.be.eql(false)
        done()
      })
    })

    it('it should get a presence of the coordinator in the forum', (done) => {
      chai.request(runningServer)
      .get('/api/coordinators/123456789/forum/123456')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.be.eql(true)
        done()
      })
    })

    it('it should not get a presence of the coordinator in the forum', (done) => {
      chai.request(runningServer)
      .get('/api/coordinators/123/forum/123')
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.have.property('error')
        done()
      })
    })

    it('it should delete a presence of the coordinator in the forum', (done) => {
      chai.request(runningServer)
      .delete('/api/coordinators/123456789/forum/123456')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.success.should.be.eql(true)
        done()
      })
    })

    it('it should not delete a presence of the coordinator in the forum', (done) => {
      chai.request(runningServer)
      .delete('/api/coordinators/123/forum/123')
      .end((err, res) => {
        res.should.have.status(401)
        res.body.should.have.property('error')
        res.body.success.should.be.eql(false)
        done()
      })
    })

  })
})