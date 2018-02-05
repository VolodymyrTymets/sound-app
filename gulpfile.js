const { spawn } = require('child_process');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gutil = require('gulp-util');
const path = require('path');
const npmRun = require('npm-run');

const consoleLog = data => gutil.log(data.toString().trim());
gulp.task('server', () => nodemon({
  script: './server/bin/www',
  watch: ['./server'],
  env: {
    DEBUG: 'server:server',
    NODE_PATH: path.resolve(__dirname, 'server'),
    NODE_ENV: 'development',
    PORT: 3001
  },
}));

gulp.task('client',(done) =>
  npmRun.exec(
    'npm run start',
    {cwd: path.resolve(__dirname, 'client')},
    () => done()));


gulp.task('run:dev', gulp.parallel('client', 'server'));
