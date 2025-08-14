import { defineStore } from "pinia";
export default defineStore("user", {
	state: () => {
		return {
			token: ""
		};
	},
	getters: {
		isLogin: state => state.token
	},
	actions: {
		setToken(token: string) {
			this.token = token;
		}
	},
	// 开启数据缓存
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage,
				paths: ["token"]
			}
		]
	}
});
