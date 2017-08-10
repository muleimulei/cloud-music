# 我的云音乐

> An electron-vue project

#### Build Setup

``` bash
# 首先下载到本地
git clone https://github.com/muleimulei/cloud-music.git

# 安装依赖
npm install

# 先打开服务器(服务器监听3000端口)
npm run server

# serve with hot reload at localhost:9080（打开客户端）
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

#### Express服务器说明

#路由
- /admin/addmusic : 添加歌曲
- /admin/addsonglist : 添加歌单

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
