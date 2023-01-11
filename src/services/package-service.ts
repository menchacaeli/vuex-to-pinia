import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8888',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPackages() {
    return apiClient.get('/packages')
  },
  getPackage(id: string) {
    return apiClient.get('/packages/' + id)
  },
}
