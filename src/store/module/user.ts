import { defineStore } from "pinia";
export default defineStore("user", {
  state: () => {
    return {
      
    };
  },
  getters: {

  },
  actions: {

  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['address', 'isLogin', 'lang'],
      },
    ],
  }
});
