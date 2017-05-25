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
describe("Admininistrator Tests", function () {
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

  describe('User', function () {
    it('it should post a admin', (done) => {
      let adminLogin = {
        password: 'Pb1234567',
        registration: '12345678'
      }

      chai.request(runningServer)
      .post('/api/users/authenticate')
      .send(adminLogin)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.administrator.should.have.property('name')
        res.body.administrator.should.have.property('password')
        res.body.administrator.should.have.property('email')
        res.body.administrator.should.have.property('registration')
        res.body.user.should.be.eql('administrator')
        res.body.success.should.be.eql(true)
        done()
      })
    })

    it('it should post a coordinator', (done) => {
      let coordinatorLogin = {
        password: 'Pb1234567',
        registration: '123456789'
      }

      chai.request(runningServer)
      .post('/api/users/authenticate')
      .send(coordinatorLogin)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.coordinator.should.have.property('course')
        res.body.coordinator.should.have.property('email')
        res.body.coordinator.should.have.property('name')
        res.body.coordinator.should.have.property('password')
        res.body.coordinator.should.have.property('registration')
        res.body.user.should.be.eql('coordinator')
        res.body.success.should.be.eql(true)
        done()
      })
    })

    it('it should not post a user without register', (done) => {
      let userNull = {
        password: '0000',
        registration: '000'
      }

      chai.request(runningServer)
      .post('/api/users/authenticate')
      .send(userNull)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.user.should.be.eql('null')
        res.body.success.should.be.eql(false)
        done()
      })
    })
  })
})
