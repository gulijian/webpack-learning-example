# webpack-learning-example



webpck@3.9.0 核心模块学习



## Index

[Style-loader](https://github.com/gulijian/webpack-learning-example/blob/master/README.md#chapter4-1-source)

[Style-loader/url](https://github.com/gulijian/webpack-learning-example/blob/master/README.md#chapter4-2-source)

[Css-loader And Css-Module](https://github.com/gulijian/webpack-learning-example/blob/master/README.md#chapter4-3-source)

[Js Tree-shaking](https://github.com/gulijian/webpack-learning-example/blob/master/README.md#chapter5-1-source)

[Url-loader](https://github.com/gulijian/webpack-learning-example/blob/master/README.md#chapter6-1-source)

[ProvidePlugin](https://github.com/gulijian/webpack-learning-example/blob/master/README.md#chapter7-1-source)

### chapter4-1 ([source](https://github.com/gulijian/webpack-learning-example/tree/master/chapter4-1))

style-loader use

> 处理css，以<style>标签形式引入css

##### app.js

```js
import './css/app.css'
```

##### app.css

```Css
html {
    background: #00bcd4b5;
}
```

##### index.html

```html
<!DOCTYPE html>
<html lang="en">
<body>
    <script src="./dist/app.bundle.js"></script>
</body>
</html>
```

##### webpack.config.js

```Js
var path = require('path')

module.exports = {
    entry: {
        'app': './src/app.js'
    },

    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
}
```

### chapter4-2 ([source](https://github.com/gulijian/webpack-learning-example/tree/master/chapter4-2))

style-loader/url use

> 处理css，以<link>标签形式引入css

##### app.js

```Js
import './css/app.css'
```

##### app.css

```Css
html {
    background: #00bcd4b5;   
}

#styleLoaderUrl {
    font-size: 30px;
    color: white;
    text-align: center;
}
```

#### index.html

```Html
<!DOCTYPE html>
<html lang="en">
<body>
    <span id="styleLoaderUrl"> hello style-loader/url</span>
    <script src="./dist/app.bundle.js"></script>
</body>
</html>
```

##### webpak.config.js

````Js
var path = require('path')

module.exports = {
    entry: {
        'app': './src/app.js'
    },

    output: {
        path: path.resolve(__dirname,'./dist/'),
        publicPath: './dist/',
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader/url'
                    },
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    }
}
````

### chapter4-3 ([source](https://github.com/gulijian/webpack-learning-example/tree/master/chapter4-3))

css-loader and css-module use

> 处理css，支持 css-module 形式

##### app.js

```js
import app1 from './css/app1.css'

import app2 from  './css/app2.css'

var app = document.getElementById('app');

// 使用样式
app.innerHTML = '<div class = "'+app1.box+'"></div>'
```

##### app1.css

```css
.box {
    composes: borderBox from './app2.css';
    height: 200px;
    width: 200px;
    border-radius: 4px;
    background: #76d4e0ab;
    margin: 0 auto;
}
```

##### app2.css

```Css
.borderBox {
    border: 4px solid #e87ff5;
}
```

##### index.html

```html
<!DOCTYPE html>
<html lang="en">
<body>
    <div id="app"></div>
    <script src="./dist/app.bundle.js"></script>
</body>
</html>
```

##### webpack.config.js

```Js
var path = require('path')

module.exports = {
    entry: {
        'app': './src/app.js'
    },

    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,  // 启用压缩
                            modules: true    // 启用 css module
                        }
                    }
                ]
            }
        ]
    }
}	
```

### chapter5-1 ([source](https://github.com/gulijian/webpack-learning-example/tree/master/chapter5-1))

UglifyJsPlugin  use

> 使用 **UglifyJsPlugin** 插件； 不打包没有使用的 js

##### util.js

```Js
export function a (){
    return 'this is a';
}

export function b (){
    return 'this is b';
}

export function c (){
    return 'this is c';
}
```

##### app.js

```Js
import { a } from './common/util.js'

console.log(a())
```

##### index.html

```Html
<!DOCTYPE html>
<html lang="en">
<body>
    <script src="./dist/app.bundle.js"></script>
</body>
</html>
```

#####  webpack.config.js

```Js
var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
        'app': './src/app.js',
        
    },

    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: '[name].bundle.js'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}
```

> app.js 中只使用了 util.js 中的 a 函数 打包的时候只会打包 a 函数；因为 b 和  c 函数没有使用到，则不会被打包

### chapter6-1 ([source](https://github.com/gulijian/webpack-learning-example/tree/master/chapter6-1))

url-loader use

> 图片文件处理

##### app.js

```Js
var img1 = document.getElementById('img1')
var img2 = document.getElementById('img2')

img1.src = require('./assets/img1.jpg')
img2.src = require('./assets/img2.png')
```

##### index.html

```html
<!DOCTYPE html>
<html lang="en">
<body>
     <!-- size < 30kb -->
     <img id="img1"/>
     <!-- size > 30kb -->
     <img id="img2">
     <script src="./dist/app.bundle.js"></script>
</body>
</html>
```

##### webpack.config.js

```js
var path = require('path')

module.exports = {

    entry: {
        'app': './src/app.js',
    },

    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 30000
                        }
                    }
                ]
            }
        ]
    }
}
```

> 图片 小于 30kb 会变成base64编码，大于 30kb 会生成图片地址

```html
<img id="img1" src="6443347e97d394b23b05746b2fe41cd1.jpg">
<img id="img2" src="data:image/png;base64,iVBORw0KGgoAXBIWXMAAC4jAAAuIwF4pT92AAAKTWlD"/>
```

### chapter7-1 ([source](https://github.com/gulijian/webpack-learning-example/tree/master/chapter7-1))

ProvidePlugin use

> 处理第三方 JS 库，方式一：（ jquery 作为npm的一个module）

##### app.js

```js
$('#app').append('hello jquery')
```

##### index.html

```html
<!DOCTYPE html>
<html lang="en">
<body>
    <div id="app"></div>
    <script src="./dist/app.bundle.js"></script>
</body>
</html>
```

##### webpack.config.js

```js
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        'app': './src/app.js',
    },

    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: '[name].bundle.js'
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}
```

### chapter7-2 ([source](https://github.com/gulijian/webpack-learning-example/tree/master/chapter7-2))

> 处理第三方 JS 库，方式二：（引入本地的 jquery 库）



































