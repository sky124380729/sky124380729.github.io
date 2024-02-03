# 微前端框架(wujie)实战总结

十月份的时候接到一个项目，客户对于老的系统（10年前jsp开发）的UI以及功能上不满意，觉得已经跟不上时代的步伐，要求我们做出优化。
由于项目是个稳定运行多年的IOT产品，大刀阔斧的直接重构会带来非常大的风险：

- 承接优化工作的团队成员都不熟悉该项目，即对于该项目来说都是新人，包括我自己
- 没有原始需求文档以及功能说明
- 没有单元测试，系统测试等用例

但是如果继续在老的架构上优化，无法达到客户预期（包括维护效率），于是我提出了【渐进式重构】的思路：即使用全新的前端架构作为底座（不限技术栈），将老系统各个菜单接入进来，保证线上项目正常运行的同时，逐个菜单进行重构，这样使风险降到最小，并且降低了交付周期的压力

基于之前写的文章<n-button type="primary" text target="_blank" tag="a" href="/columns/micro-frontend/">浅析微前端</n-button>一文，我最终决定采用<n-button type="primary" text target="_blank" tag="a" href="https://wujie-micro.github.io/doc/">wujie</n-button>作为微前端框架，以下总结一下在实际接入过程中遇到的问题以及解决方案

## 老项目使用的**AMD**规范，引入了require.js，接入到主应用的时候会报错`require is not defined`

### 【问题原因】

wujie加载子应用js的时候，会把内容包裹在闭包内运行，为了方便劫持修改`location`，同时也为了做`沙箱隔离`，类似于

```js
var require
```

转换成了

```js
;(function(window){;   var require;   }).bind(window)(window);
```

然而`requirejs`本身依赖全局变量`required`，导致在全局找不到这个变量，因此会报错

### 【解决措施】

- 通过`wujie`提供的插件拦截
- 修改`requirejs`源码

  ```js
  // 文件末尾加上
  this.requirejs = requirejs; // [!code ++]
  this.require = require; // [!code ++]
  this.define = define // [!code ++]
  ```

### 【扩展】

基于以上原理，老项目所有通过`var Lang = {}`形式定义的全局变量都要修改成`window.Lang = {}`

## jsp项目中动态添加的script标签不生效(document.write)

### 【问题原因】

`wujie`本身并没有拦截`document.write`事件，因此不能对其作出相应

### 【解决方案】

```js
document.write('<script src="'+localResourcePath + localJsPath+'/locale/lang-'+langKey+'.js?v='+version+'"></script>');
```

修改为

```js
// document.write('<script src="'+localResourcePath + localJsPath+'/locale/lang-'+langKey+'.js?v='+version+'"></script>'); // [!code --]

var langScript = document.createElement('script') // [!code ++]
langScript.src = localResourcePath + localJsPath+'/locale/lang-'+langKey+'.js?v='+version // [!code ++]
document.head.appendChild(langScript); // [!code ++]
```

## 接入后，老项目的选择器报错

### 【问题原因】

HTML5协议中，严格要求css选择器 只能包含[a-zA-Z0-9]、-,，其中不能以、-、0-9开头

### 【解决措施】

将不规范的选择器替换掉

## 部分点击事件报错

### 【问题原因】

`内联javascript`在微前端中不兼容，需要对事件监听逻辑做改造

### 【解决措施】

```html
<input type="file" onchange="javascript:setImagePreview($(this));" />

<script>
function setImagePreview(this) {
  // ...
}
</script>
```

修改为

```html
<input type="file" /> // [!code warning]

<script>
function setImagePreview(this) {
  // ...
}

document.querySelectorAll('input[type="file"]').forEach(function(input) { // [!code ++]
  input.addEventListener('change', function() { // [!code ++]
    setImagePreview($(this)) // [!code ++]
  }) // [!code ++]
}) // [!code ++]
</script>
```

## 弹框大小和位置不准确

### 【原因分析】

