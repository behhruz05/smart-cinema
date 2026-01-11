import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'

type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  user: any | null
  hydrated: boolean

  setAuth: (data: {
    accessToken: string
    refreshToken: string
    user: any
  }) => Promise<void>

  hydrate: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  hydrated: false,

  setAuth: async ({ accessToken, refreshToken, user }) => {
    await AsyncStorage.multiSet([
      ['accessToken', accessToken],
      ['refreshToken', refreshToken],
      ['user', JSON.stringify(user)],
    ])

    set({ accessToken, refreshToken, user })
  },

  hydrate: async () => {
    const [[, accessToken], [, refreshToken], [, user]] =
      await AsyncStorage.multiGet(['accessToken', 'refreshToken', 'user'])

    set({
      accessToken,
      refreshToken,
      user: user ? JSON.parse(user) : null,
      hydrated: true,
    })
  },

  logout: async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user'])
    set({ accessToken: null, refreshToken: null, user: null })
  },
}))
