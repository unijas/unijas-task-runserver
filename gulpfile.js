'use strict'

const gulp = require('gulp')
const Nodemon = require('gulp-nodemon')
const Join = require('path').join
const Helper = require('unijas-task-helper')

let configFile = Join(process.cwd(), 'config', 'build.conf.json')
let cfg = Helper.readConfigFile(__dirname, configFile).runserver
gulp.task('runserver', function () {
  let nodemonCfg = cfg.nodemon
  nodemonCfg.script = Helper.buildPathes(nodemonCfg.script)
  nodemonCfg.watch = Helper.buildPathes(nodemonCfg.watch)
  return Nodemon(nodemonCfg)
})

module.exports = gulp.tasks