其实官方有解释[下拉组件等位置不准确](https://wujie-micro.github.io/doc/question/#_4%E3%80%81%E5%86%92%E6%B3%A1%E7%B3%BB%E5%88%97%E7%BB%84%E4%BB%B6-%E6%AF%94%E5%A6%82%E4%B8%8B%E6%8B%89%E6%A1%86-%E5%BC%B9%E5%87%BA%E4%BD%8D%E7%BD%AE%E4%B8%8D%E6%AD%A3%E7%A1%AE)的问题，但是其只解释了子应用相对较新的情况，而我的项目是用`jquery`写的，不能照搬。

本文使用的是`jquery1.8.0`

- 修改`jQuery.fn.offset`方法

```js
jQuery.fn.offset = function( options ) {
  if ( arguments.length ) {
    return options === undefined ?
      this :
      this.each(function( i ) {
        jQuery.offset.setOffset( this, options, i );
      });
  }
  var box, docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, top, left,
    elem = this[ 0 ],
    doc = elem && elem.ownerDocument;

  if ( !doc ) {
    return;
  }

  if ( (body = doc.body) === elem ) {
    return jQuery.offset.bodyOffset( elem );
  }

  docElem = doc.documentElement;

  // Make sure we're not dealing with a disconnected DOM node
  if ( !jQuery.contains( docElem, elem ) ) { // [!code --]
    return { top: 0, left: 0 }; // [!code --]
  } // [!code --]

  box = elem.getBoundingClientRect();
  win = getWindow( doc );

  // 在微前端场景下，document被嵌入到主应用的webcomponents中
  // 然而getBoundingClientRect方法获取到的top和left是基于viewport的，因此会出现定位不准确的问题
  // 目前的方办法是通过修改offset源码，发现如果当前window不是顶层对象，假设它是被嵌入了，此时计算当前文档模型的偏移量
  // 返回的时候减去文档对象的偏移量
  var shadowTop = 0 // [!code ++]
  var shadowLeft = 0 // [!code ++]
  if(win.parent !== win) { // [!code ++]
    var shadowBox = docElem.getBoundingClientRect() // [!code ++]
    shadowTop = shadowBox.top // [!code ++]
    shadowLeft = shadowBox.left // [!code ++]
  } // [!code ++]

  clientTop  = docElem.clientTop  || body.clientTop  || 0;
  clientLeft = docElem.clientLeft || body.clientLeft || 0;
  scrollTop  = win.pageYOffset || docElem.scrollTop;
  scrollLeft = win.pageXOffset || docElem.scrollLeft;
  top  = box.top  + scrollTop  - clientTop; // [!code --]
  left = box.left + scrollLeft - clientLeft; // [!code --]
  top  = box.top  + scrollTop  - clientTop - shadowTop; // [!code ++]
  left = box.left + scrollLeft - clientLeft - shadowLeft; // [!code ++]

  return { top: top, left: left };
};
```

- 修改`isHidden`方法

```js
function isHidden( elem, el ) {
  elem = el || elem;
  return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem ); // [!code --]

  // 微前端场景下，由于elem.ownerDocument返回的是顶层的document对象，作为子应用的时候变成了webcomponents
  // 导致jQuery.contains( elem.ownerDocument, elem )返回的是false
  var rootNode = elem.getRootNode(); // [!code ++]
  return jQuery.css(elem, "display") === "none" || (rootNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !rootNode.host); // [!code ++]
}
```

:::tip
其实以上有两个地方动了`contains`方法，更好的实践是直接修改`jQuery.contains`中的判断，以兼容微前端场景，但是由于时间考虑没有来得及做优化，读者可以根据自己的自身情况去修改
:::

- window的获取改为top.window

被引入的`html`在主应用中是包裹到`webcomponent`下面的，子应用的dialog获取窗口宽高的时候，原本获取的`window`是内部的window，存在计算高度不准确的问题

由于本处是业务代码，因此就不贴出来了

### 【扩展】

`jQuery`作为很多库的底层依赖，修改它的`offset`势必会影响上层库的定位问题，目前发现了修改之后会导致`highcharts`定位出现问题

可以将原始的`jquery`中原始的`offset`方法新增一份保存为`_offset`，将`higcharts`中的`offset`改为`_offset`

```js
// highchats.js
offset:function(b){return a(b).offset()} // [!code --]

offset:function(b){return a(b)._offset()} // [!code ++]
```

:::tip
至于为什么不是保留`jQuery`的`offset`方法，直接新增`_offset`处理微前端下的逻辑，是因为在实践中发现，这种方式需要改上层库的地方会更多，比如`easyui`等，收益比直接修改`offset`来的要小
:::

## 跳转问题

当前`渐进式重构`方案中最大的**痛点**莫过于跳转问题，JSP项目一般都是`MPA应用`，比如原本A页面某个按钮跳转到B页面，但是B页面已经使用新的框架重构过了，需要能够跳到重构后的`SPA应用`对应`路由`下面，按钮的跳转动作需要改造，老项目的跳转存在以下几种情况：

- a链接通过href直接跳转

  ```html
  <a href="/b.jsp" />
  <a href="#" />
  ```

- 事件绑定

  ```html
  <div onclick="location.href='/b.jsp'">go</div>
  ```

  ```html
  <div id="navigate">go</div>
  <script>
    $('#navigate').on('click', function(e) {
      location.href = '/b.jsp'
    })
  </script>
  ```

### 【解决方案】

目前笔者没有找到合适的方案，暂时是通过一个个改造子应用的代码实现，浏览器好像禁用了对于`location.href`的拦截？

有一个`polyfill`方案，不知道是否可行，读者可以自行尝试[locationHref](https://wujie-polyfill.github.io/doc/plugins/locationHref.html)

## $.ajaxFileUpload 报错

作为子应用被接入的时候，不规范的写法会导致主应用报错

### 【解决方案】

```js
$.ajaxFileUpload({
  url: sparePartUrl,
  secureuri: false,
  fileElementId: '', // [!code --]
  fileElementId: 'file', // [!code ++]
  dataType: 'JSON',
  data: data,
  success: function(res, status) {}
})
```

## 加载子应用的时候页面白屏

### 【原因分析】

子应用中存在标签没有指定`type`，主应用在获取的时候会解析为`text`

### 【解决方案】

```js
<script></script> // [!code --]

<script type="text/javascript"></script> // [!code ++]
```
