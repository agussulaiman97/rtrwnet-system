import axios from 'axios'

const api = axios.create({
  baseURL: '/billing-api/api'
})

export default api
