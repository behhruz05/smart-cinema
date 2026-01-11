import { useAuthStore } from '@/store/auth/auth.store'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

export default function Otp() {
  const [code, setCode] = useState('')
  const setOtpCode = useAuthStore((s) => s.setOtpCode)
  const router = useRouter()

  const submit = () => {
    if (code.length !== 6) return
    setOtpCode(code)
    router.push('/register')
  }

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      <Text className="text-white text-2xl mb-4">OTP kod</Text>

      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={6}
        className="bg-[#1c1c1e] text-white rounded-xl px-4 py-4 mb-6"
      />

      <Pressable onPress={submit} className="bg-white py-4 rounded-2xl">
        <Text className="text-center font-semibold">Davom etish</Text>
      </Pressable>
    </View>
  )
}
