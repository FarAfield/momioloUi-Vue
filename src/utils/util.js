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

/** ===========================  Theme   ================================== */
export const changeTheme = (theme = 'default') => {
  if(1){
    // todo
    return
  }
  const linkDom = document.getElementById('theme-style')
  if (linkDom) {
    linkDom.href = ThemeConfig.find((item) => item.key === theme)?.theme
  } else {
    const style = document.createElement('link')
    style.type = 'text/css'
    style.rel = 'stylesheet'
    style.id = 'theme-style'
    style.href = ThemeConfig.find((item) => item.key === theme)?.theme
    if (document.body.append) {
      document.body.append(style)
    } else {
      document.body.appendChild(style)
    }
  }
}
