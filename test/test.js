import request from 'supertest'
import fs from 'fs'
import path from 'path'
import 'should'
import app from '../src'

describe('HTTP APP TEST', () => {
  describe('Koa GET /', () => {
    it('should 200', (done) => {
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
          res.text.should.equal("<!DOCTYPE html>\n<html>\n  <head>\n    <title>koa2 title</title>\n    <link rel='stylesheet' href='/static/stylesheets/style.css' />\n  </head>\n  <body>\n    <h1>koa2 title</h1>\n    <p>EJS Welcome to koa2 title</p>\n  </body>\n</html>\n")
          done()
        })
    })
  })

  describe('Koa Static, GET /static/stylesheets/style.css', () => {
    it('should 200', (done) => {
      const styleCssContent = fs.readFileSync(path.join(__dirname, '../public/static/stylesheets/style.css'), 'utf-8')
      request(app.listen())
        .get('/static/stylesheets/style.css')
        .set('Accept', 'application/text')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            throw new Error(err)
          }
          // console.log(res)
          res.status.should.equal(200)
          // console.log(res.text)
          res.text.should.equal(styleCssContent)
          done()
        })
    })
  })

  describe('GET /pathNotMatchAny', () => {
    it('should 404', (done) => {
      request(app.listen())
        .get('/pathNotMatchAny')
        .set('Accept', 'application/text')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            throw new Error(err)
          }
          // console.log(res)
          res.status.should.equal(404)
          done()
        })
    })
  })
})
