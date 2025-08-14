import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { createApp } from "vue";

// 引入修改的msg
import message from "@/utils/ElementUIMsg";
import updateWebsite from "@/utils/updateWebsite";

import "element-plus/dist/index.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import VueI18n from "./utils/language";

// 引入css适配
import "@/utils/adaptation";

import "@/assets/font/index.css";

if (import.meta.env.MODE != "development") {
	updateWebsite();
}

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.config.globalProperties.$message = message;

app.use(pinia).use(router).use(VueI18n).mount("#app");
