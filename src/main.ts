import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
import { Toast, Popup } from 'vant'
import 'vant/es/toast/style'

createApp(App)
    .use(Toast)
    .use(Popup)
    .use(router)
    .use(store)
    .mount('#app')
