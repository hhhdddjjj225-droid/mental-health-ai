import service from '@/utils/request'
//用户注册
export function register(data){
  return service.post('/user/add',data)
}
//开始会话
export const startSession = (data) => {
  return service.post('/psychological-chat/session/start',data)
}
//获取会话列表
export const getSessionList = (params) => {
  return service.get('/psychological-chat/sessions',{params})
}
//删除会话
export const deleteSession = (sessionId) => {
  return service.delete(`/psychological-chat/sessions/${sessionId}`)
}
//获取会话详情
export const getSessionDetail = (sessionId) => {
  return service.get(`/psychological-chat/sessions/${sessionId}/messages`)
}
//获取情绪
export const getSessionEmotion = (sessionId) => {
  return service.get(`/psychological-chat/session/${sessionId}/emotion`)
}
//添加情绪日记
export const addEmotionDiary = (data) => {
  return service.post('/emotion-diary',data)
}
//获取知识库列表
export const getKnowledgeList = (params) => {
  return service.get('/knowledge/article/page',{params})
}
//获取知识库详情
export const getKnowledgeDetail = (articleid) => {
  return service.get(`/knowledge/article/${articleid}`)
}