import Axios from "axios";
import { apiServer, commentsToken } from "./domain.js";
import NProgress from "../progress";
import { setToken, getToken, formatToken } from "@/utils/auth";
import { showToast } from "vant";

const defaultConfig = {
  // baseURL: VITE_PROXY_DOMAIN_REAL,
  // 当前使用mock模拟请求，将baseURL制空
  baseURL: apiServer["baseServer"],
  // 请求超时时间
  timeout: 12000,
  // headers: {
  //   Accept: "application/json, text/plain, */*",
  //   "Content-Type": "application/json",
  //   "X-Requested-With": "XMLHttpRequest",
  // },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  // paramsSerializer: {
  //   serialize: stringify as unknown as CustomParamsSerializer,
  // },
};

class PureHttp {
  constructor() {
    PureHttp.httpInterceptorsResponse();

    PureHttp.httpInterceptorsRequest();
  }
  /** token过期后，暂存待执行的请求 */
  static requests = [];

  /** 防止重复刷新token */
  static isRefreshing = false;

  /** 初始化配置对象 */
  static initConfig = {};

  /** 保存当前Axios实例对象 */
  static axiosInstance = Axios.create(defaultConfig);

  // 是否返回全部数据
  static isNeedFullRes = false;

  // 是否显示loading
  static isShowLoading = false;

  // 是否需要token
  static isNeedToken = true;

  // 是否是上传
  static isUpload = false;

  // 根据角色切换token
  static tokenRoleName = "";

  // servername
  static serverName = "baseServer";

  // 接口是否异常
  static isApiError = false;
  // 业务异常code名单
  static errorCodes = [401];

  // 请求拦截器
  static httpInterceptorsRequest() {
    PureHttp.axiosInstance.interceptors.request.use(
      async (config) => {
        // console.log('config',config)
        const {
          isNeedToken = true,
          isNeedFullRes = false,
          isShowLoading = false,
          isUpload = false,
          tokenRoleName = "student",
          serverName = "",
        } = config;
        PureHttp.isNeedToken = isNeedToken;
        PureHttp.isShowLoading = isShowLoading;
        PureHttp.isNeedFullRes = isNeedFullRes;
        // 开启进度条动画
        if (PureHttp.isShowLoading && !PureHttp.isApiError) {
          NProgress.start();
        }
        if (serverName) {
          config.baseURL = apiServer[serverName] || apiServer["baseServer"];
        }

        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(config);
          return config;
        }
        if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback(config);
          return config;
        }

        return PureHttp.isNeedToken
          ? new Promise((resolve) => {
              const token = tokenRoleName
                ? getToken(tokenRoleName)
                : getToken();
              const { access_token, expires_in } = token || {};
              if (access_token) {
                const now = new Date().getTime();
                const expired = parseInt("" + expires_in) - now <= 0;
                if (expired) {
                  console.log("token过期");
                  resolve(config);
                } else {
                  // console.log('token未过期', access_token)
                  config.headers.Authorization = formatToken(access_token);
                  resolve(config);
                }
              } else {
                console.log("token不存在");
                resolve(config);
              }
            })
          : config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截器
  static httpInterceptorsResponse() {
    PureHttp.axiosInstance.interceptors.response.use(
      (response) => {
        // 关闭进度条动画
        if (PureHttp.isShowLoading && !PureHttp.isApiError) {
          NProgress.done();
        }

        const { code } = response.data;
        // 业务异常code名单
        if (PureHttp.errorCodes.includes(code)) {
          PureHttp.isApiError = true;
          // 业务异常逻辑
          showToast("请求异常，请稍后再试");
          // ElMessage({
          //   message: '请求异常，请稍后再试',
          //   type: 'error',
          // })
          console.log("请求异常，请稍后再试");
          return response;
          // return Promise.reject(response)
        }

        const tempResponse = ({} = PureHttp.isNeedFullRes
          ? response
          : response.data);

        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof response.config.afterResponseCallback === "function") {
          response.config.afterResponseCallback(response);
          return tempResponse;
        }
        if (PureHttp.initConfig.afterResponseCallback) {
          PureHttp.initConfig.afterResponseCallback(response);
          return tempResponse;
        }

        return tempResponse;
      },
      (error) => {
        console.log("error", error);
        // 关闭进度条动画
        if (!PureHttp.isApiError) {
          NProgress.done();
        }
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof error.config.afterResponseCallback === "function") {
          error.config.afterResponseCallback(error);
          return Promise.resolve({
            msg: "请求异常，请稍后再试",
            ...error,
          });
        }
        if (PureHttp.initConfig.afterResponseCallback) {
          PureHttp.initConfig.afterResponseCallback(error);
          return Promise.resolve({
            msg: "请求异常，请稍后再试",
            ...error,
          });
        }
        return Promise.resolve({
          msg: "请求异常，请稍后再试",
          ...error,
        });
      }
    );
  }

  /** 通用请求工具函数 */
  request(method, url, param = {}, axiosConfig = {}) {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    };
    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export const http = new PureHttp();
