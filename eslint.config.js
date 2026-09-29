import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'build', '.react-router']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // 大寫開頭的變數／參數多半是只在 JSX 裡使用的元件（如 <Icon />），核心規則看不到 JSX 用法
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]' }],
      // 頁面檔除了元件，還會匯出 React Router 規定的 meta、loader 等，這些不影響熱更新
      'react-refresh/only-export-components': [
        'warn',
        { allowExportNames: ['meta', 'links', 'loader', 'headers', 'Layout', 'ErrorBoundary', 'HydrateFallback'] },
      ],
    },
  },
  {
    // Node 環境：後端與建置設定檔（使用 process / Buffer 等 Node 全域）
    files: ['server/**/*.js', 'scripts/**/*.js', 'vite.config.js', 'react-router.config.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Express 錯誤處理中介層需保留 next 參數；忽略未使用的函式參數
      'no-unused-vars': ['error', { argsIgnorePattern: '^_|^next$', varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
