import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
import 'element-plus/dist/index.css'
import router from './router';
import App from './App.vue';
import VueI18n from './utils/language';

// 引入修改的msg
import Message from '@/utils/ElementUIMsg';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.config.globalProperties.$message = Message;

app.use(VueI18n).use(router).use(pinia).mount('#app')
