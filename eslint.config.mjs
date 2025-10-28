import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    ignores: ['node_modules'],
  },
  ...tseslint.configs.recommended,
  // Disable ESLint formatting rules that conflict with Prettier
  eslintConfigPrettier,
  // Enable Prettier as an ESLint rule
  {
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
];
