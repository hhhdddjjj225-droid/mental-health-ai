import service from '@/utils/request'
//登录
export function login(data){
  return service.post('/user/login',data)
}
//获取文章分类树
export function categoryTree(){
  return service.get('/knowledge/category/tree')
}
//获取文章分页列表
export function articlePage(params){
  return service.get('/knowledge/article/page',{params})
}
//上传文件到服务器的方法
export function uploadFile(file,businessInfo){
  const formData = new FormData()
  formData.append('file',file)
  formData.append('businessType','ARTICLE')
  formData.append('businessId',businessInfo.businessId)
  formData.append('businessField','cover')

  return service.post('/file/upload',formData,{headers:{'Content-Type':'multipart/form-data'}})
}
//创建文章
export function createArticle(data){
  return service.post('/knowledge/article',data)
}
//获取文章详情
export function getArticleDetail(id){
  return service.get(`/knowledge/article/${id}`)
}
//更新文章
export function updateArticle(id, data){
  return service.put(`/knowledge/article/${id}`,data)
}
//发布还是下线文章
export function changeArticleStatus(id,data){
  return service.put(`/knowledge/article/${id}/status`,data)
}
//删除文章
export function deleteArticle(id){
  return service.delete(`/knowledge/article/${id}`)
}
//咨询记录
//获取咨询记录分页列表
export function getConsultationsPage(params){
  return service.get('/psychological-chat/sessions',{params})
}
//获取咨询记录信息
export function getSessionDetail(sessionId){
  return service.get(`/psychological-chat/sessions/${sessionId}/messages`)
}
//获取情绪日志分页列表
export function getEmotionalPage(params){
  return service.get('/emotion-diary/admin/page',{params})
}
//删除情绪日志
export function deleteEmotional(id){
  return service.delete(`/emotion-diary/admin/${id}`)
}
//获取数据分析
export function getAnalyticsOverview(){
  return service.get(`/data-analytics/overview`)
}
//获取分析数据
export function getAnalyticsOverview(){
  return service.get(`/data-analytics/overview`)
}
//退出登录
export function logout(){
  return service.post('/user/logout')
}
