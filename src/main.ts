import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/index'
import { createPinia } from 'pinia'

createApp(App).use(store).use(createPinia()).use(router).mount('#app')
