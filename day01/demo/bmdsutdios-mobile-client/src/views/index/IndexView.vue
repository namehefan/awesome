<template>
  <div>
    <!-- 标题栏 -->
    <van-nav-bar title="百慕大影城">
      <template #right>
        <van-popover 
          placement="bottom-end"
          v-model:show="showPopover" 
          :actions="actions">
          <template #reference>
            <van-icon name="apps-o" size="25" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>

    <!-- 广告栏 -->
    <app-header></app-header>
    <!-- <AppHeader></AppHeader> -->

    <!-- 顶部导航栏 -->
    <van-sticky>
      <div class="top-nav">
        <!-- 城市信息 -->
        <div class="city">北京</div>
        <span class="arrow"></span>
        <!-- tabs导航 -->
        <van-tabs 
          color="#f03d37" 
          class="tabs" 
          v-model:active="active">
          <van-tab title="热映" name="1"></van-tab>
          <van-tab title="待映" name="2"></van-tab>
          <van-tab title="经典" name="3"></van-tab>
        </van-tabs>
        <!-- 搜索按钮 -->
        <van-icon name="search" color="#f03d37"
          size="25" style="font-weight: bold;"/>
      </div>
    </van-sticky>

    <!-- 电影列表 -->
    <van-pull-refresh 
      success-text="加载成功"
      v-model="refreshing" 
      @refresh="onRefresh">
      <van-list
        v-if="movieList"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <movie-item 
          @click="router.push(`/movie-detail/${item.id}`)"  
          :movie="item" 
          v-for="item in movieList" :key="item.id">
        </movie-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted} from 'vue';
import httpApi from '@/http';
import Movie from '@/types/Movie';
import {set, get} from '@/utils/Storage';
import { useRouter } from 'vue-router';

// 在vue3中使用vueRouter对象
const router = useRouter()
// let route = useRoute()


/** 页面初始化时，加载热映类别(cid=1)的首页电影列表数据 */
const movieList = ref<Movie[]>()
onMounted(()=>{
  console.log('Mounted1...') 
  // 通过类别ID  (热映类别ID=1)  查询电影列表
  const params = {cid:1, page:1, pagesize:20}
  httpApi.movieApi.queryByCategory(params).then(res=>{
    console.log('加载首页电影列表', res) 
    movieList.value = res.data.data.result
  })
})


/** 控制右上角popover弹窗 */
const showPopover = ref(false)
const actions = [
  {text: '首页'},
  {text: '组件'},
  {text: '热点'},
  {text: '商城'},
]


/** 控制顶部导航  监听顶部导航的变化，从而发送请求，加载新数据 */  
const active = ref('1')
watch(active, (newVal, oldVal)=>{
  console.log(`导航从${oldVal}切换到了${newVal}`)
  // 将滚动条滚到顶部, 重新重置finished变量
  window.scrollTo(0, 0)
  finished.value = false
  // 先去缓存中找找 以前有没有存过
  let cachedList = get(active.value)
  if(cachedList){
    movieList.value = cachedList // 更新列表
    return;
  }

  // 没有存过，就发送请求，加载当前选中类别的ID
  let params = {
    cid: parseInt(active.value),
    page: 1, 
    pagesize: 20
  }
  httpApi.movieApi.queryByCategory(params).then(res=>{
    console.log('切换导航的新数据：', res)
    // 更新列表
    movieList.value = res.data.data.result
    // 将数组中的数据存入缓存
    set(active.value, res.data.data.result)
  })
})

/** 处理触底加载下一页相关业务 */
const loading = ref(false)
const finished = ref(false)
function onLoad(){
  console.log('到底了！')
  if(!movieList.value){  // movieList为undefined
    return;
  }
  // 发送请求，加载当前列表下的下一页数据 
  let params = {
    cid: parseInt(active.value),
    page: movieList.value.length/20 + 1,
    pagesize: 20
  }
  httpApi.movieApi.queryByCategory(params).then(res=>{
    // 将得到的结果数据，追加到当前列表的末尾
    movieList.value?.push(...res.data.data.result)
    loading.value = false
    // 判断是否到底了
    if(movieList.value?.length == res.data.data.total){
      finished.value = true
    }
  })
}

/** 处理下拉刷新业务 */
const refreshing = ref(false)

// 用户做了下拉刷新操作后，执行该方法，并且自动设置refreshing=true
function onRefresh(){
  console.log('下拉刷新...')
  // 发送请求，加载当前类别下的首页数据，更新缓存，替换当前电影列表
  let params = {
    cid: parseInt(active.value),
    page: 1,
    pagesize: 20
  }
  httpApi.movieApi.queryByCategory(params).then(res=>{
    movieList.value = res.data.data.result
    refreshing.value = false
    finished.value = false
    // 更新缓存
    set(active.value, res.data.data.result)
  })
}


</script>

<style scoped lang="scss">
.top-nav {
  display: flex;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;

  .arrow {
    border: 5px solid transparent;
    border-top-color: black;
    margin-top: 5px;
    margin-left: 5px;
  }
  .tabs {
    flex: 1;
    margin: 0px 30px;
  }
}
</style>
