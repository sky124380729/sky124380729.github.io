// faker是随机生成数据的
import faker from 'faker'

function mount(el) {
    el.innerHTML = `在您的购物车中有${faker.datatype.number()}件商品`
}

// 只有在开发环境运行子应用代码
if(process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#dev-cart')
    // 这里加判断是为了防止容器应用运行这段代码报错
    if(el) mount(el)
}


export { mount }