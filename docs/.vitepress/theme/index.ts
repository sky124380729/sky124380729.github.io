import DefaultTheme from 'vitepress/theme'
import { install } from "naive-ui"
import { Playground } from '../../components'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    install(ctx.app)
    ctx.app.component('Playground', Playground)
  }
}
