'use strict'

const gulp = require('gulp')
const Nodemon = require('gulp-nodemon')
const Join = require('path').join
const Helper = require('unijas-task-helper')
const Spawn = require('child_process').spawn
const Exists = require('fs').statSync
let configFile = Join(process.cwd(), 'config', 'build.conf.json')
let cfg = Helper.readConfigFile(__dirname, configFile).runserver

function runDevMode (cfg, debug) {
  let nodemonCfg = cfg.nodemon

  if (debug) {
    nodemonCfg.exec = 'node --debug'
  }

  nodemonCfg.script = Helper.buildPathes(nodemonCfg.script)
  nodemonCfg.watch = Helper.buildPathes(nodemonCfg.watch)
  return Nodemon(nodemonCfg)
}
function runNodeInspector (cfg) {
  let cmd
  try {
    let localInspector = '../bin/node-inspector'
    Exists(localInspector)
    cmd = localInspector
  } catch (e) {
    cmd = 'node-inspector'
  }
  if (process.platform === 'win32') { cmd += '.cmd' }
  console.log(cfg)
  return Spawn(cmd, cfg.inspectorFlags)
}

gulp.task('runserver:dev', () => {
  if (cfg.debug) {
    process.env.NODE_ENV = 'debug'
  }
  switch (process.env.NODE_ENV) {
    case 'debug':
      let inspector = runNodeInspector(cfg)
      inspector.stdout.pipe(process.stdout)
      return runDevMode(cfg, true)
    default:
      return runDevMode(cfg)
  }
})

module.exports = gulp.tasks
