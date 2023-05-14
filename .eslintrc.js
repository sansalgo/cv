module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true
  },
  extends: ['next/core-web-vitals', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './jsconfig.json',
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/display-name': 'off',
    'import/no-anonymous-default-export': 'off'
  }
}
