import { sendOtp } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth/auth.store'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

export default function Phone() {
  const [phone, setPhoneLocal] = useState('')
  const setPhone = useAuthStore((s) => s.setPhone)
  const router = useRouter()

  const submit = async () => {
    await sendOtp(phone)
    setPhone(phone)
    router.push('/otp')
  }

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      <Text className="text-white text-2xl mb-4">
        Telefon raqam
      </Text>

      <TextInput
        value={phone}
        onChangeText={setPhoneLocal}
        placeholder="+998..."
        keyboardType="phone-pad"
        className="bg-[#1c1c1e] text-white rounded-xl px-4 py-4 mb-6"
      />

      <Pressable onPress={submit} className="bg-white py-4 rounded-2xl">
        <Text className="text-center font-semibold">OTP yuborish</Text>
      </Pressable>
    </View>
  )
}
