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



#### 如果将图片放在`public`中

在项目编译打包时，将会把public下的资源原封不动的复制到dist文件夹中。所以可以直接通过 `/`来访问dist下的静态资源。

如果有如下图片资源：

```
public
    |---img
         |---1.jpg
         |---2.jpg
```

访问方式：

```html
<img src="/img/1.jpg">   正确写法，斜杠开头，直接访问public下的资源即可
<img src="/img/2.jpg">

<img src="../../public/img/1.jpg">   错误写法，不建议
```



**什么样的图片适合放在public，什么样的图片适合放在assets中？**

因为assets目录下资源需要编译打包，所以项目中所必须使用的小图标适合放在此处。

其他图片可以放在public下，但更多的选择是放在单独的静态图片服务器中（或CDN）。



### 搭建项目的基础架构

点击底部选项卡后，上半部分需要切换显示。

设计嵌套路由：

```
访问：/时，看到首页HomeView.vue。 
上半部分：<router-view />  二级路由占位符
下半部分：<van-tab-bar />  底部选项卡
```

```
访问：/home/index   看到Home页面中显示 首页 内容  Index.vue
访问：/home/video   看到Home页面中显示 视频 内容  Video.vue
访问：/home/show    看到Home页面中显示 演出 内容  Show.vue
访问：/home/me      看到Home页面中显示 我的 内容  Me.vue
```

**实现步骤：**

1. 新建4个新的组件：

   ```
   src/views/index/IndexView.vue
   src/views/video/VideoView.vue
   src/views/show/ShowView.vue
   src/views/me/MeView.vue
   ```

2. 配置嵌套路由

   ```
   访问：/home/index   看到Home页面中显示 首页 内容  IndexView.vue
   访问：/home/video   看到Home页面中显示 视频 内容  VideoView.vue
   访问：/home/show    看到Home页面中显示 演出 内容  ShowView.vue
   访问：/home/me      看到Home页面中显示 我的 内容  MeView.vue
   ```

3. 不要忘记添加二级路由占位符。

4. 浏览器地址栏中，输入测试链接地址：

   ```
   http://localhost:8080/home/index
   http://localhost:8080/home/video
   http://localhost:8080/home/show
   http://localhost:8080/home/me
   ```

5. 当点击底部选项卡时，改变路由地址，上半部分的内容。



### 实现IndexView.vue的静态页面的编写

1. NavBar 标题栏。
2. AppHeader广告栏。
3. #top-nav 顶部导航栏。
   1. 城市选择
   2. 标签导航
   3. 放大镜







