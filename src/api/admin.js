import { http } from "~/utils/http";

export const apiGet = (params) => {
  return http.request(
    "get",
    "/app/activity/findAll",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: false, // 是否需要token
    }
  );
};
export const apiPost = (data) => {
  return http.request(
    "post",
    "/back/galleryType/findAll",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 登录
export const getLogin = (data) => {
  return http.request(
    "post",
    "/auth/login",
    { data },
    {
      isNeedToken: false, // 是否需要token
    }
  );
};
// 登录
export const refreshTokenApi = (data) => {
  return http.request(
    "post",
    "/auth/refreshToken",
    { data },
    {
      isNeedToken: false, // 是否需要token
    }
  );
};
