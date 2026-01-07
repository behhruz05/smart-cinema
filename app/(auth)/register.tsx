import { View, Text, Button } from 'react-native'
import { useRouter } from 'expo-router'

export default function RegisterScreen() {
  const router = useRouter()

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Register</Text>

      <Button
        title="Register (skip)"
        onPress={() => router.replace('/(tabs)/home')}
      />
    </View>
  )
}
