#!/usr/bin/env node
// debug 还是实验性功能
var path = require('path')
var babelCliDir = require('babel-cli/lib/babel/dir')
require('colors')
console.log('>>> [DEBUG]: Debug Mode is an expiremental feature'.cyan)
console.log('>>> [DEBUG]: Compiling...'.green)
babelCliDir({ outDir: 'app/', retainLines: true, sourceMaps: true }, [ 'src/' ]) // compile all when start

try {
  require(path.join(__dirname, '../app'))
} catch (e) {
  if (e && e.code === 'MODULE_NOT_FOUND') {
    console.log('>>> [DEBUG]: run `npm compile` first!')
    process.exit(1)
  }
  console.log('>>> [DEBUG]: App started with error and exited'.red, e)
  process.exit(1)
}

console.log('>>> [DEBUG]: App started in debug mode'.green)
