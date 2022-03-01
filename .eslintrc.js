module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['xo'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'capitalized-comments': 'off',
    'import/order': 'off',
    indent: ['error', 2],
    'no-template-curly-in-string': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': 'off',
    semi: ['error', 'never'],
    'spaced-comment': 'off',
  },
}
