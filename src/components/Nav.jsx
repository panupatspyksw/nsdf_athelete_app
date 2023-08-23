import { Platform, Text, View } from "react-native"
import { BackButton } from "./Button"
import { Styled } from "../Styled"
import { t } from "i18n-js"
import React from "react"

export function Navbar({ navigation }) {
  return (
    <View
      style={{
        marginBottom: 30,
        paddingTop: Platform.OS === "android" ? 30 : 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View
        style={{
          flex: 1
        }}
      >
        <BackButton navigation={navigation} />
      </View>
      <View>
        <Text
          style={{
            ...Styled.head,
            fontWeight: "600"
          }}
        >
          {t("request")}
        </Text>
      </View>
      <View
        style={{
          flex: 1
        }}
      />
    </View>
  )
}
