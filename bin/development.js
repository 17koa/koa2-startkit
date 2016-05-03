#!/usr/bin/env node
var path = require('path')
require('colors')
var appPath = path.join(__dirname, './_base')
var nodemon = require('nodemon')
var startCount = 0

nodemon({
  script: appPath,
  watch: [path.join(__dirname, '../src')]
})

nodemon.on('start', function () {
  if (startCount === 0) {
    console.log('>>> Nodemon: ♪ App started in development mode'.green)
  }
}).on('quit', function () {
  console.log('>>> Nodemon: ♫ App has quit development mode'.red)
}).on('restart', function (files) {
  console.log('>>> Nodemon: ♬ App %dth restarted due to: %s'.red, ++startCount, path.relative(path.join(__dirname, '..'), files[0]))
})

process.on('SIGINT', function (e) {
  process.exit(0)
})
