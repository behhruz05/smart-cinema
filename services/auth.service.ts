import { api } from './api'

// 1️⃣ OTP yuborish
export const sendOtp = (phone: string) =>
  api.post('/api/v1/auth/send-otp', { phone })

// 2️⃣ REGISTER (OTP shu yerda tekshiriladi)
export const registerUser = (payload: {
  phone: string
  username: string
  password: string
  code: string
  full_name: string
  device_type: string
  device_name: string
  device_id: string
  notification_id: string
}) => api.post('/api/v1/auth/register', payload)

export const loginUser = (payload: {
  login_type: 'phone'
  phone: string
  password: string
  device_id: string
  device_type: string
  device_name: string
  notification_id: string
}) => api.post('/api/v1/auth/login', payload)