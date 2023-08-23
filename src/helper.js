import AsyncStorage from "@react-native-async-storage/async-storage"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

export function capitalizeText(text) {
  var words = text.toLowerCase().split(" ")

  var capitalizedWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  var capitalizedText = capitalizedWords.join(" ")

  return capitalizedText
}

export function cutStringToNewLine(str, maxLength) {
  let result = ""
  for (let i = 0; i < str.length; i += maxLength) {
    result += str.substr(i, maxLength) + "\n"
  }
  return result.trim() // Remove trailing newline
}

export async function setAuthStorage(_token, _auth_type, _user) {
  await AsyncStorage.setItem("token", _token)
  await AsyncStorage.setItem("auth_type", _auth_type)
  await AsyncStorage.setItem("user", `${JSON.stringify(_user)}`)
}

export async function removeAuthStorage() {
  await GoogleSignin.signOut()
  await AsyncStorage.removeItem("token")
  await AsyncStorage.removeItem("auth_type")
  await AsyncStorage.removeItem("user")
}
