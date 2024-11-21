import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Target files to lint
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },

  // Global settings for the environment
  {
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
      },
    },
  },

  // Ignored directories and files
  {
    ignores: ['.node_modules/*', '.dist'],
  },

  // ESLint rules
  {
    rules: {
      eqeqeq: 'off', // Disable strict equality checks
      'no-unused-vars': 'error', // Report unused variables
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }], // Enforce using const when possible
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
