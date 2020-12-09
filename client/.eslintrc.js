module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true,
    es6: true,
    mocha: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'eslint:recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['react'],
  rules: {},
};
