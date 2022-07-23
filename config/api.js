const http = uni.$u.http

// 传code
export const postMenu = (params, config = {}) => http.post('/isUsed', params, config)

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const getMenu = (data) => http.get('/getData', data)