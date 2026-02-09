import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/public/**',
      'src/sitemap/sitemap.js',
      'src/env.d.ts',
    ],
  },

  ...pluginVue.configs['flat/recommended'],

  /**
   * The TypeScript lint settings
   */
  {
    basePath: 'src',
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  /**
   * These are the Vue lint settings
   */
  {
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue,
    },
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      }
    },
  },

  /**
   * The global variables and language options
   */
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'vue/no-v-html': [
        'error',
        {
          ignorePattern: '^sanitizedHtml',
        },
      ],
      //   '@typescript-eslint/no-explicit-any': 'warn',
      //   'no-unused-vars': 'off',
      //   '@typescript-eslint/no-unused-vars': [
      //     'warn',
      //     {
      //       argsIgnorePattern: '^_',
      //       varsIgnorePattern: '^_',
      //     },
      //   ],
      //   '@typescript-eslint/no-unsafe-assignment': 'warn',
      //   '@typescript-eslint/no-unsafe-member-access': 'warn',
      //   '@typescript-eslint/no-unsafe-call': 'warn',
      //   '@typescript-eslint/no-unsafe-return': 'warn',
      //   '@typescript-eslint/no-floating-promises': 'warn',
      //   '@typescript-eslint/await-thenable': 'warn',
      //   '@typescript-eslint/no-unsafe-argument': 'warn',
  }
  },
  prettierConfig,
);
