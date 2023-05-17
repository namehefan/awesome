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
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <movie-item 
        :movie="item"
        v-for="item in movieList" :key="item.id">
      </movie-item>
    </van-list>

  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted} from 'vue';
import httpApi from '@/http';
import Movie from '@/types/Movie';

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
  // 发送请求，加载当前选中类别的ID
  let params = {
    cid: parseInt(active.value),
    page: 1, 
    pagesize: 20
  }
  httpApi.movieApi.queryByCategory(params).then(res=>{
    console.log('切换导航的新数据：', res)
    // 更新列表
    movieList.value = res.data.data.result
  })
})

/** 处理触底加载下一页相关业务 */
const loading = ref(false)
const finished = ref(false)
function onLoad(){
  console.log('到底了！')
  loading.value = false
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
