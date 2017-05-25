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

  describe('Administrator', function () {
    it('should get all administrators', (done) => {
      chai.request(runningServer)
      .get('/api/administrators')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(2)
        done()
      })
    })

    it('should get one administrator', (done) => {
      chai.request(runningServer)
      .get('/api/administrators/87654321')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.result.name.should.be.eql('Jake, The Dog')
        done()
      })
    })

    it('it should not post a admin without email field', (done) => {
      let admin = {
        administrator: {
          name: 'Vitor Bertulucci',
          password: 'Vb1234567',
          registration: '12345'
        }
      }

      chai.request(runningServer)
      .post('/api/administrators')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.success.should.be.eql(false)
        done()
      })
    })

    it('it should post a admin', (done) => {
      let admin = {
        administrator: {
          name: 'Vitor Bertulucci',
          password: 'Vb1234567',
          email: 'vitor@b.com',
          registration: '12345'
        }
      }

      chai.request(runningServer)
      .post('/api/administrators')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.result.should.have.property('name')
        res.body.result.should.have.property('password')
        res.body.result.should.have.property('email')
        res.body.result.should.have.property('registration')
        done()
      })
    })

    it('it should update a admin given the registration', (done) => {
      chai.request(runningServer)
      .put('/api/administrators/87654321')
      .send({administrator: {registration: '12345'}})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.result.should.have.property('registration').eql('12345')
        done()
      })
    })

    it('it should delete a admin given the id', (done) => {
      chai.request(runningServer)
      .delete('/api/administrators/87654321')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.success.should.be.eql(true)
        done()
      })
    })

  })

})
