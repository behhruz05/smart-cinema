import { registerUser } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth/auth.store'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

export default function Register() {
  const router = useRouter()
  const { phone, otpCode, setAuth } = useAuthStore()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const submit = async () => {
    if (!phone || !otpCode) return

    const res = await registerUser({
      phone,
      username,
      password,
      code: otpCode,
      full_name: fullName,
      device_type: 'mobile',
      device_name: 'iPhone',
      device_id: 'DEVICE_ID',
    })

    const { tokens, user } = res.data.data

    await setAuth({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      user,
    })

    router.replace('/(tabs)/home')
  }

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      <TextInput
        placeholder="Ism Familiya"
        onChangeText={setFullName}
        className="bg-[#1c1c1e] text-white rounded-xl px-4 py-4 mb-3"
      />
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        className="bg-[#1c1c1e] text-white rounded-xl px-4 py-4 mb-3"
      />
      <TextInput
        placeholder="Parol"
        secureTextEntry
        onChangeText={setPassword}
        className="bg-[#1c1c1e] text-white rounded-xl px-4 py-4 mb-6"
      />

      <Pressable onPress={submit} className="bg-white py-4 rounded-2xl">
        <Text className="text-center font-semibold">Register</Text>
      </Pressable>
    </View>
  )
}
