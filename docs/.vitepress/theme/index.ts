import DefaultTheme from 'vitepress/theme'
import { Playground } from '../../components'
import './useWork'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('Playground', Playground)
  }
}
