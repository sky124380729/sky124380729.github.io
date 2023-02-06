// 在容器应用导入微应用后，应该有权限决定微应用的挂载位置，而不是微应用在代码运行时直接进行挂载，所以每个微应用都应该导出一个挂载方法供容器应用调用

// faker是随机生成数据的
import faker from 'faker'

// 添加一个挂载方法
function mount(el) {
    let products = ""

    for(let i = 1; i <= 5; i++) {
        products += `<div>${faker.commerce.productName()}</div>`
    }

    el.innerHTML = products
}

// 只有在开发环境运行子应用代码
if(process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#dev-products')
    // 这里加判断是为了防止容器应用运行这段代码报错
    if(el) mount(el)
}

export { mount }


