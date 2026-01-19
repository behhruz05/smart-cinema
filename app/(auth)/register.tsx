import { useAuthStore } from '@/store/auth/auth.store'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Register() {
  const router = useRouter()
  const { setProfileData } = useAuthStore()

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateFields = (): boolean => {
    if (!fullName.trim()) {
      Alert.alert('Xatolik', 'Familiyangizni kiriting')
      return false
    }
    if (!username.trim()) {
      Alert.alert('Xatolik', 'Username kiriting')
      return false
    }
    if (username.length < 3) {
      Alert.alert('Xatolik', 'Username kamida 3 ta belgidan iborat bo\'lishi kerak')
      return false
    }
    if (!birthDate.trim()) {
      Alert.alert('Xatolik', 'Tug\'ilgan sanangizni kiriting (DD.MM.YYYY)')
      return false
    }
    if (!password || password.length < 6) {
      Alert.alert('Xatolik', 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
      return false
    }
    if (password !== confirmPassword) {
      Alert.alert('Xatolik', 'Parollar mos kelmadi')
      return false
    }
    return true
  }

  const handleSubmit = () => {
    if (!validateFields()) return

    setProfileData({
      full_name: fullName,
      username,
      birth_date: birthDate,
      password
    })

    router.push('/(auth)/phone')
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-gray-400 text-sm mb-6">Sign up</Text>
        
        <Text className="text-white text-3xl font-semibold mb-2">
          Создание профиля
        </Text>
        <Text className="text-blue-400 text-sm mb-8">
          Заполните данные для регистрации
        </Text>

        {/* Фамилия */}
        <View className="mb-4">
          <Text className="text-gray-400 text-sm mb-2">Фамилия</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Введите фамилию"
            placeholderTextColor="#666"
            className="bg-[#1c1c1e] text-white rounded-xl px-4 py-4"
          />
        </View>

        {/* Имя (Username) */}
        <View className="mb-4">
          <Text className="text-gray-400 text-sm mb-2">Имя</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Введите имя"
            placeholderTextColor="#666"
            autoCapitalize="none"
            className="bg-[#1c1c1e] text-white rounded-xl px-4 py-4"
          />
        </View>

        {/* Дата рождения */}
        <View className="mb-4">
          <Text className="text-gray-400 text-sm mb-2">Дата рождения</Text>
          <View className="relative">
            <TextInput
              value={birthDate}
              onChangeText={setBirthDate}
              placeholder="ДД.ММ.ГГГГ"
              placeholderTextColor="#666"
              keyboardType="numbers-and-punctuation"
              className="bg-[#1c1c1e] text-white rounded-xl px-4 py-4 pr-12"
            />
            <View className="absolute right-4 top-4">
              <Ionicons name="calendar-outline" size={20} color="#666" />
            </View>
          </View>
        </View>

        {/* Пароль */}
        <View className="mb-4">
          <Text className="text-gray-400 text-sm mb-2">Пароль</Text>
          <View className="relative">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Введите пароль"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              className="bg-[#1c1c1e] text-white rounded-xl px-4 py-4 pr-12"
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              <Ionicons 
                name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                size={20} 
                color="#666" 
              />
            </Pressable>
          </View>
        </View>

        {/* Подтвердите пароль */}
        <View className="mb-8">
          <Text className="text-gray-400 text-sm mb-2">Подтвердите пароль</Text>
          <View className="relative">
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Введите пароль еще раз"
              placeholderTextColor="#666"
              secureTextEntry={!showConfirmPassword}
              className="bg-[#1c1c1e] text-white rounded-xl px-4 py-4 pr-12"
            />
            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-4"
            >
              <Ionicons 
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} 
                size={20} 
                color="#666" 
              />
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={handleSubmit}
          className="bg-white rounded-2xl py-4"
        >
          <Text className="text-black text-center text-lg font-semibold">
            Зарегистрироваться
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}