import { Popup, Toast } from 'vant'
import 'vant/es/dialog/style'
import 'vant/es/toast/style'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'

createApp(App)
    .use(Toast)
    .use(Popup)
    .use(router)
    .use(store)
    .mount('#app')
