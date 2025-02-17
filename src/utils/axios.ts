import axios, { CancelTokenSource } from "axios";
import useStore from "@/store";

// 使用create方法创建axios实例
const service = axios.create({
	baseURL: "/api",
	timeout: 30000 // 请求超时时间
});

const cancelTokens: Record<string, CancelTokenSource> = {};

// 添加请求拦截器
service.interceptors.request.use(
	config => {
		const configs: any = config;
		if (configs.url.includes("upload")) {
			configs.headers["Content-Type"] = "multipart/form-data";
		} else {
			configs.headers["Content-Type"] = "application/json;charset=utf-8";
		}
		const { user } = useStore();
		let token = user.token;
		if (token) configs.headers.token = token;

		if (config.url) {
			cancelTokens[config.url] = axios.CancelToken.source();
			config.cancelToken = cancelTokens[config.url].token;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

//添加响应拦截器
service.interceptors.response.use(
	async response => {
		let res = response.data || response;
		res.code = res.code || response.status;
		if (res.code != 0 && res.code != 200) {
			//token过期的操作
			return Promise.reject(new Error(res.message || res.msg || "Error"));
		}
		return res;
	},
	error => {
		console.log("err" + error);
		return Promise.reject(error);
	}
);

export function axiosPost(url: string, params: any = {}): Promise<any> {
	return new Promise((resolve, reject) => {
		service
			.post(url, params)
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function axiosGet(url: string, params?: any): Promise<any> {
	return new Promise((resolve, reject) => {
		service
			.get(url, params ? { params } : {})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function axiosAll(requests: Array<Promise<any>>): Promise<any[]> {
	return axios.all(requests).then(axios.spread((...responses) => responses));
}

export function cancelRequest(url: string) {
	if (cancelTokens[url]) {
		cancelTokens[url].cancel(`Request to ${url} canceled.`);
		delete cancelTokens[url];
	}
}

export function cancelAllRequests() {
	Object.keys(cancelTokens).forEach(url => cancelRequest(url));
}

export default service;
