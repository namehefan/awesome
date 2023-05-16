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
    <div class="top-nav">
      <!-- 城市信息 -->
      <div class="city">北京</div>
      <span class="arrow"></span>
      <!-- tabs导航 -->
      <van-tabs class="tabs" v-model:active="active">
        <van-tab title="热映"></van-tab>
        <van-tab title="待映"></van-tab>
        <van-tab title="经典"></van-tab>
      </van-tabs>
      <!-- 搜索按钮 -->
      <van-icon name="search" color="#f03d37"
        size="25" style="font-weight: bold;"/>
    </div>



    <!--  -->
    <van-empty description="首页模块 敬请期待" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


// 控制右上角popover弹窗
const showPopover = ref(false)

const actions = [
  {text: '首页'},
  {text: '组件'},
  {text: '热点'},
  {text: '商城'},
]


// 控制顶部导航
const active = ref(0)  

</script>

<style scoped lang="scss">
.top-nav {
  display: flex;
  align-items: center;
  padding: 0px 15px;

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
