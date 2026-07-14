import antfu from '@antfu/eslint-config';

export default antfu(
  {
    formatters: true,
    stylistic: {
      semi: true,
    },
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
    test: {
      overrides: {
        'test/padding-around-after-all-blocks': 'error',
        'test/padding-around-after-each-blocks': 'error',
        'test/padding-around-before-all-blocks': 'error',
        'test/padding-around-before-each-blocks': 'error',
        'test/padding-around-describe-blocks': 'error',
        'test/padding-around-test-blocks': 'error',
      },
    },
  },
  {
    files: ['e2e/**'],
    rules: {
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-call': 'off',
      'ts/no-unsafe-member-access': 'off',
    },
  },
  {
    files: ['entrypoints/**/main.ts'],
    rules: {
      'ts/no-unsafe-argument': 'off',
    },
  },
  {
    files: ['core/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [{ name: 'vue', message: 'core/ is framework-free — keep Vue out of it.' }],
          patterns: [{
            group: ['vue/*', '@vue/*', '@vueuse/*'],
            message: 'core/ is framework-free — keep Vue out of it.',
          }],
        },
      ],
    },
  },
);
