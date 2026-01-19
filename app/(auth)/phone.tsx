import { sendOtp } from '@/services/otp.service'
import { useAuthStore } from '@/store/auth/auth.store'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Phone() {
  const router = useRouter()
  const { setPhone, profileData } = useAuthStore()

  const [phoneLocal, setPhoneLocal] = useState('+998')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!phoneLocal || phoneLocal.length < 13) {
      Alert.alert('Xatolik', 'To\'g\'ri telefon raqamni kiriting')
      return
    }

    if (!acceptedTerms) {
      Alert.alert('Xatolik', 'Foydalanuvchi shartnomasi va maxfiylik siyosatini qabul qiling')
      return
    }

    if (!profileData) {
      Alert.alert('Xatolik', 'Profil ma\'lumotlari topilmadi')
      router.replace('/(auth)/register')
      return
    }

    setLoading(true)
    try {
      await sendOtp(phoneLocal)
      setPhone(phoneLocal)
      router.push('/(auth)/otp')
    } catch (error: any) {
      Alert.alert(
        'Xatolik', 
        error.response?.data?.message || 'OTP yuborishda xatolik yuz berdi'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      <View className="flex-1 justify-between py-8">
        <View>
          <Text className="text-gray-400 text-sm mb-6">Sign up / Phone number</Text>
          
          <Text className="text-white text-3xl font-semibold mb-2">
            Введите номер телефона
          </Text>
          <Text className="text-gray-400 mb-8">
            Введите свой номер, чтобы продолжить регистрацию
          </Text>

          {/* Phone Input */}
          <View className="mb-6">
            <Text className="text-gray-400 text-sm mb-2">Номер телефона</Text>
            <TextInput
              value={phoneLocal}
              onChangeText={setPhoneLocal}
              placeholder="+998"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
              maxLength={13}
              className="bg-[#1c1c1e] text-white rounded-xl px-4 py-4"
            />
          </View>

          {/* Terms Checkbox */}
          <Pressable 
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            className="flex-row items-start mb-6"
          >
            <View className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
              acceptedTerms ? 'bg-blue-500 border-blue-500' : 'border-gray-600'
            }`}>
              {acceptedTerms && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-gray-400 flex-1">
              Я принимаю{' '}
              <Text className="text-blue-400">Пользовательское соглашение</Text>
              {' '}и{' '}
              <Text className="text-blue-400">Политику конфиденциальности</Text>
            </Text>
          </Pressable>
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
              Отправить код
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
