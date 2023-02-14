import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

let app = null

const render = (container) => {
  app = createApp(App)
  app.use(router).mount(container)
}

// 当app1不存在，说明是独立运行
if (!window.app1) {
  render('#app')
}

export const bootstrap = () => {
  return Promise.resolve()
}
export const mount = (props) => {
  console.log(props, 'props')
  render(props.container)
  return Promise.resolve()
}
export const unmount = () => {
  app.unmount()
  return Promise.resolve()
}

// global test
window.levi = 'app1'
