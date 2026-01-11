import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://temirovv.uz',
  timeout: 10000,
})
