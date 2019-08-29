import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
  baseURL: 'http://localhost:3333/admin/api'
})


http.interceptors.request.use((config) => {

  if (localStorage.token) {
    config.headers.Authorization = "Bearer" + localStorage.token
  }
  return config
}, (err) => {
  return Promise.reject(err)
})


http.interceptors.response.use((res) => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  if (err.response.status === 401) {//如果未登录跳转到登录页面
    router.push('/login')
  }

  return Promise.reject(err)
})
export default http