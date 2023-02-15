import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//引入router文件
import router from "./router";

//5.创建并挂载根实例
const app = createApp(App)
    //确保 _use_ 路由实例使
    //整个应用支持路由
    app.use(router)

    app.mount('#app')
