import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import socket from '@/plugins/socket';

const app = createApp(App).use(router);

app.config.globalProperties.$socket = socket;

app.mount('#app');
