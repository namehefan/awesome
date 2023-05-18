---
typora-copy-images-to: assets
---

# Vue3Project DAY04

### Vue应用中的组件保活机制（keep-alive）

在vue项目中，从一个路由（A路由）跳转到另外一个路由（B路由）将会执行以下几个阶段：

1. 启动路由跳转流程。
2. 卸载A路由组件（导致A路由中已经操作的数据状态都将会重置）。
3. 创建B路由组件。并且挂载到页面中。

但是有些业务场景，并不想从A跳转到B时，并不想销毁A，想要保留A的状态，这样，从B返回A时还会看到上一次操作A时的状态，如果有如此需求，该如何完成？

#### Vue中的组件`保活机制`就提供了一种可以实现该功能的方案 

需要告诉vue，A组件属于保活组件，当不需要看到A组件时（例如跳转到了B组件），保活机制将不会销毁A组件，而是将它保留在内存中，如果后续有需求重新显示A组件，则直接获取A组件并显示即可。

结合router-view实现路由组件的缓存：

```html
<router-view v-slot="{ Component }">
    <keep-alive>
        <component :is="Component" />
    </keep-alive>
</router-view>
```

如果这么做，导致所有的路由组件都会被缓存。实际上有些路由组件不希望被缓存。所以需要做一些特殊配置来实现定制化的组件缓存需求（有的缓存，有的不缓存）。

```javascript
{
    path: 'index',
    component: Index组件对象,
    meta: {
    	keepAlive: true        
    }
}
```

```html
<router-view v-slot="{ Component }">
    <keep-alive>
        <component v-if="route.meta.keepAlive" :is="Component" />
    </keep-alive>
    <component v-if="!route.meta.keepAlive" :is="Component" />
</router-view>
```

注意：

一旦组件被保活处理，当替换到当前组件时，当前组件不会执行unmounted生命周期，会直接缓存在内存中。

若重新启动这个组件，也不会执行该组件的mounted生命周期，而是直接显示该组件。

vue为保活的组件又提供了两个新的生命周期方法：

1. activated       被 keep-alive 缓存的组件激活时调用。
2. deactivated   被 keep-alive 缓存的组件失活时调用。



### 点击特惠购票，选择电影院

看到电影详情，点击特惠购票，跳转到选择影院页面。

**实现步骤：**

1. 准备好选择影院页面：CinemaSelection.vue，MovieDesc.vue。

2. 配置路由：/cinema-selection/:id 时，跳转到该选择影院页面。

3. 当点击特惠购票按钮时，添加路由跳转相关的代码即可。

   ```html
   <van-button @click="router.push(`/cinema-selection/${route.params.id}`)" round type="danger" block>
       特惠购票
   </van-button>
   ```
































