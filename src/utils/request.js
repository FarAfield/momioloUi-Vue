import axios from 'axios'
import store from '../store'
import { message } from 'ant-design-vue'
import { getToken, storageClear } from './util'
import { requestConfig } from './constant'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 创建 axios 实例
const request = axios.create({
  // 请求的默认前缀
  baseURL: '/base',
  timeout: 30000 // 请求超时时间
})

const maxCountMessage = message
maxCountMessage.config({ maxCount: 1 })

// 异常拦截处理器
const errorHandler = (error) => {
  const { response } = error
  if (!response) {
    maxCountMessage.error('请求超时')
    return { status: 408, statusText: '请求超时' }
  } else if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status, url } = response
    console.log(`请求状态:${status}  请求路径${url}`)
    maxCountMessage.error(errorText)
  }
  return response
}

// request interceptor
request.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use(async (response) => {
  if (response.status === 200) {
    const res = await response?.data
    if (res && res.statusCode) {
      if (res.statusCode === requestConfig['TOKEN_INVALID_ERROR']) {
        maxCountMessage.error('登陆已失效，请重新登陆')
        storageClear()
        window.location.reload() // 清除token,重载页面使之跳转登录
        return {}
      } else if (res.statusCode === requestConfig['UNAUTHORIZED_ERROR']) {
        maxCountMessage.error('抱歉，您暂无此权限')
        return {}
      } else if (res.statusCode !== '0') {
        console.log(res.statusMessage)
      }
    }
  }
  return response?.data
}, errorHandler)

export default request
