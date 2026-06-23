<template>
  <div class="page-head">
    <p class="page-title">{{ props.title }}</p>
    <div class="actoin-btn">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script setup lang="ts" name="ComponentName">
const props = defineProps({
  title: {
    type: String,
    default: '页面标题'
  }
})
</script>

<style scoped>
.page-head {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-title {
    font-size: 24px;
    color: #333;
  }
}
</style>