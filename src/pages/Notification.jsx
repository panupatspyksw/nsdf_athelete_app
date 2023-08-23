import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import React, { useCallback, useContext, useEffect, useState } from "react"
import _ from "lodash"
import Logo from "../assets/Logo.svg"
import Header from "../components/Header"
import useGetNotification from "../query/useGetNotification"
import dayjs from "dayjs"
import { getNotification } from "../apiNew"
import { AppContext } from "../Context"

function NotificationScreen({ navigation }) {
  const [data, setData] = useState()
  const { user } = useContext(AppContext)

  const formatTimeDifference = (createdDate) => {
    const currentDate = dayjs()
    const diffInMinutes = currentDate.diff(createdDate, "minutes")
    const diffInHours = currentDate.diff(createdDate, "hours")
    const diffInDays = currentDate.diff(createdDate, "days")

    if (diffInMinutes < 60) {
      return `${diffInMinutes} นาที`
    } else if (diffInHours < 24) {
      return `${diffInHours} ชม.`
    } else {
      return `${diffInDays} วัน`
    }
  }

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await getNotification()
        setData(response.body)
      } catch (error) {
        // Handle error
      }
    }

    if (!data && user) {
      fetchNotification()
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
        navigation={navigation}
        title={t("notifications")}
      />
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView
          contentContainerStyle={{
            width: "100%"
          }}
        >
          {data && data.length > 0 ? (
            data.map((n) => {
              return (
                <View
                  style={{
                    paddingVertical: 16,
                    paddingHorizontal: 24
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 44 / 2,
                        overflow: "hidden"
                      }}
                    >
                      <Logo
                        width={44}
                        height={44}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: 20,
                        flex: 1
                      }}
                    >
                      <Text
                        style={{
                          ...Styled.context
                        }}
                        numberOfLines={2}
                      >
                        <Text
                          style={{
                            ...Styled.contextBold
                          }}
                        >
                          {n?.msg}{" "}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          ...Styled.title,
                          color: Colors.detailTextDay
                        }}
                      >
                        {formatTimeDifference(n?.created_at)}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                width: "100%",
                alignItems: "center"
              }}
            >
              <Text>ยังไม่มีแจ้งเตือนในขณะนี้</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default NotificationScreen
