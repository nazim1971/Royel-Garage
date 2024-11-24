import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },

  {
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
      },
    },
  },

  {
    ignores: ['.node_modules/*', '.dist'],
  },

  // ESLint rules
  {
    rules: {
      eqeqeq: 'off', 
      'no-unused-vars': 'error', 
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }], 
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ], // Allow short-circuiting and ternary expressions
      'no-console': 'warn', // Warn on console usage
      'no-undef': 'error', // Prevent usage of undefined variables
    },
  },

  // Recommended JS rules
  pluginJs.configs.recommended,

  // Recommended TypeScript rules
  ...tseslint.configs.recommended,

  // Prettier config (disable conflicting rules)
  eslintConfigPrettier,
];
