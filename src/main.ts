import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { createApp } from "vue";

import "./style.css";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import VueI18n from "./utils/language";
import updateWebsite from "@/utils/updateWebsite";

// 引入修改的msg
import Message from "@/utils/ElementUIMsg";

// 引入css适配
import "@/utils/adaptation";

import "@/assets/font/index.css";

if (import.meta.env.MODE != "development") {
	updateWebsite();
}

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.config.globalProperties.$message = Message;

app.use(pinia).use(router).use(VueI18n).mount("#app");
