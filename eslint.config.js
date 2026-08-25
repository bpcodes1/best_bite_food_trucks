import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // The SSR prerender entry (scripts/prerender.mjs) is never loaded by the
    // dev server's Fast Refresh client bundle, so its non-component exports
    // (render, PAGE_META, getLocalBusinessSchema) are fine.
    files: ['src/entry-server.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
]);
