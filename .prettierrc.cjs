module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  arrowParens: 'always',
  trailingComma: 'none',
  printWidth: 100,
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' }
    },
    {
      files: '.stylelintrc',
      options: { parser: 'json' }
    }
  ]
};
