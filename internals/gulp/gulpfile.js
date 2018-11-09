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
  BUILD_EXAMPLE: 'build:example',
  CLEAN: 'clean',
  CLEAN_DOCS: 'clean:docs',
  DEV_EXAMPLE: 'dev:example',
  WEBPACK_EXAMPLE: 'webpack:example',
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

gulp.task(Task.CLEAN_DOCS, () => {
  buildLog(Task.CLEAN_DOCS, 'cleaning docs at: %s', paths.docs);

  return del([
    `${paths.docs}/**/*`,
  ]);
});

gulp.task(Task.WEBPACK_EXAMPLE, (done) => {
  const webpackConfig = require('../webpack/webpack.example.config');

  buildLog(
    Task.BUILD_EXAMPLE, 
    'EXAMPLE_PATH: %s,\nwebpackConfig: %o', 
    './examples', 
    webpackConfig,
  );

  const compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    if (err) {
      console.error('error while compiling', err);
      done(err);
    } else {
      const info = stats.toString({
        colors: true,
      });
      console.info('webpack compilation done: %s', info);
      done();
    }
  })
});

gulp.task(Task.DEV_EXAMPLE, (done) => {
  const PORT = 6001;
  const webpackConfig = require('../webpack/webpack.example.config');

  buildLog(
    Task.DEV_EXAMPLE, 
    'EXAMPLE_PATH: %s,\nwebpackConfig: %o', 
    './examples', 
    webpackConfig,
  );

  const compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {
    contentBase: paths.public,
    hot: true,
  })
    .listen(PORT, 'localhost', (err) => {
      console.log('[webpack] contentBase: %s, port: %s', paths.public, chalk.red(PORT));
      
      if (err) {
        console.error(err);
      }
    });
});

gulp.task(Task.BUILD, gulp.series(Task.CLEAN, Task.BABEL));

gulp.task(Task.BUILD_EXAMPLE, gulp.series(Task.CLEAN_DOCS, Task.WEBPACK_EXAMPLE));
