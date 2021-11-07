import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import socket from '@/plugins/socket';

import VueCookies from 'vue3-cookies';

const app = createApp(App)
    .use(router)
    .use(VueCookies);

app.config.globalProperties.$socket = socket;

app.mount('#app');
