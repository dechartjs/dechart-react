"use strict";

var fs = require('fs');

var path = require('path');

var ROOT_PATH = fs.realpathSync(process.cwd());

(function checkIfCurrentWorkingDirectoryIsCorrect() {
  console.info('ROOT_PATH', ROOT_PATH);
  var pJson = fs.existsSync("".concat(ROOT_PATH, "/package.json"));

  if (!pJson) {
    console.error("\nCurrent working directory might not be the project root directory.\nDid you call process.chdir() properly?");
    process.exit(0);
  }
})();

module.exports = {
  docs: path.resolve(ROOT_PATH, 'docs'),
  examples: path.resolve(ROOT_PATH, 'examples'),
  output: path.resolve(ROOT_PATH, 'lib'),
  public: path.resolve(ROOT_PATH, 'examples/public'),
  source: path.resolve(ROOT_PATH, 'src'),
  webpack: path.resolve(ROOT_PATH, 'internals/webpack')
};
//# sourceMappingURL=paths.js.map
