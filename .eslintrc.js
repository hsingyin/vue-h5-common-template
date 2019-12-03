module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // 允许分号
    'semi': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
    // 允许尾逗号，IE8以下会报错
    'comma-dangle': 'off',
    // 生产环境不允许console.log()
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
