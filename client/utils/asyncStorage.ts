import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorageKeys = ["access_token", "refresh_token", "permission_token", "access_token_expires_at", "refresh_token_expires_at"] as const
export type AsyncStorageKeys = typeof asyncStorageKeys[number]

class HomeLifeAsyncStorage {

  static async getData(key: AsyncStorageKeys): Promise<string> {
     try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          return value
        }
        return ""
      } catch (e) {
        throw new Error("failed to load data: " + e)
      }
  }

  static async setData(key: AsyncStorageKeys, value: string | undefined): Promise<string> {
    try {
      if (!value) {
        await AsyncStorage.setItem(key, "")
        return "no value provided"
      }
      await AsyncStorage.setItem(key, value)
      return "successfully saved " + key
    } catch (e) {
      throw new Error("failed to ")
    }
  }
  static async clearData() {
    for (let key of asyncStorageKeys) {
      try {
        await AsyncStorage.removeItem(key);
      } catch (e) {
        throw new Error("failed to clear data: " + e)
      }
    }
  }
}

export default HomeLifeAsyncStorage