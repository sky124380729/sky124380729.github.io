function render(container) {
  const el = document.querySelector(container)
  el.innerHTML = `
    <div style="display:flex;justify-content:center;">我是Vanilla.js</div>
  `
}

if (!window.app3) {
  render('#app')
}

export const bootstrap = () => {
  return Promise.resolve()
}

export const mount = (props) => {
  render(props?.container)
  return Promise.resolve()
}

export const unmount = () => {
  return Promise.resolve()
}
