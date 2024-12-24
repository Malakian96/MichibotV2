// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    // Add ignore patterns
    ignores: ['node_modules/', 'dist/', '*.config.js'],
    // Add custom rules
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ignore unused vars starting with "_"
      '@typescript-eslint/no-explicit-any': 'off'
    },
}
);