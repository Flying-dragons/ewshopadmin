import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import '@/style/tailwind.css'
import '@/style/index.css'

//导入pinia(菠萝)
import { createPinia } from 'pinia'

//引入router文件
import router from "./router";

//创建pinia实例
const pinia = createPinia()

//5.创建并挂载根实例
const app = createApp(App)
    //确保 _use_ 路由实例使
    //整个应用支持路由
    app.use(router)
    //将pinia挂载到应用程序
    app.use(pinia)

    app.mount('#app')
