import request from 'supertest'
import 'should'

import app from '../app'

describe('Koa GET /', () => {
  it('respond suceess', (done) => {
    request(app.listen())
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
