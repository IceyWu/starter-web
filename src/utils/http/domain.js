/**
 * 接口域名的管理
 * @param {String} apiServer [api服务器]
 * @param {String} otherServer [其他服务器]
 */
const domainLsit = [
  {
    apiServer: 'http://x.x.x.x:12345', //开发服务 0
    otherServer: 'http://x.x.x.x/section', //开发服务器 1
  },
]
// vite
const ServerNumber = import.meta.env.VITE_APP_SERVER_ID
  ? import.meta.env.VITE_APP_SERVER_ID
  : 0

// 地址对象 
export const baseUrl = domainLsit[ServerNumber]

// api接口
export const apiServer = baseUrl.apiServer

export default baseUrl
