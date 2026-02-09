import globals from 'globals'
import typescriptLint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue'

export default typescriptLint.config({
  files: [
    'src/**/*.{ts,vue,js,tsx,jsx}'
  ],

  extends: [
    ...typescriptLint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
  ],

  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  languageOptions: {
    sourceType: 'module',
    globals: {
      ...globals.browser
    }
  },
})
