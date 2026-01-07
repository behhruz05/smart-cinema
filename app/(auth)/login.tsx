import { View, Text, Button } from 'react-native'
import { useRouter } from 'expo-router'

export default function Login() {
  const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#fff', marginBottom: 20 }}>
        LOGIN
      </Text>

      <Button
        title="Login (mock)"
        onPress={() => router.replace('/(tabs)/home')}
      />
    </View>
  )
}
