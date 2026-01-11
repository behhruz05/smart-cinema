import { api } from './api'

export const sendOtp = (phone: string) =>
  api.post('/api/v1/auth/send-otp', { phone })

export const registerUser = (payload: {
  phone: string
  username: string
  password: string
  code: string
  full_name: string
  device_type: string
  device_name: string
  device_id: string
}) => api.post('/api/v1/auth/register', payload)
