import React, { useContext, useEffect, useRef, useState } from "react"
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import Share from "react-native-share"
import Male from "../assets/male.svg"
import Female from "../assets/female.svg"
import { t } from "i18n-js"
import { Colors, Styled } from "../Styled"
import UserIcon from "../assets/menu/userMenu.svg"
import Password from "../assets/menu/password.svg"
import Privacy from "../assets/menu/privacy.svg"
import Lang from "../assets/menu/lang.svg"
import Report from "../assets/menu/report.svg"
import About from "../assets/menu/about.svg"
import Contact from "../assets/menu/contact.svg"
import ShareIcon from "../assets/menu/share.svg"
import Notifications from "../assets/menu/noti.svg"
import Arrow from "../assets/menu/Arrow.svg"
import FastImage from "react-native-fast-image"
import PopupActionSheet from "../components/PopupActionSheet"
import Button from "../components/Button"
import { removeAuthStorage } from "../helper"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppContext } from "../Context"

export default function MoreScreen({ navigation }) {
  const [authType, setAuthType] = useState()
  const actionSheetRef = useRef(null)
  const { user, setUser } = useContext(AppContext)

  const MENU = [
    {
      title: t("profile"),
      Icon: UserIcon,
      needAuth: true,
      name: "profile"
    },
    {
      title: t("change_password"),
      Icon: Password,
      needAuth: true,
      name: "changePass"
    },
    {
      title: t("select_language"),
      Icon: Lang,
      name: "lang"
    },
    {
      title: t("notifications"),
      Icon: Notifications,
      name: "Notification",
      needAuth: true
    },
    {
      title: t("report"),
      Icon: Report,
      name: "report"
    },
    {
      title: t("aboutus"),
      Icon: About,
      name: "about"
    },
    {
      title: t("privacy"),
      Icon: Privacy,
      name: "privacy"
    },
    {
      title: t("contact"),
      Icon: Contact,
      name: "contact"
    },
    {
      title: t("share"),
      Icon: ShareIcon,
      onPress: () => {
        //share google.com
        Share.open({
          title: "mobile.nsdf",
          url: "bit.ly/mobile_nsdf"
        })
      }
    }
  ]

  const getAuthType = async () => {
    try {
      const value = await AsyncStorage.getItem("auth_type")
      if (value) {
        setAuthType(value)
      }
    } catch (error) {
      return null
    }
  }

  const submit = async () => {
    await removeAuthStorage()
    await setUser(null)

    navigation.replace("LoginScreen", { logout: true })
  }

  useEffect(() => {
    if (!authType) {
      getAuthType()
    }
  }, [authType])

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1
      }}
    >
      <PopupActionSheet
        actionSheetRef={actionSheetRef}
        submit={submit}
        title={"ยืนยันการออกจากระบบ?"}
        subTitle={"กดยืนยันเพื่อทำการออกจากระบบ"}
      />
      <View
        style={{
          paddingHorizontal: 24,
          flex: 1,
          marginTop: Platform.OS === "android" ? 20 : 0
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
              alignItems: "center"
            }}
          >
            <View
              style={{
                marginRight: 13
              }}
            >
              {user && user.image ? (
                <FastImage
                  style={{ width: 84, height: 84, borderRadius: 50 }}
                  source={{
                    uri: user.image,
                    priority: FastImage.priority.normal
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ) : user && user.gender === "ชาย" ? (
                <Male
                  height={84}
                  width={84}
                />
              ) : (
                <Female
                  height={84}
                  width={84}
                />
              )}
            </View>
            <View>
              <Text
                style={{
                  ...Styled.contextBold,
                  color: Colors.main
                }}
              >
                {user
                  ? t("welcome_username", { username: user.first_name })
                  : t("login")}
              </Text>
              {user ? (
                <>
                  <Text
                    style={{
                      ...Styled.small,
                      color: Colors.detailTextDay
                    }}
                  >
                    {`${user.first_name} ${user.last_name}`}
                  </Text>
                  <Text
                    style={{
                      ...Styled.small,
                      color: Colors.detailTextDay
                    }}
                  >
                    {user.roleName}
                    {user.sport_type ?? ""}
                  </Text>
                </>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            paddingVertical: 20
          }}
        >
          <ScrollView>
            {MENU.map((i) => {
              if (i.needAuth && !user) {
                return null
              }
              if (i.name === "changePass" && authType !== "email") {
                return null
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (i.onPress) {
                      i.onPress()
                    } else {
                      navigation.push(i.name || i.title)
                    }
                  }}
                  key={i.name}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 15
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <i.Icon />
                    <Text
                      style={{
                        marginLeft: 13,
                        ...Styled.context,
                        color: Colors.titleday
                      }}
                    >
                      {i.title}
                    </Text>
                  </View>
                  <Arrow />
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          <View>
            {user ? (
              <Button
                onPress={() => actionSheetRef.current?.show()}
                label={t("logout")}
                style={{
                  alignSelf: "center"
                }}
                inheritColor={[
                  "rgba(255, 125, 126, 0.2)",
                  "rgba(255, 125, 126, 0.2)",
                  "rgba(255, 125, 126, 0.2)"
                ]}
                textStyle={{
                  color: "#FF7D7E"
                }}
              />
            ) : (
              <Button
                onPress={() => navigation.push("Register")}
                label="ลงทะเบียนเข้าใช้งาน"
                style={{
                  alignSelf: "center"
                }}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
