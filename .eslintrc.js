module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    semi: ['error', 'always']
  },
  globals: {
    OrgChart: true,
    jquery: true,
    $: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
