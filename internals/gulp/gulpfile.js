(function changeCurrentWorkingDirectoryToResolveNodeModulesPath() {
  process.chdir('../../');
  console.info('[gulpfile] Current working directory %s', process.cwd());
})();

const babel = require('gulp-babel');
const chalk = require('chalk');
const del = require('del');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const util = require('util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const babelRc = require('../babel/.babelrc');
const paths = require('../../src/paths');

const buildLog = (tag, ...args) => {
  console.info(chalk.cyan(`[build - ${tag}]`), util.format(...args));
};

const Task = {
  BABEL: 'babel',
  BUILD: 'build',
  CLEAN: 'clean',
  EXAMPLE: 'example',
};

gulp.task(Task.BABEL, () => {
  buildLog(
    Task.BABEL,
    'NODE_ENV: %s, LIB_PATH: %s, SRC_PATH: %s',
    process.env.NODE_ENV, 
    paths.output,
    paths.source,
  );

  return gulp.src([`${paths.source}/**/*.{js,jsx,ts,tsx}`])
    .pipe(sourcemaps.init())
    .pipe(babel(babelRc))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.output));
});

gulp.task(Task.CLEAN, () => {
  buildLog(Task.CLEAN, 'LIB_PATH: %s', paths.output);

  return del([
    `${paths.output}/**/*`,
  ]);
});

gulp.task(Task.EXAMPLE, (done) => {
  const webpackConfig = require('../webpack/webpack.example.config');
  buildLog(
    Task.EXAMPLE, 
    'EXAMPLE_PATH: %s,\nwebpackConfig: %o', 
    './examples', 
    webpackConfig,
  );

  const compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {
    contentBase: paths.public,
    hot: true,
  })
    .listen(6001, 'localhost', (err) => {
      console.log('[webpack] contentBase: %s', paths.public);
      
      if (err) {
        console.error(err);
      }
    });
});

gulp.task(Task.BUILD, gulp.series(Task.CLEAN, Task.BABEL));
