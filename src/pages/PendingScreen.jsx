import { SafeAreaView, Text, View, Image } from "react-native"
import Button from "../components/Button"
import { Colors, Font, Styled } from "../Styled"
import { t } from "i18n-js"
import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context"
import { CommonActions } from "@react-navigation/native"
import Header from "../components/Header"

export default function PendingScreen({ navigation }) {
  const { user, fetchNotification, requestData } = useContext(AppContext)

  const [status, setStatus] = useState({
    title: "pending_title",
    sub: "pending_sub",
    image: require("../assets/Pending.png")
  })

  useEffect(() => {
    if (!requestData && user) {
      fetchNotification()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    switch (user.requestStatusCode) {
      case 1:
        setStatus({
          title: "pending_title",
          sub: "pending_sub",
          color: Colors.textday,
          image: require("../assets/Pending.png")
        })
        break
      case 3:
        setStatus({
          title: "reject_title",
          sub: "reject_sub",
          color: Colors.redday,
          image: require("../assets/Reject.png")
        })
        break
      case 2:
        setStatus({
          title: "approve_title",
          sub: "approve_sub",
          color: Colors.greenDay,
          image: require("../assets/Approve.png")
        })
        break
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1
      }}
    >
      <Header
        arrow
        onPress={() => {
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: "HomeTab" }]
          })
          navigation.dispatch(resetAction)
        }}
        title={t("request")}
        navigation={navigation}
      />
      <View style={{ paddingHorizontal: 24 }}>
        {requestData ? (
          <Text style={{ color: Colors.spotlightDay, ...Font.head }}>
            {`ยื่นเรื่องแสดงความเป็น${requestData.roleName}`}
          </Text>
        ) : (
          <Text style={{ color: Colors.spotlightDay, ...Font.head }}>
            {`กำลังยื่นเรื่อง`}
          </Text>
        )}
        <Text style={{ color: Colors.detailTextDay, ...Font.context }}>
          ผลการอนุมัติ
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%"
        }}
      >
        <Image
          source={status.image}
          style={{ width: 200, height: 200 }}
        />
        <Text
          style={{
            marginTop: 18,
            ...Styled.context,
            textAlign: "center",
            color: status?.color
          }}
        >
          {t(status.title)}
        </Text>
        <Text
          style={{
            ...Styled.context,
            textAlign: "center",
            color: Colors.gray3
          }}
        >
          {t(status.sub, {
            type: t(user.roleName)
          })}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 24,
          alignSelf: "flex-end"
        }}
      >
        {status.title !== "pending_title" ? (
          <Button
            style={{
              width: "100%"
            }}
            onPress={() => {
              if (status.title === "approve_title") {
                navigation.replace("HomeTab")
              } else {
                navigation.push("RequestScreen", {
                  params: {
                    type: 1,
                    title: `${t("request")}${t("athele_register")}`
                  }
                })
              }
            }}
            label={
              status.title === "approve_title"
                ? t("get_started")
                : t("tryagain")
            }
          />
        ) : null}
      </View>
    </SafeAreaView>
  )
}
