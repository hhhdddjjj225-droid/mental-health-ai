<img width="2486" height="1470" alt="动画 (3)" src="https://github.com/user-attachments/assets/56a923ba-8b03-48fc-978d-60bba51d583d" /># 心理健康AI助手

一个基于AI的心理健康助手平台，为用户提供情绪管理、心理咨询和知识文章浏览等功能，帮助用户缓解心理压力，获取心理健康相关资源。

## 项目简介

该项目是一个前端Vue 3应用，旨在通过AI技术为用户提供心理健康支持。主要功能包括：
- 智能心理咨询对话
- 情绪日记记录与管理
- 心理健康知识文章浏览
- 情绪状态可视化

## 技术栈

- **前端框架**：Vue 3 + Composition API
- **UI组件库**：Element Plus
- **状态管理**：Pinia
- **路由管理**：Vue Router
- **HTTP请求**：Axios
- **构建工具**：Vite
- **样式预处理**：SCSS

#### 🎬 效果演示
![AI流式对话演示]
<img width="2486" height="1470" alt="动画 (3)" src="https://github.com/user-attachments/assets/3528b279-84c7-40e5-836e-6af7b694b3dd" />

【用户端演示】
<img width="2486" height="1470" alt="动画 (6)" src="https://github.com/user-attachments/assets/3bd85eb3-1e1f-41c5-b682-00de5447f69f" />

【管理端演示】
<img width="2486" height="1470" alt="动画 (7)" src="https://github.com/user-attachments/assets/2a862b85-6d6e-4c27-9beb-bf1ffd5d2510" />

## 功能特性

### 1. 智能心理咨询
- 基于AI的实时对话系统
- 情绪识别与分析
- 个性化心理建议
- 会话历史管理

### 2. 情绪日记
- 情绪状态记录
- 情绪趋势分析
- 情绪花园可视化
- 历史数据管理

### 3. 知识文章
- 心理健康相关文章浏览
- 文章分类与搜索
- 文章详情查看
- 管理员文章管理

### 4. 用户系统
- 用户注册与登录
- 个人信息管理
- 权限控制

## 项目结构

```
├── src/
│   ├── api/              # API请求封装
│   ├── assets/           # 静态资源
│   ├── components/       # 通用组件
│   ├── config/           # 配置文件
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia状态管理
│   ├── utils/            # 工具函数
│   ├── views/            # 页面组件
│   ├── App.vue           # 根组件
│   ├── main.js           # 入口文件
│   └── style.css         # 全局样式
├── public/               # 公共资源
├── index.html            # HTML模板
├── package.json          # 项目配置
├── vite.config.js        # Vite配置
└── README.md             # 项目说明
```

## 安装与运行

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 环境配置

项目使用Vite的环境变量配置，可在`.env`文件中设置以下配置：

- `VITE_API_BASE_URL`：API基础地址
- `VITE_APP_TITLE`：应用标题

## 接口文档

### 前端API调用

- **用户认证**：`/api/user/login`, `/api/user/register`
- **心理咨询**：`/api/psychological-chat/*`
- **情绪日记**：`/api/emotion-diary/*`
- **知识文章**：`/api/knowledge/*`

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 贡献指南

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 许可证

本项目采用MIT许可证 - 详见[LICENSE](LICENSE)文件

## 联系方式

- 项目链接：[https://github.com/hhhdddjjj225-droid/mental-health-ai](https://github.com/hhhdddjjj225-droid/mental-health-ai)

---

感谢使用心理健康AI助手！希望它能为您的心理健康提供帮助和支持。
