import request from '../utils/request'

/**
 *   get方法
 */
export async function getData ({ url, ...params }) {
  return request({
    url,
    method: 'get',
    params
  })
}
/**
 *  post方法
 */
export async function postData ({ url, ...params }) {
  return request({
    url,
    method: 'post',
    data: params
  })
}
/**
 *  post方法
 */
export async function postParams ({ url, ...params }) {
  return request({
    url,
    method: 'post',
    params
  })
}
/**
 *  post方法
 */
export async function postList ({ url, list }) {
  return request({
    url,
    method: 'post',
    data: list
  })
}
/**
 *  put方法
 */
export async function putData ({ url, ...params }) {
  return request({
    url,
    method: 'put',
    data: params
  })
}
/**
 *  put方法
 */
export async function putParams ({ url, ...params }) {
  return request.put({
    url,
    method: 'put',
    params
  })
}
/**
 *  put方法
 */
export async function putList ({ url, list }) {
  return request({
    url,
    method: 'put',
    data: list
  })
}
/**
 *  delete方法
 */
export async function remove ({ url }) {
  return request({
    url,
    method: 'delete'
  })
}
