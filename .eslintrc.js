module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-plusplus': 'off',
    'func-names': 'off',
    'import/no-unresolved': 'off',
    "indent": [2],
    "no-tabs": 0,
    "global-require": 0,
    "no-underscore-dangle": 0
  },
};
