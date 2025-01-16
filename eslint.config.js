import eslint from '@antfu/eslint-config'

export default eslint({
  type: 'lib',
  rules: {
    'jsdoc/multiline-blocks': 'off',
    'style/spaced-comment': 'off',
    'style/brace-style': ['error', '1tbs', {
      allowSingleLine: false,
    }],
    'style/multiline-ternary': 'off',
  },
  ignores: [
    'test/snapshots',
  ],
})
