import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import "element-plus/dist/index.css";
import router from "./router";
import App from "./App.vue";
import VueI18n from "./utils/language";

// 引入字体包文件
import "@/assets/font/index.css";

// 引入修改的msg
import Message from "@/utils/ElementUIMsg";

// 引入css适配
import "@/utils/adaptation.js";

import updateWebsite from "@/utils/updateWebsite";

if(import.meta.env.MODE != "development"){
    updateWebsite();
}

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.config.globalProperties.$message = Message;

app.use(VueI18n).use(router).use(pinia).mount("#app");
