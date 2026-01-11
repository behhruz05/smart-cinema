import { api } from './api'

export const sendOtpRequest = async (phone: string) => {
  const res = await api.post('/api/v1/auth/send-otp', { phone })
  return res.data
}

export const verifyOtpRequest = async (payload: {
  phone: string
  code: string
}) => {
  const res = await api.post('/api/v1/auth/send-otp', payload)
  return res.data // { token }
}
