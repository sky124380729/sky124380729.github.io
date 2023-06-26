import DefaultTheme from 'vitepress/theme'
import { install } from "naive-ui"
import { onMounted } from 'vue'
import mediumZoom from 'medium-zoom'
import { Playground } from '../../components'
import { inject } from '@vercel/analytics';
import './custom.css'

// 引入vercel埋点
inject()

export default {
  ...DefaultTheme,
  setup() {
    onMounted(() => {
      mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' });
    })
  },
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    install(ctx.app)
    ctx.app.component('Playground', Playground)
  }
}
