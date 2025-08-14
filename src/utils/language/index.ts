// 语言
import { createI18n } from "vue-i18n"; // 引入vue-i18n组件

import CH from "./lang/CH";
import EN from "./lang/EN";
const langs = ["CH", "EN"];
const lang = String(localStorage.getItem("locale") || "EN");
// import { 引入的组件 export 出来的 变量} from 'vue-i18n'
// 注册i8n实例并引入语言文件
const i18n = createI18n({
	warnHtmlInMessage: "off",
	legacy: false, // you must set `false`, to use Composition API
	locale: langs.includes(lang) ? lang : "EN", // 默认显示的语言
	fallbackLocale: "EN", // set fallback locale
	globalInjection: true,
	messages: {
		CH, // 引入语言文件
		EN
	}
});
export default i18n; // 将i18n暴露出去，在main.js中引入挂载
