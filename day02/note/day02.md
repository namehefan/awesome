---
typora-copy-images-to: assets
---

# Vue3Project DAY02

### VueCLI项目中关于图片的处理

项目中所需要使用的图片，可以存放在public目录下，也可以存放在src目录下（通常放在src/assets目录中）。

#### 如果将图片放在src/assets中

脚手架在运行时将会编译src下的所有资源。项目一定要经过编译（将src下的资源转换成浏览器可以识别的代码）才可以正常运行。

对于src下的图片，脚手架在编译时，如果发现**图片足够小**，则将图片编译成base64编码字符串，直接赋值给src属性。（在浏览器加载页面时减少图片发请求的次数，优化性能）

如果发现**图片不小**，则将图片重命名后放在编译后的 dist/img 目录中进行统一管理。

```html
<img src="/img/cover.0aad9547.jpg" alt="">
```

那么为什么加了冒号后，图片访问不到了？

因为如果为src加了冒号，意味着要动态处理src路径，脚手架将不会自动为路径进行处理。所以如果希望可以正常访问src下的资源，需要通过调用require方法手动编译资源：

```html
<img :src="require(`@/assets/icon/index_0.jpg`)" alt="">
```

















