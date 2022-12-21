# Miniprogram

## 小程序使用`npm`安装了包之后不生效

需要执行`工具->构建npm`

## 使用自定义组件

小程序的自定义组件需要在页面的`xxx.json`中设置

```json
{
  "usingComponents": {
    // 一般使用自定义组件的时候最好加个前缀，比如这里的`l-`
    // 这里使用的是绝对路径，注意绝对路径要看`miniprogramRoot`的配置
    // miniprogram_npm是构建npm之后自动生成的目录
    "l-avatar": "/miniprogram_npm/lin-ui/avatar/index"
  }
}
```

## 小程序显示的第一个页面配置

1. `app.json`中`pages`字段数组第一项即第一个页面

<div class="filename">app.json</div>

```json
{
  "pages": [
    "pages/welcome/welcome",
    "pages/posts/posts"
  ]
}
```

2. `app.json`中`entryPagePath`字段指定第一个页面

<div class="filename">app.json</div>

```json
{
  "entryPagePath": "pages/posts/posts"
}
```

3. 添加编译模式，自定义编译条件 <badge>recommend</badge>

## 设置全局组件

<div class="filename">app.json</div>

```json
{
  "usingComponents": {
    "l-avatar": "/miniprogram_npm/lin-ui/avatar/index"
  }
}
```
