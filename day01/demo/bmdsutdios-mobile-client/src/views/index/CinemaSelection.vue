<template>
    <div class="container">
      <!-- 顶部导航栏 -->
      <van-nav-bar title="疯狂动物城" left-arrow></van-nav-bar>

      <!-- 广告 -->
      <app-header></app-header>

      <!-- 电影详细描述 -->
      <movie-desc v-if="movie" :movie="movie"></movie-desc>

      <!-- 顶部时间导航条 -->
      <van-sticky>
        <van-tabs v-model:active="activeDate" swipe-threshold="1" line-width="80px">
          <van-tab 
            v-for="item, i in dates" :key="i"
            :name="item.format('yyyy-MM-DD')" 
            :title="momentToStr(item)">
          </van-tab>
        </van-tabs>
      </van-sticky>

      <!-- 电影院列表项 -->
      <div class="item mb-line-b">
        <div class="title-block">
        <div class="title line-ellipsis">娜美国际影城</div>
          <div class="location-block">
              <div class="flex line-ellipsis">通州区六和桥西甲壹号（免费停车）</div>
              <div class="distance">8.6 km</div>
          </div>
          <div class="label-block">
            <p class="vipTag">改签</p>
            <p class="vipTag">小吃</p>
            <p class="vipTag">折扣卡</p>
            <p class="vipTag">退</p>
          </div>
        </div>
      </div>

    </div>
</template>

<script setup lang="ts">
import httpApi from '@/http';
import { useRoute } from 'vue-router';
import Movie from '@/types/Movie';
import moment from 'moment';
import { ref, watch } from 'vue';
const route = useRoute()
const id = route.params.id as string


/** 时间导航 */
const activeDate = ref('2022-10-06')
watch(activeDate, (newVal, oldVal)=>{
  console.log(`导航从 ${oldVal} 变成了 ${newVal} `)
  let params = {
    movie_id: parseInt(id),
    showingon_date: newVal
  }
  httpApi.cinemaApi.queryByMovieAndDate(params).then(res=>{
    console.log('电影院列表结果', res)
  })
})

// 通过momentjs，构造连续7天的moment对象
const dates:moment.Moment[] = []
for(let i=0; i<7; i++){
  dates.push(moment().add(i, 'days'))
}
console.log(dates)

enum Week {'日', '一', '二', '三', '四', '五', '六'}
/** 接收一个moment对象，转成 '周x x月x日' 字符串 */
function momentToStr(item:moment.Moment){
  let i = parseInt(item.format('e'))
  let s = Week[i]  // 枚举反查 名字
  return item.format(`周${s} MM月DD日`)
}

/** 处理电影详情组件内容的显示 */
const movie = ref<Movie>()
httpApi.movieApi.queryById({id}).then(res=>{
  movie.value = res.data.data
  console.log('电影详情数据', movie.value) 
})


</script>

<style scoped>
.buyblock {
  padding:10px; 
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}

.container{
  background-color: #f5f5f5;
}
.movie-detail {
  overflow: hidden;
  z-index: 1;
  height: 188px;
  position: relative;
  cursor: pointer;
}
.movie-detail .movie-filter {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #333;
}
.poster-background{
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  position: absolute;
  -webkit-filter: blur(1.2rem);
  filter: blur(1.2rem);
  background-size: cover;
  background-repeat: no-repeat;
  opacity: .55;
}
.movie-detail .detail {
  height: 150px;
  padding: 19px 30px 19px 15px;
}
.movie-detail .detail {
  display: flex;
  height: 150px;
  padding: 19px 30px 19px 15px;
}
.movie-detail .detail .poster img {
  width: 110px;
  height: 150px;
  box-sizing: border-box;
}
.movie-detail .detail .content {
  flex:1;
  overflow-x: hidden;
  margin-left: 12.5px;
  line-height: 1;
  color: #fff;
}
.movie-detail .detail .content .title {
  font-size: 20px;
  margin-top: 2px;
  font-weight: 700;
  overflow: hidden;
}
.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.movie-detail .detail .content .score {
  font-size: 18px;
  font-weight: 700;
  color: #fc0;
  margin-top: 17px;
}
.movie-detail .detail .content .type {
  margin-top: 17px;
  font-size: 12px;
  color: #fff;
  opacity: .8;
}


.mb-line-b {
  padding: 10px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.title-block {
  line-height: 1.5;
}
.title {
  height: 23px;
  line-height: 23px;
  font-size: 16px;
  color: #000;
}
.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.location-block {
  display: flex;
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}
.flex {
  -webkit-box-flex: 1;
  flex: 1;
}
.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.distance {
  margin-left: 5px;
}
.label-block {
  height: 24px;
  line-height: 22px;
  margin-top: 4px;
  margin-bottom: 4px;
  overflow: hidden;
}
.label-block p {
  position: relative;
  display: inline-block;
  padding: 3px;
  height: 13px;
  line-height: 15px;
  border-radius: 2px;
  font-size: 12px;
  margin-right:5px;
}
.allowRefund, .endorse,.hallType{
  color: #589daf;
  border: 1px solid #589daf;
}
.vipTag,.snack {
  color: #f90;
  border: 1px solid #f90;
}
</style>