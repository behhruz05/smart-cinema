import { api } from './api'

/* =====================
   REGISTER / LOGIN OTP
===================== */

export const sendOtp = (phone: string) =>
  api.post('/api/v1/auth/send-otp', { phone })

export const verifyOtpRequest = (payload: {
  phone: string
  code: string
}) =>
  api.post('/api/v1/auth/send-otp', payload)

/* =====================
   FORGOT PASSWORD
===================== */

export const sendForgotPasswordOtp = (phone: string) =>
  api.post(
    '/api/v1/auth/forgot-password',
    { phone },
    { headers: { 'Accept-Language': 'uz' } }
  )

export const verifyForgotPasswordCode = (payload: {
  phone: string
  code: string
}) =>
  api.post(
    '/api/v1/auth/verify-reset-code',
    payload,
    { headers: { 'Accept-Language': 'uz' } }
  )

export const resetPasswordRequest = (payload: {
  reset_token: string
  new_password: string
}) =>
  api.post(
    '/api/v1/auth/reset-password',
    payload,
    { headers: { 'Accept-Language': 'uz' } }
  )
