// src/axios.ts
import axios from 'axios';

//使用create方法创建axios实例
const service = axios.create({
  baseURL: '/chat',
  // timeout: 20000, // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    let configs: any = config;
    if (configs.url.includes('questionAnswer')) {
      configs.headers['Content-Type'] = 'multipart/form-data';
    } else {
      configs.headers['Content-Type'] = 'application/json;charset=utf-8';
    }
    let token;
    configs.headers.token = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function axiosPost(url: string, params: any = {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then((response) => {
        resolve(response.data || response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function axiosGet(url: string, params?: any) {
  return new Promise((resolve, reject) => {
    if (params) {
      service
        .get(url, { params })
        .then((response) => {
          resolve(response?.data || response);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      service
        .get(url)
        .then((response) => {
          resolve(response?.data || response);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

export default service;
