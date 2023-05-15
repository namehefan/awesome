<template>
  <div>
    <!-- 底部选项卡 -->
    <van-tabbar 
      v-model="active"
      active-color="#f03d37">
      <van-tabbar-item icon="home-o">
        首页
        <template #icon>
          <img src="@/assets/tabs/index_0.png" alt="">
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search">视频</van-tabbar-item>
      <van-tabbar-item icon="friends-o">演出</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
</script>

<style scoped>

</style>