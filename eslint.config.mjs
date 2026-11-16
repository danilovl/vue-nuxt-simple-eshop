import pluginVue from 'eslint-plugin-vue'
import vueTsConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue,ts,tsx,cts,mts}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/.nuxt/**', '**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/.output/**', '**/node_modules/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsConfig(),
  skipFormatting,

  {
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]
