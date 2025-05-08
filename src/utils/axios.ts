import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";

// 动态设置 baseURL
const baseURL = import.meta.env.VITE_BASE_URL; // 开发环境默认值

// 创建 axios 实例
const service: AxiosInstance = axios.create({
	baseURL,
	timeout: 20000 // 超时时间
});

// 请求取消源集合
const cancelTokens: Record<string, CancelTokenSource> = {};

// 全局错误提示函数（可根据实际项目替换为 UI 提示组件，如 Toast）
const showError = (message: string) => {
	console.error("Error:", message);
	// TODO: 替换为实际的 UI 提示组件调用
};

// 请求拦截器
service.interceptors.request.use(
	config => {
		const token = ""; // 替换为获取 token 的逻辑
		config.headers = config.headers || {}; // 确保 headers 存在

		if ((config.url || "").includes("questionAnswer")) {
			config.headers["Content-Type"] = "multipart/form-data";
		} else {
			config.headers["Content-Type"] = "application/json;charset=utf-8";
		}

		// 添加 token 到请求头
		if (token) {
			config.headers.token = token;
		}

		// 添加请求取消支持
		if (config.url) {
			cancelTokens[config.url] = axios.CancelToken.source();
			config.cancelToken = cancelTokens[config.url].token;
		}

		return config;
	},
	error => {
		showError("Request error.");
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response: AxiosResponse) => {
		const res = response.data || {};
		res.code = res.code || response.status; // 保证 code 的统一性

		// 处理非成功状态码
		if (res.code !== 0 && res.code !== 200) {
			if (res.code === -14) {
				showError("Token expired.");
				// TODO: 清除缓存或跳转到登录页面逻辑
				return Promise.reject(new Error("Token expired."));
			}
			showError(res.message || res.msg || "Unknown Error");
			return Promise.reject(new Error(res.message || res.msg || "Unknown Error"));
		}

		return res; // 返回成功数据
	},
	error => {
		if (axios.isCancel(error)) {
			console.warn("Request canceled:", error.message);
		} else {
			showError("Response error.");
		}
		return Promise.reject(error);
	}
);

type ResponseBody = {
	code: number;
	data: any;
	msg: string;
};

// POST 请求封装
export function axiosPost<T = ResponseBody>(url: string, params: any): Promise<T> {
	return service.post(url, params).then(response => response.data);
}

// GET 请求封装
export function axiosGet<T = ResponseBody>(url: string, params?: any): Promise<T> {
	console.log("baseURL", baseURL);
	return service.get(url, { params }).then(response => response.data);
}

// 批量请求封装
export function axiosAll(requests: Array<Promise<any>>): Promise<any[]> {
	return axios.all(requests).then(axios.spread((...responses) => responses));
}

// 取消特定请求
export function cancelRequest(url: string) {
	if (cancelTokens[url]) {
		cancelTokens[url].cancel(`Request to ${url} canceled.`);
		delete cancelTokens[url];
	}
}

// 取消所有请求
export function cancelAllRequests() {
	Object.keys(cancelTokens).forEach(url => cancelRequest(url));
}

export default service;
