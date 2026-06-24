<template>
  <el-form ref="ruleformRef" :model="formData">
    <el-row :gutter="24">
      <!-- 循环渲染表单项 -->
      <!-- 每个表单项根据组件类型渲染不同的组件 -->
      <template v-for="item in formItemAttrs" :key="item.prop">
        <el-col v-bind="item.col">
          <el-form-item :label="item.label" :prop="item.prop">
            <component v-model="formData[item.prop]" :is="isComp(item.comp)" :placeholder="item.placeholder">
              <template v-if="item.comp === 'select'">
                <el-option label="全部" value="" />
                <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value" />
              </template>
            </component>
          </el-form-item>
        </el-col>

      </template>
    </el-row>
    <el-row>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="handleReset(ruleformRef)">重置</el-button>
    </el-row>
  </el-form>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
// 解析父组件传递的formItem属性，添加默认值
const props = defineProps({
  formItem: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['search'])
// 计算属性，根据formItem属性添加默认值
// 为每个表单项添加默认值，包括列宽、占位符、选项等
const formItemAttrs = computed(() => {
  const { formItem } = props
  formItem.forEach(item => {
    item.col = {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 6,
      xl: 6
    }
  })
  return formItem
})
//表单数据
const ruleformRef = ref()
const formData = reactive({})
const isComp = (comp) => {
  return {
    input: 'elInput',
    select: 'elSelect'
  }[comp]
}
// 查询
const handleSearch = () => {
  //console.log(formData)
  emit('search', formData)
}
// 重置表单
const handleReset = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  emit('search', formData)
}
</script>
