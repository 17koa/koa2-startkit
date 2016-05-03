import request from 'supertest'
import 'should'
import app from '../app'

const appInstance = app.listen()

describe('Koa GET /', () => {
  it('respond suceess', (done) => {
    request(appInstance)
      .get('/')
      .set('Accept', 'application/text')
      .expect('Content-Type', /text/)
      .end((err, res) => {
        if (err) {
          throw new Error(err)
        }
        // console.log(res)
        res.status.should.equal(200)
        // console.log(res.text)
        res.text.should.equal("<!DOCTYPE html>\n<html>\n  <head>\n    <title>koa2 title</title>\n    <link rel='stylesheet' href='/stylesheets/style.css' />\n  </head>\n  <body>\n    <h1>koa2 title</h1>\n    <p>EJS Welcome to koa2 title</p>\n  </body>\n</html>\n")
        done()
      })
  })
})

describe('Koa Static', () => {
  it('get style.css', (done) => {
    request(appInstance)
      .get('/stylesheets/style.css')
      .set('Accept', 'application/text')
      .expect('Content-Type', /text/)
      .end((err, res) => {
        if (err) {
          throw new Error(err)
        }
        // console.log(res)
        res.status.should.equal(200)
        // console.log(res.text)
        res.text.should.equal('body {\n  padding: 50px;\n  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;\n}\n\na {\n  color: #00B7FF;\n}\n')
        done()
      })
  })
})
