'use strict'

const gulp = require('gulp')
const Nodemon = require('gulp-nodemon')
const Join = require('path').join

gulp.task('runserver', function () {
  let stream = Nodemon({
    script: Join(process.cwd(), 'index.js'),
    watch: [Join(process.cwd(), 'api'), Join(process.cwd(), 'index.js')],
    ext: 'js'
  })
  return stream
})

module.exports = gulp.tasks
