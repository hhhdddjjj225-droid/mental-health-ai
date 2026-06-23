<template>
  <div class="backend-layout">
    <el-container class="main-container">
      <Sidebar></Sidebar>
      <el-container>
        <el-header>
          <Navbar></Navbar>
        </el-header>
        <el-main class="main-content">
          <router-view class="content-container"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>




<script setup lang="ts" name="ComponentName">
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
</script>

<style lang="scss" scoped>
.backend-layout {
  height: 100vh;

  .el-header {
    height: 74px !important;
  }

  .main-container {
    height: 100%;

    .main-content {
      padding: 0;
      overflow: auto;
    }

    .content-container {
      padding: 20px;
      background-color: #fff;
      min-height: 100%;
    }
  }
}
</style>