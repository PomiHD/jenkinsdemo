// eslint.config.mjs
import globals from 'globals'
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  // 基础忽略配置
  {
    ignores: ['dist/**', '**/node_modules/**', '.git/**', '*.config.js', 'public/**']
  },

  // JavaScript 通用配置
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        React: 'readonly',
        JSX: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    }
  },

  // 核心规则集
  js.configs.recommended,
  react.configs.flat.recommended,

  // React 插件配置
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      // 允许不声明 propTypes
      'react/prop-types': 'off', // 若需要严格校验则设为 "error"
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    },
    settings: {
      react: {
        version: 'detect',
        pragma: 'React',
        fragment: 'Fragment'
      }
    }
  },

  // Prettier 集成
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': ['error']
    }
  }
]
