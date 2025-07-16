/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-styled-syntax',
  rules: {
    'block-no-empty': true,
    'comment-empty-line-before': null,
    'selector-not-notation': null,
  },
}
