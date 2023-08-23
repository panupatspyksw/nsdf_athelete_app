import { Text, TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { t } from "i18n-js"
import LinearGradient from "react-native-linear-gradient"
import { Styled } from "../Styled"
import React from "react"
import BackArrow from "../assets/back.svg"

export function BackButton({ navigation, onPress }) {
  return (
    <TouchableOpacity
      onPress={
        onPress ??
        (() => {
          navigation.goBack()
        })
      }
    >
      <BackArrow />
    </TouchableOpacity>
  )
}
export default function Button({
  onPress,
  label,
  style,
  textStyle,
  inheritColor
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={{
          width: 180,
          height: 48,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 24,
          ...style
        }}
        colors={inheritColor ? inheritColor : ["#5081FF", "#5A88FE", "#6EA6FA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text
          style={{
            ...Styled.context,
            color: "#F2F5FF",
            ...textStyle
          }}
        >
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}
export function DefaultButton({ onPress, label, style, color, textStyle }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 180,
          height: 48,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 24,
          backgroundColor: color,
          ...style
        }}
      >
        <Text
          style={{
            ...Styled.context,
            color: "#F2F5FF",
            ...textStyle
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
