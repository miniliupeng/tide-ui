import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import TideElement from '@tide-element/core'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(TideElement)
    useComponents(app)
  },
} as Theme
