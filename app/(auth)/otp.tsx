import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '@/store/auth/auth.store'
import { registerUser } from '@/services/auth.service'
import { sendOtp } from '@/services/otp.service'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Device from 'expo-device'

export default function Otp() {
  const router = useRouter()
  const { phone, profileData, setAuth, clearRegistrationData } = useAuthStore()

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(48)
  const [otpStatus, setOtpStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const inputRefs = useRef<(TextInput | null)[]>([])

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleChangeText = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return

    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)
    setOtpStatus('idle')

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = async () => {
    if (countdown > 0 || !phone) return

    setLoading(true)
    try {
      await sendOtp(phone)
      setCountdown(48)
      setOtp(['', '', '', '', '', ''])
      setOtpStatus('idle')
      Alert.alert('Muvaffaqiyatli', 'OTP kod qayta yuborildi')
    } catch (error: any) {
      Alert.alert('Xatolik', error.response?.data?.message || 'OTP yuborishda xatolik')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    const code = otp.join('')
    
    if (code.length !== 6) {
      Alert.alert('Xatolik', '6 raqamli kodni to\'liq kiriting')
      return
    }

    if (!phone || !profileData) {
      Alert.alert('Xatolik', 'Ma\'lumotlar topilmadi')
      router.replace('/(auth)/register')
      return
    }

    setLoading(true)
    try {
      const deviceId = await Device.osBuildIdAsync() || Date.now().toString()
      
      const res = await registerUser({
        phone,
        username: profileData.username,
        password: profileData.password,
        code,
        full_name: profileData.full_name,
        birth_date: profileData.birth_date,
        device_type: Device.osName || 'mobile',
        device_name: Device.modelName || 'Unknown',
        device_id: deviceId,
        notification_id: 'temp_notification_id'
      })

      const { tokens, user } = res.data.data

      await setAuth({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        user
      })

      setOtpStatus('success')
      clearRegistrationData()

      setTimeout(() => {
        router.replace('/(tabs)/home')
      }, 500)

    } catch (error: any) {
      setOtpStatus('error')
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          'Kod noto\'g\'ri'
      Alert.alert('Xatolik', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      <View className="flex-1 justify-between py-8">
        <View>
          <Text className="text-gray-400 text-sm mb-6">Sign up / OTP</Text>
          
          <Text className="text-white text-3xl font-semibold mb-2">
            Подтвердите номер телефона
          </Text>
          <Text className="text-gray-400 mb-8">
            Введите код из SMS, отправленный на номер {phone || '+998900000000'}
          </Text>

          {/* OTP Inputs */}
          <View className="flex-row justify-between mb-6">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                className={`w-14 h-14 bg-[#1c1c1e] text-white text-center text-2xl rounded-xl ${
                  otpStatus === 'success' ? 'border-2 border-green-500' : 
                  otpStatus === 'error' ? 'border-2 border-red-500' : 
                  digit ? 'border-2 border-blue-500' : ''
                }`}
              />
            ))}
          </View>

          {/* Countdown */}
          <Text className="text-gray-400 text-center mb-4">
            Отправить код повторно можно через {Math.floor(countdown / 60)}:
            {(countdown % 60).toString().padStart(2, '0')}
          </Text>
        </View>

        <Pressable
          onPress={handleSubmit}
          disabled={loading}
          className={`rounded-2xl py-4 ${loading ? 'bg-gray-700' : 'bg-white'}`}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text className="text-black text-center text-lg font-semibold">
              Подтвердить
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  )
}