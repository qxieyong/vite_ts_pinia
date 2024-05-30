// 引入所有模块
import useUserStore from "./module/user"; // 用户相关

// 整合模块,统一导出
export default function Store() {
	return {
		user: useUserStore()
	};
}
