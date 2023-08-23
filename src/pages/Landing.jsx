import React, { useContext, useEffect, useRef, useState } from "react"
import { Text, View, Animated, TouchableOpacity } from "react-native"
import Logo from "../assets/Logo.svg"
import ThaiLogo from "../assets/thai.svg"
import USLogo from "../assets/us.svg"
import { t } from "i18n-js"
import { Colors, Gradient, Styled } from "../Styled"
import GradientText from "../components/GradientText"

import LinearGradient from "react-native-linear-gradient"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppContext } from "../Context"
import { CommonActions } from "@react-navigation/native"

const LangButton = ({ active, children }) => {
  return (
    <View
      style={{
        height: 178,
        width: 147,
        borderRadius: 18,
        backgroundColor: "#F2F5FF",
        borderWidth: active ? 2 : 0.5,
        borderColor: !active ? "#D9E0FF" : Colors.spotlightDay,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {children}
    </View>
  )
}

export default function ({ navigation, route }) {
  const [isStarting, setStart] = useState(false)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const { changeLang, setUser } = useContext(AppContext)
  console.log({ isStarting })

  const checkLang = async () => {
    const isAlreadyFinish = await AsyncStorage.getItem("finish_onboarding")
    console.log({ isAlreadyFinish })
    if (isAlreadyFinish === "true") {
      // navigation.replace('HomeTab');
      // return null;
    }
    const lang = await AsyncStorage.getItem("lang")
    if (lang !== null) {
      const l = await AsyncStorage.getItem("term")
      if (l === "agrees") {
        navigation.replace("Splash")
      } else {
        navigation.push("Term")
      }
    } else {
      setStart(true)
    }
  }

  const fadeOut = async () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true
    }).start(async () => {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "HomeTab" }]
      })
      const savedUser = await AsyncStorage.getItem("user")
      console.log({ savedUser })
      if (savedUser !== null) {
        // setUser(JSON.parse(savedUser))
        navigation.dispatch(resetAction)
      } else {
        checkLang()
      }
    })
  }

  useEffect(() => {
    fadeOut()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff"
      }}
    >
      {!isStarting ? (
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Logo />
        </Animated.View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <GradientText
            colors={Gradient.blue}
            style={{
              ...Styled.head
            }}
          >
            Select Language
          </GradientText>

          <Text
            style={{
              ...Styled.context
            }}
          >
            กรุณาเลือกภาษาที่ท่านต้องการ
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              paddingHorizontal: 15,
              marginTop: 21,
              marginBottom: 48
            }}
          >
            <TouchableOpacity
              onPress={() => {
                changeLang("th")
              }}
            >
              <LangButton active={t("lang") === "th"}>
                <ThaiLogo />
                <Text
                  style={{
                    marginTop: 15,
                    ...Styled.title,
                    fontWeight: "600"
                  }}
                >
                  ภาษาไทย
                </Text>
                <Text
                  style={{
                    ...Styled.title,
                    color: "#828282"
                  }}
                >
                  Thai
                </Text>
              </LangButton>
            </TouchableOpacity>
            <View
              style={{
                marginHorizontal: 9
              }}
            />
            <TouchableOpacity
              onPress={() => {
                changeLang("en")
              }}
            >
              <LangButton active={t("lang") === "en"}>
                <USLogo />
                <Text
                  style={{
                    marginTop: 15,
                    ...Styled.title,
                    fontWeight: "600"
                  }}
                >
                  อังกฤษ
                </Text>
                <Text
                  style={{
                    ...Styled.title,
                    color: "#828282"
                  }}
                >
                  English
                </Text>
              </LangButton>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.setItem("lang", t("lang"))
              navigation.push("Term")
            }}
          >
            <LinearGradient
              style={{
                width: 180,
                height: 48,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 24
              }}
              colors={["#5081FF", "#5A88FE", "#6EA6FA"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={{
                  ...Styled.context,
                  color: "#F2F5FF"
                }}
              >
                {t("confirm")}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
