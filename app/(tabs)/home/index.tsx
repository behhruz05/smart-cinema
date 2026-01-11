import { Button } from '@react-navigation/elements'
import { router } from 'expo-router'
import { Text, View } from 'react-native'

export default function Home() {
  return (
    <View className="bg-[#101010] flex-1 justify-center items-center">
      <Text className="text-white mb-4">
        HOME PAGE
      </Text>

      <Button
        title="Splash ga qaytish"
        onPress={() => router.replace('/splash')}
      />
    </View>
  )
}
