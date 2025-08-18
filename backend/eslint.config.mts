import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: 'off',
      // 👇 এখানে ঠিক করলাম
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  {
    ignores: ['node_modules/*'], // 👈 ".node_modules" না, শুধু node_modules
  },
  eslintPluginPrettierRecommended,
  tseslint.configs.recommended,
])
