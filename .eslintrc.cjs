/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  "vue/multi-word-component-names": ["error", {
    "ignores": []
  }],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
