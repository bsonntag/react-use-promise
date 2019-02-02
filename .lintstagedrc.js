module.exports = {
  linters: {
    '*.js': [
      'eslint --fix',
      'git add'
    ],
    'package.json': [
      'sort-package-json',
      'git add'
    ],
    'src/*.js': 'jest --findRelatedTests'
  }
};
