/*
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-02 14:58:23
 */
import axios from 'axios';
import UtilVar from "@/config/UtilVar";
import router from '@/router'
let baseUrl = UtilVar.baseUrl
const CancelToken = axios.CancelToken;
export { baseUrl };

// 请求拦截器
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  config.headers.common['Content-Type'] = "application/json;charset=utf-8";
  if (token) {
    config.headers.common['token'] = token;
  }
  return config;
}, function (error) {
  console.log(error)
  return Promise.reject(error);
});

/**
 * @响应拦截
 */
axios.interceptors.response.use(response => {
  if (response.status !== 200) {
    return Promise.reject(response)
  }
  if (response.data.code == 401) {
    // 后台管理token失效，跳转登录
    if (router.currentRoute.path.startsWith('/admin')) {
      localStorage.removeItem('token');
      router.push('/admin/login');
    }
  }
  return response.data
}, error => {
  console.error(error);
  let err = {
    success: false,
    msg: "未知异常，请联系管理员！"
  }
  return Promise.reject(err)
})

let configs_ENC = {
  headers: {
    'enc': UtilVar.ENC
  }
}

let isEncryptionParam = (params) => {
  return params
}

export const GET = async (url, params) => {
  try {
    params = isEncryptionParam(params)
    const data = await axios.get(`${baseUrl}${url}`, {
      params: params,
      headers: configs_ENC.headers
    }, configs_ENC);
    return data;
  } catch (error) {
    return error;
  }
}

export const GETNOBASE = async (url, params) => {
  try {
    const data = await axios.get(url, {
      params: params,
    });
    return data;
  } catch (error) {
    return error;
  }
}

export const POST = async (url, params) => {
  try {
    params = isEncryptionParam(params)
    const data = await axios.post(`${baseUrl}${url}`, params, configs_ENC);
    return data;
  } catch (error) {
    return error;
  }
}

export const PUT = async (url, params) => {
  try {
    params = isEncryptionParam(params)
    const data = await axios.put(`${baseUrl}${url}`, params, configs_ENC);
    return data;
  } catch (error) {
    return error;
  }
}

export const DELETE = async (url, params) => {
  try {
    params = isEncryptionParam(params)
    const data = await axios.delete(`${baseUrl}${url}`, {
      data: params,
      headers: configs_ENC.headers
    }, configs_ENC);
    return data;
  } catch (error) {
    return error;
  }
}

/**
 * @文件类型提交方法
 */
let configs = {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
}
export const FILESubmit = async (url, params, config) => {
  try {
    const data = await axios.post(`${baseUrl}${url}`, params, {
      ...configs,
      cancelToken: new CancelToken(function executor(c) {
        config.setCancel && config.setCancel(c)
      }),
      onUploadProgress: (e) => {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100;
        }
        config.onProgress && config.onProgress(e)
      },
    });
    return data;
  } catch (err) {
    return err;
  }
}

/**
 * 下载文档流
 */
export const FILE = async (config = {}, body, params) => {
  try {
    const data = await axios({
      method: config.method || 'get',
      url: `${baseUrl}${config.url}`,
      data: body,
      params: params,
      responseType: config.responseType || 'blob',
      onDownloadProgress: (e) => {
        config.onProgress && config.onProgress(e)
      },
    });
    return data;
  } catch (err) {
    return err;
  }
}
