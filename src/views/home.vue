<template>
  <div class="home-container">
    <div class="content">
      <div class="text">
        <div class="title">
          <h2 class="title">一次温暖的对话<br />
            <span class="highlight-text">化孤独的慰藉</span>
          </h2>
          <P class="description">一个基于AI的心理健康助手，帮助用户解决心理健康问题。</P>
        </div>
        <div class="hero-actions">
          <router-link to="/consultation" class="hero-btn" v-if="isLoggedIn">
            <el-button size="large">开始倾述，获得陪伴</el-button>
          </router-link>
          <router-link to="/emotion-diary" class="hero-btn" v-if="isLoggedIn">
            <el-button size="large" style="border-color: #fff " color="#transparent">记录心情，释放情感</el-button>
          </router-link>
        </div>
      </div>
      <div class="robot">
        <el-image style="width: 150px; height: 150px" :src="iconUrl" alt="机器人" class="robot-image" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { logout } from '@/api/admin'
import router from '@/router'

const iconUrl = new URL('@/assets/images/robot-fill.png', import.meta.url).href

const isLoggedIn = ref(false)

//用户登出
const handleLogout = () => {
  logout().then(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')

    router.push('/auth/login')
  })
}

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('token') !== null
})
</script>
<style scoped lang="scss">
.home-container {
  background: linear-gradient(90deg, rgb(74, 156, 140) 0%, rgb(61, 138, 122) 100%) rgba(74, 156, 140, 0.95);
  color: white;
  padding: 5rem 0;
  height: calc(100vh - 285px);
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .text {
      width: 500px;

      .title {
        font-size: 45px;
        font-weight: bold;
        // line-height: 1.2;
        margin-bottom: 15px;

        .highlight-text {
          color: #ffd700;
        }
      }

      .description {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
        margin-top: 20px;
        max-width: 500px;
        font-weight: 400;
      }

      .hero-actions {
        margin-top: 30px;
        display: flex;
        gap: 20px;
      }
    }

    .robot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 260px;
      height: 260px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.2);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
