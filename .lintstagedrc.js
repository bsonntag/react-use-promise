module.exports = {
  linters: {
    '*.js': [
      'eslint --fix',
      'git add'
    ],
    'package.json': 'sort-package-json',
    'src/*.js': 'jest --findRelatedTests'
  }
};
