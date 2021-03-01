
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

/** ===========================  Form   ================================== */
export const filterObj = (obj = {}, list = []) => {
  let result = {}
  for (const key in obj) {
    if (list.includes(key)) {
      result = Object.assign(result, { [key]: obj[key] })
    }
  }
  return result
}



