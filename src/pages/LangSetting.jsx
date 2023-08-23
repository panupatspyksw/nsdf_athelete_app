import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import React, { useContext } from "react"
import CheckIcon from "../assets/checkIcon.svg"
import ThaiLogo from "../assets/thai.svg"
import USLogo from "../assets/us.svg"
import { AppContext } from "../Context"
import Header from "../components/Header"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function LangSetting({ navigation }) {
  const { changeLang, setUser } = useContext(AppContext)

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1
      }}
    >
      <Header
        arrow
        navigation={navigation}
        title={t("select_language")}
      />
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView
          contentContainerStyle={{
            width: "100%",
            paddingHorizontal: 24
          }}
        >
          <TouchableOpacity
            onPress={() => {
              changeLang("th")
              AsyncStorage.setItem("lang", "th")
              navigation.goBack()
            }}
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <ThaiLogo width={21} />
            <Text
              style={{
                marginLeft: 12,
                ...Styled.head,
                fontWeight: t("lang") === "th" ? "600" : "400",
                color: t("lang") === "th" ? Colors.spotlightDay : Colors.textday
              }}
            >
              ภาษาไทย (TH)
            </Text>
            {t("lang") === "th" ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end"
                }}
              >
                <CheckIcon />
              </View>
            ) : (
              <View />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              changeLang("en")
              AsyncStorage.setItem("lang", "en")
              navigation.goBack()
            }}
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <USLogo width={21} />
            <Text
              style={{
                marginLeft: 12,
                ...Styled.head,
                fontWeight: t("lang") === "en" ? "600" : "400",

                color: t("lang") === "en" ? Colors.spotlightDay : Colors.textday
              }}
            >
              ภาษาอังกฤษ (ENG)
            </Text>
            {t("lang") === "en" ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end"
                }}
              >
                <CheckIcon />
              </View>
            ) : (
              <View />
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
