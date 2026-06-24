import { defineStore } from 'pinia'
import { ref } from 'vue'
// 管理员状态管理
// 用于管理管理员相关的状态和操作
export const useAdminStore = defineStore('admin', () => {
  const isCollapse = ref(false)
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }
  return {
    isCollapse,
    toggleCollapse
  }
})