import { View, Text } from 'react-native'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'

export default function Splash() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/login') // 🔥 SHU YERDA AUTH GA O‘TADI
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 24 }}>
        STAR CINEMA
      </Text>
    </View>
  )
}
