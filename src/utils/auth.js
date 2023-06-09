import Cookies from "js-cookie";
import { getSessionStorage, setSessionStorage } from "@/utils";

// import { useUserStore } from '@/store/user'

export const sessionKeyBase = "user-info";
export const TokenKeyBase = "authorized-token";

/** 获取`token` */
export function getToken(role = "") {
  const TokenKey = role ? `${role}-${TokenKeyBase}` : TokenKeyBase;
  const sessionKey = role ? `${role}-${sessionKeyBase}` : sessionKeyBase;
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : getSessionStorage(sessionKey);
}

/** 设置`token`以及key值为`user-info`的session信息 */
export function setToken(data = {}, role = "") {
  const TokenKey = role ? `${role}-${TokenKeyBase}` : TokenKeyBase;
  console.log("setToken", data);
  const { access_token, refresh_token, expires_in } = data || {};
  // const expires = expires_in ? new Date().getTime() + expires_in * 1000 : 0
  const expires = expires_in ? expires_in * 1000 : 0;
  console.log("expires", expires);
  const cookieString = JSON.stringify({ access_token, expires });
  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: expires / 86400000,
      })
    : Cookies.set(TokenKey, cookieString);
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
  Cookies.remove(TokenKey);
  sessionStorage.clear();
}

/** 格式化token（jwt格式） */
export const formatToken = (token) => {
  return "Bearer " + token;
};
