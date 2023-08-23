import i18n from "i18n-js"
import { NativeModules, Platform } from "react-native"
import en from "./assets/en-US.json"
import th from "./assets/th-TH.json"
i18n.translations = { en, th }
i18n.setdefault = async (myLang, setLang) => {
  try {
    if (!myLang) {
      myLang =
        Platform.OS === "ios"
          ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
          : NativeModules.I18nManager.localeIdentifier
      myLang = myLang.substring(0, 2)
    }
    i18n.locale = myLang
    setLang(myLang)
  } catch (error) {
    console.warn(error)
  }
}

export default i18n
