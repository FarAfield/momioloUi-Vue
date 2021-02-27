import { ThemeConfig } from './constant'


/** ===========================  Token   ================================== */
export function isLogin() {
  return !!sessionStorage.getItem('token')
}
export function setToken(token) {
  sessionStorage.setItem('token', token)
}
export function getToken() {
  return sessionStorage.getItem('token')
}
export function storageClear() {
  sessionStorage.clear()
}

/** ===========================  Response   ================================== */
export const isSuccess = (response) => {
  return response?.statusCode === '0'
}


