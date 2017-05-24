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
      .end((err, res) =>{
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(2)
        done()
      })
    })

    it('should get one administrator', (done) => {
      chai.request(runningServer)
      .get('/api/administrators/87654321')
      .end((err, res) =>{
        res.should.have.status(200)
        res.body.result.name.should.be.eql('Jake, The Dog')
        done()
      })
    })

  })

})
