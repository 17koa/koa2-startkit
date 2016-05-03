#!/usr/bin/env node
var path = require('path')

try {
  require(path.join(__dirname, '../app'))
} catch (e) {
  if (e && e.code === 'MODULE_NOT_FOUND') {
    console.log('run `npm compile` first!')
    process.exit(1)
  }
  console.log('app started with error and exited', e)
  process.exit(1)
}

console.log('app started in production mode')
