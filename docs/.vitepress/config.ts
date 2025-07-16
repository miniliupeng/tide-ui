import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { demoBlockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/tide-element/',
  title: 'Tide Element',
  description: '一款vue3组件库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '快速开始', link: '/start' },
      { text: '组件', link: '/components/button' },
    ],
    search: {
      provider: 'local',
    },
    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [{ text: '快速开始', link: '/get-started' }],
      },
      {
        text: '基础组件',
        collapsed: false,
        items: [
          { text: 'Button 按钮', link: 'components/button' },
          { text: 'Collapse 折叠面板', link: 'components/collapse' },
          { text: 'Dropdown 下拉菜单', link: 'components/dropdown' },
        ],
      },
      {
        text: '反馈组件',
        collapsed: false,
        items: [
          { text: 'Alert 提示', link: 'components/alert' },
          { text: 'Loading 加载', link: 'components/loading' },
          { text: 'Message 消息提示', link: 'components/message' },
          { text: 'MessageBox 消息弹出框', link: 'components/messagebox' },
          { text: 'Notification 通知', link: 'components/notification' },
          { text: 'Popconfirm 气泡确认框', link: 'components/popconfirm' },
          { text: 'Tooltip 文字提示', link: 'components/tooltip' },
        ],
      },
      {
        text: '表单组件',
        collapsed: false,
        items: [{ text: 'Form 表单', link: 'components/form' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/miniliupeng/tide-ui' }],
  },
  markdown: {
    config: (md) => {
      // 添加DemoBlock插槽
      md.use(demoBlockPlugin)
    },
  },
  vite: {
    plugins: [vueJsx(), demoblockVitePlugin()] as any, // 项目中使用的Vite版本（6.3.3）与VitePress依赖的Vite版本（5.4.18）不匹配
  },
})
