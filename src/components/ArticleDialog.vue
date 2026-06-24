<template>
  <!-- 文章弹窗 -->
  <el-dialog :title="isEdit ? '编辑文章' : '新增文章'" v-model="dialogVisible" width="50%" @close="handleClose">
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit clearable />
      </el-form-item>
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="请选择分类">
          <el-option v-for="item in props.categories" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章摘要" prop="summary">
        <el-input v-model="formData.summary" type="textarea" placeholder="请输入文章摘要(可选)" maxlength="1000" show-word-limit
          :rows="4" />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select v-model="formData.tagArray" placeholder="请选择标签(可选)" multiple filterable allow-create
          style="width: 100%">
          <el-option v-for="tag in commonTags" :key="tag" :label="tag" :value="tag" />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片">
        <div class="cover-upload">
          <el-upload class="avatar-uploader" action="#" :before-upload="beforeUpload"
            :http-request="handleUploadRequest" :show-file-list="false" accept="image/*">
            <div v-if="!imgUrl" class="cover-placeholder">
              <p>点击上传封面</p>
            </div>
            <img v-else :src="imgUrl" alt="封面图片" class="cover-image" />
          </el-upload>
          <div v-if="imgUrl" class="cover-image-container">
            <el-button type="danger" size="mini" @click="handleRemove">移除封面</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <!-- //富文本编辑器组件 -->
        <RichTextEditor v-model="formData.content" placeholder="请输入文章内容,支持富文本\n\n可以使用加粗、斜体、下划线、列表、标题等格式来丰富文章内容"
          :maxCharCount="5000" @change="handleContentChange" @create="handleEditorCreated" min-height="400px" />
      </el-form-item>
    </el-form>
    <!--内容预览-->
    <div v-if="btnPreview">
      <h3>内容预览</h3>
      <div v-html="formData.content"></div>
    </div>
    <template #footer>
      <el-button @click="btnPreview = !btnPreview">{{ btnPreview ? '隐藏预览' : '预览效果' }}</el-button>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '更新文章' : '创建文章' }}</el-button>
    </template>
  </el-dialog>
</template>


<script setup>
import { ref, reactive, computed, nextTick, watch } from "vue";
import { ElMessage } from "element-plus";
import { uploadFile, createArticle, updateArticle } from "@/api/admin";
import { fileBaseUrl } from "@/config/index.js";
import RichTextEditor from "@/components/RichTextEditor.vue";
const props = defineProps({
  //弹窗是否显示参数
  modelValue: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  //文章详情数据
  article: {
    type: Object,
    default: null
  },
})
//关闭弹窗逻辑
const handleClose = () => {
  //重置
  formRef.value.resetFields()
  //重置id
  businessId.value = null
  //重置标签
  formData.tagArray = []
  //重置封面图片
  handleRemove()
  emit('update:modelValue', false)
}
//接收父组件的success事件
const emit = defineEmits(['update:modelValue'], 'success')
//打开和关闭弹窗
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => {
    //传回父组件的弹窗是否显示参数
    emit('update:modelValue', val)
  }
})
//新增还是编辑
const isEdit = computed(() => !!props.article?.id)
//监听编辑数据
watch(() => props.article, (newVal) => {
  if (newVal) {
    nextTick(() => {
      //将文章详情数据赋值给表单数据
      Object.assign(formData, newVal)
      //使用现有的id
      businessId.value = newVal.id
      //Url
      imgUrl.value = fileBaseUrl + newVal.coverImage
    })

  }
}
)
//表单数据
const formData = reactive(
  {
    "title": "",
    "content": "",
    "coverImage": "",
    "categoryId": 1,
    "summary": "",
    "tags": "",
    "id": ""
  }
)
//表单校验规则
const rules = reactive({
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { max: 200, message: '文章标题最多200个字符', trigger: 'blur' },
  ],
  categoryId: [
    { required: true, message: '请选择分类', trigger: 'change' },
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' },
    { max: 5000, message: '文章内容最多5000个字符', trigger: 'blur' },
  ],

})
//标签列表
const commonTags = [
  '情绪管理', '焦虑', '抑郁', '压力', '睡眠',
  '冥想', '正念', '放松', '心理健康', '自我成长',
  '人际关系', '工作压力', '学习方法', '生活技巧'
]
//上传的地址
const imgUrl = ref('')
//对上传的文件校验
const beforeUpload = (file) => {
  //校验文件是否存在
  const isImage = file.type.startsWith('image/')
  //校验文件大小是否超过5MB
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isImage) {
    ElMessage.error('请上传图片文件')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过5MB')
    return false
  }
  return true
}

const businessId = ref(null)
//上传图片到服务器的方法
const handleUploadRequest = async ({ file }) => {
  //UUID生成业务id
  businessId.value = crypto.randomUUID()
  //后端调用结果
  const fileRes = await uploadFile(file, {
    businessId: businessId.value
  })
  console.log(fileRes);
  //拼接完整的图片地址
  imgUrl.value = fileBaseUrl + fileRes.filePath
  formData.coverImage = fileRes.filePath
}
const handleRemove = () => {
  imgUrl.value = ''
  formData.coverImage = ''
}

//富文本
const handleContentChange = (data) => {
  formData.content = data.html
}

const sditorInstance = ref(null)
//富文本逻辑
const handleEditorCreated = (editor) => {
  sditorInstance.value = editor
  //编辑
  if (formData.content && editor) {
    //下一个渲染
    nextTick(() => {
      editor.setHtml(formData.content)
    })
  }
}
//预览按钮
const btnPreview = ref(false)

//提交
const formRef = ref()
const loading = ref(false)
//提交逻辑
const handleSubmit = () => {
  formRef.value.validate((valid, fields) => {
    //是否通过
    if (valid) {
      loading.value = true
    }
    console.log(formData, 'formData')
    const submitData = {
      ...formData,
      //标签转换为字符串
      tags: formData.tagArray.join(',')
    }
    delete submitData.tagArray
    if (!isEdit.value) {
      //新增
      submitData.id = businessId.value
      createArticle(submitData).then(res => {
        loading.value = false
        emit('success')
      })
    } else {
      //编辑
      updateArticle(props.article.id, submitData).then(res => {
        loading.value = false
        emit('success')
      })
    }
  })
}
</script>

<style scoped lang="scss">
.cover-placeholder {
  width: 200px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8b949e;
  background: #f6f8fa;
}

.cover-image {
  width: 200px;
  height: 120px;
  display: block;
}
</style>
