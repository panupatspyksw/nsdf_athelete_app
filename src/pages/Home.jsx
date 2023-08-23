import React, { useCallback, useContext, useEffect, useState } from "react"
import {
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import Male from "../assets/male.svg"
import Female from "../assets/female.svg"
import { t } from "i18n-js"
import BellIcon from "../assets/unread.svg"
import BellIconReaded from "../assets/readed.svg"
import { Border, Colors, Styled } from "../Styled"
import NewsSection from "../components/NewsSection"
import MenuSection from "../components/MenuSection"
import FastImage from "react-native-fast-image"
import { AppContext } from "../Context"
import FloatSocialShare from "../components/FloatSocialShare"

export default function HomeScreen({ navigation }) {
  const { user, fetchNotification, handleFocus, requestData, isNoti } =
    useContext(AppContext)

  useEffect(() => {
    if (user) {
      fetchNotification(navigation)
    }

    const unsubscribe = navigation.addListener("focus", handleFocus)

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundColorLight
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 25,
          paddingTop: Platform.OS === "android" ? 15 : 0
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (user) {
                navigation.navigate("Others")
              } else {
                navigation.navigate("LoginScreen")
              }
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%"
              }}
            >
              <View
                style={{
                  marginRight: 13
                }}
              >
                {user ? (
                  <FastImage
                    style={{ width: 50, height: 50, borderRadius: 24 }}
                    source={{
                      uri: user.image,
                      priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : user && user.gender === "ชาย" ? (
                  <Male
                    height={50}
                    width={50}
                  />
                ) : (
                  <Female
                    height={50}
                    width={50}
                  />
                )}
              </View>

              <View>
                <Text
                  style={{
                    ...Styled.contextBold,
                    color: Colors.textday
                  }}
                >
                  {user
                    ? t("welcome_username", {
                        username: user.first_name
                      })
                    : t("login")}
                </Text>
                {user ? (
                  <Text
                    style={{
                      ...Styled.small,
                      color: Colors.detailTextDay
                    }}
                  >
                    {/* 1 = pending */}
                    {requestData?.statusCode === 1
                      ? t("general")
                      : user.roleName}
                  </Text>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
          {user ? (
            <TouchableOpacity
              onPress={() => {
                navigation.push("Notification")
              }}
            >
              {/* wait for icon */}
              <View>{isNoti ? <BellIcon /> : <BellIconReaded />}</View>
            </TouchableOpacity>
          ) : null}
        </View>
        <NewsSection navigation={navigation} />
        {user ? (
          <MenuSection
            navigation={navigation}
            group={user.roleName}
          />
        ) : null}
      </View>
      <FloatSocialShare />
    </SafeAreaView>
  )
}
