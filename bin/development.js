#!/usr/bin/env node
var path = require('path')
var fs = require('fs')
var cp = require('child_process')
require('colors')

var babelCliDir = require('babel-cli/lib/babel/dir')
var babelCliFile = require('babel-cli/lib/babel/file')
console.log('>>> [DEV]: Compiling...'.green)
babelCliDir({ outDir: 'app/', retainLines: true, sourceMaps: true }, [ 'src/' ]) // compile all when start

var files = getFilesFromDir(path.join(__dirname, '../src'), true)
var fileMTimeMap = {}
files.forEach(function (file) {
  fileMTimeMap[file] = fs.statSync(path.join(__dirname, '../src', file)).mtime.getTime()
  checkChange(file)
})

var appIns = cp.fork(path.join(__dirname, '../app'))
console.log('>>> [DEV]: ♪ App Started'.green)
function checkChange (file) {
  var prevMTime = fileMTimeMap[file]
  var mTime = fs.statSync(path.join(__dirname, '../src', file)).mtime.getTime()
  if (prevMTime !== mTime) {
    compileFile('src/', 'app/', file)
    appIns.kill('SIGTERM')
    appIns = cp.fork(path.join(__dirname, '../app'))
    console.log('>>> [DEV]: ♬ App Restarted...'.red)
    fileMTimeMap[file] = mTime
  }
  setTimeout(checkChange.bind(null, file), 200)
}

function compileFile (srcDir, outDir, filename) {
  var outFile = path.join(outDir, filename)
  var srcFile = path.join(srcDir, filename)
  try {
    babelCliFile({
      outFile: outFile,
      retainLines: true,
      highlightCode: true,
      comments: true,
      babelrc: true,
      sourceMaps: true
    }, [ srcFile ], { highlightCode: true, comments: true, babelrc: true, ignore: [], sourceMaps: true })
  } catch (e) {
    console.error('Error while compiling file %s', filename, e)
    return
  }
  console.log(srcFile + ' -> ' + outFile)
}

function isString (str) {
  return Object.prototype.toString.call(str) === '[object String]'
}

function getFilesFromDir (dir, prefix, filter) {
  dir = path.normalize(dir)
  if (!fs.existsSync(dir)) {
    return []
  }

  if (!isString(prefix)) {
    filter = prefix
    prefix = ''
  }

  if (filter === true) {
    filter = item => {
      return item[0] !== '.'
    }
  }
  prefix = prefix || ''
  var files = fs.readdirSync(dir)
  var result = []
  files.forEach(item => {
    var stat = fs.statSync(dir + path.sep + item)
    if (stat.isFile()) {
      if (!filter || filter(item)) {
        result.push(prefix + item)
      }
    } else if (stat.isDirectory()) {
      if (!filter || filter(item, true)) {
        var cFiles = getFilesFromDir(dir + path.sep + item, prefix + item + path.sep, filter)
        result = result.concat(cFiles)
      }
    }
  })
  return result
}

process.on('SIGINT', function (e) {
  appIns.kill('SIGTERM')
  console.log('>>> [DEV]: ♫ App Quit'.red)
  process.exit(0)
})
