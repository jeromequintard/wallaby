module.exports = function(wallaby) {
  return {
    files: [
      'src/**/*.js?(x)',
      '!src/**/*.spec.js?(x)',
    ],
    tests: [
      'src/**/*.spec.js?(x)',
    ],
    env: {
      type: 'node',
      runner: 'node',
    },
    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel(),
    },
    testFramework: 'jest',
    debug: true,

    setup: (wallaby) => {
      const conf = require('./package.json').jest;

      conf.moduleNameMapper['^lib/(.*)$'] = conf.moduleNameMapper['^lib/(.*)$'].replace('<rootDir>', wallaby.projectCacheDir);
      conf.moduleNameMapper['^components/(.*)'] = conf.moduleNameMapper['^components/(.*)'].replace('<rootDir>', wallaby.projectCacheDir);

      wallaby.testFramework.configure(conf);
    },
  };
};
