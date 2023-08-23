import AsyncStorage from "@react-native-async-storage/async-storage"
import Axios from "axios"

const baseURL = process.env.REACT_APP_BASE_API_NEW
const isServer = () => typeof window === "undefined"

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("token")
    return value || null
  } catch (error) {
    return null
  }
}

const services = Axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

services.interceptors.request.use(async (config) => {
  if (isServer()) return config

  const token = await getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.baseURL = baseURL
  return config
})

export default services
