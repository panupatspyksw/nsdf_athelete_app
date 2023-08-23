import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import React from "react"
import DeviceInfo from "react-native-device-info"
import Header from "../components/Header"

export default function AboutUS({ navigation }) {
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
        title={t("aboutus")}
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
          <Text
            style={{
              ...Styled.head,
              color: Colors.spotlightDay,
              fontWeight: "600"
            }}
          >
            Mobile Application
          </Text>
          <Text
            style={{
              ...Styled.title,
              color: Colors.detailTextDay,
              marginBottom: 21
            }}
          >
            Copyright v{DeviceInfo.getVersion()} ({DeviceInfo.getBuildNumber()})
          </Text>
          <Text
            style={{
              ...Styled.title,
              color: Colors.textday
            }}
          >
            {t("about")}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
