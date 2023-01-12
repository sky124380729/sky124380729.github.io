# Esbuild

## 简易使用

::: code-group

```json [package.json]
{
  "name": "esbuild",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "esbuild index.js --outfile=dist.js --bundle --target=esnext --platform=browser --format=esm --define:TEST=12 --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "esbuild": "^0.14.49"
  }
}

```

```js [index.js]
import React from 'react'

const div = React.createElement('div')

console.log(TEST)


function hello() {
  console.log('hello esbuild')
}

hello()

export default hello
```

:::
