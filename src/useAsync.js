import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const useAsyncStorage = (key, defaultValue) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key)
        setValue(jsonValue != null ? JSON.parse(jsonValue) : defaultValue)
      } catch (e) {
        console.log(`Error retrieving value for key "${key}": ${e}`)
      }
    }

    getData()
  }, [defaultValue, key])

  const setStoredValue = async (newValue) => {
    try {
      const jsonValue = JSON.stringify(newValue)
      await AsyncStorage.setItem(key, jsonValue)
      setValue(newValue)
    } catch (e) {
      console.log(`Error setting value for key "${key}": ${e}`)
    }
  }

  return [value, setStoredValue]
}

export default useAsyncStorage
