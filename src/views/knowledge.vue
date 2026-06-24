<template>
  <div>
    <!-- 页面标题 -->
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary" @click="handleEdit({})">新增</el-button>
      </template>
    </PageHead>
    <!-- 表格搜索 -->
    <TableSearch :formItem="formItem" @search="handleSearch" />
    <el-table :data="tableData" style="width: 100%; margin-top: 25px">
      <el-table-column label="文章标题" width="450" fixed="left">
        <!-- 插槽 -->
        <!-- 渲染文章标题 -->
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span>{{ categoryMap[scope.row.categoryId] }}</span>
          </div>
        </template>
        <!-- 渲染分类名称 -->
      </el-table-column>
      <el-table-column prop="authorName" label="作者" width="150" />
      <el-table-column prop="readCount" label="阅读量" width="100" />
      <el-table-column prop="updatedAt" label="发布时间" width="150" />
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button text type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="handlePublish(scope.row)" v-if="scope.row.status === 0 || scope.row.status === 2" text
            type="success">发布</el-button>
          <el-button @click="handleUnpublish(scope.row)" v-if="scope.row.status === 1" text
            type="warning">下线</el-button>
          <el-button @click="handleDelete(scope.row)" text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 25px" :page-size="pagination.size" layout="prev, pager, next"
      :total="pagination.total" @change="handleChange" />
    <!-- 文章弹窗 -->
    <ArticleDialog v-model:modelValue="dialogVisible" :article="currentArticle" :categories="categories"
      @success="handleSuccess" />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import PageHead from "@/components/PageHead.vue";
import TableSearch from "@/components/TableSearch.vue";
import { categoryTree, articlePage, getArticleDetail, changeArticleStatus, deleteArticle } from "@/api/admin";
import ArticleDialog from "@/components/ArticleDialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";
//传递查询参数给子组件
const formItem = [
  {
    comp: "input",
    prop: "title",
    label: "文章标题",
    placeholder: "请输入文章标题",
  },
  {
    comp: "select",
    prop: "categoryId",
    label: "分类",
    placeholder: "请选择分类",
  },
  {
    comp: "select",
    prop: "status",
    label: "状态",
    placeholder: "请选择状态",
    options: [
      {
        label: "草稿",
        value: 0,
      },
      {
        label: "已发布",
        value: 1,
      },
      {
        label: "已下线",
        value: 2,
      },
    ],
  },
];
//分页参数
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});
//查询
const handleSearch = async (formData) => {
  console.log(formData, "查询参数");

  const params = {
    ...pagination,
    ...formData,
  };
  //解构获得的列表数据
  const { records, total } = await articlePage(params);
  tableData.value = records;
  pagination.total = total;
};
//分页按钮操作
const handleChange = (page) => {
  pagination.currentPage = page;
  handleSearch();
};
//分类映射
const categoryMap = reactive({});
//分类列表
const categories = ref([]);
//列表数据
const tableData = ref([]);
//新增和编辑
const dialogVisible = ref(false);
//当前文章
const currentArticle = ref(null);
//新增和编辑成功后，刷新列表
const handleSuccess = () => {
  dialogVisible.value = false
  handleSearch()
}
const handleEdit = (row) => {
  if (!row.id) {//新增
    dialogVisible.value = true
    currentArticle.value = null
  } else {//编辑
    getArticleDetail(row.id).then(res => {
      console.log(res, '文章详情');
      currentArticle.value = res
      dialogVisible.value = true
    })
  }

}

//发布和下线
const handlePublish = (row) => {
  //弹窗确认
  ElMessageBox.confirm(`确认发布文章${row.title}吗？`,
    '确认', {
    confirmButtonText: '确认发布',
    cancelButtonText: '取消',
    type: 'info',
  }).then(() => {
    // 发布文章
    changeArticleStatus(row.id, { status: 1 }).then(res => {
      ElMessage.success('发布成功')
      handleSearch()
    })
  })
}
const handleUnpublish = (row) => {
  ElMessageBox.confirm(`确认下线文章${row.title}吗？`,
    '确认', {
    confirmButtonText: '确认下线',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    // 下线文章
    changeArticleStatus(row.id, { status: 2 }).then(res => {
      ElMessage.success('下线成功')
      handleSearch()
    })
  })
}

//删除
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除文章${row.title}吗？`,
    '确认', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'danger',
  }).then(() => {
    // 删除文章
    deleteArticle(row.id).then(res => {
      ElMessage.success('删除成功')
      handleSearch()
    })
  })
}


onMounted(async () => {
  const data = await categoryTree();
  categories.value = data.map((item) => {
    //将分类id映射到分类名称
    categoryMap[item.id] = item.categoryName;
    return {
      label: item.categoryName,
      value: item.id,
    };
  });
  console.log(categories.value);

  formItem[1].options = categories.value;
  //获取列表
  handleSearch();
});

</script>

<style scoped></style>
