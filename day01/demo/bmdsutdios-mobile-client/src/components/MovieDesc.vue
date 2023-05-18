<template>
    <div>
        <!-- 顶部区域开始 -->
        <div class="movie-detail">
        <div class="movie-filter"></div>
        <!-- 背景图开始 -->
        <div 
            class="poster-background"  
            :style="{'background-image': `url(${movie.cover})`}">
        </div>
        <!-- 背景图结束 -->
        <div class="detail">
            <!--海报帧开始-->
            <div class="poster">
                <img :src="movie.cover">
            </div>
            <!--海报帧结束-->
            <!-- 内容区域开始 -->
            <div class="content">
                <div class="title line-ellipsis">{{ movie.title }}</div>
                <div class="score line-ellipsis">{{ movie.score }}</div>
                <div class="type line-ellipsis">主演: {{ movie.star_actor }}</div>
                <div class="type line-ellipsis">{{ movie.type }}</div>
                <div class="type line-ellipsis">{{ movie.showingon }} 上映</div>
            </div>
            <!-- 内容区域结束 -->
        </div>
        </div>
        <!-- 顶部区域结束 -->
    </div>
</template>

<script setup lang="ts">
import Movie from '@/types/Movie';

defineProps<{
  movie: Movie
}>()

</script>

<style scoped>
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
</style>