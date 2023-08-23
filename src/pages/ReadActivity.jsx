import React, { useContext, useEffect, useRef, useState } from "react"
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { t } from "i18n-js"
import { Colors, Font, Styled } from "../Styled"
import { useWindowDimensions } from "react-native"
import RenderHtml from "react-native-render-html"
import Button from "../components/Button"
import ViewIcon from "../assets/ViewIcon.svg"
import FastImage from "react-native-fast-image"
import ShareIcon from "../assets/menu/share.svg"
import Share from "react-native-share"
import Header from "../components/Header"
import PopupActionSheet from "../components/PopupActionSheet"
import { AppContext } from "../Context"
import dayjs from "dayjs"
import { getPostById } from "../apiNew"

export default function ReadActivity({ navigation, route }) {
  const { user } = useContext(AppContext)
  const [content, setContent] = useState(null)
  const actionSheetRef = useRef(null)
  const { width } = useWindowDimensions()
  const event = route?.params.event
  const end = dayjs(event.end_event, "DD MMMM BBBB").locale("th")
  const isActive = end.isAfter(dayjs())

  const submit = () => {
    if (user) {
      actionSheetRef.current?.hide()
    } else {
      navigation.push("LoginScreen")
    }
  }

  useEffect(() => {
    if (!content && event) {
      getPostById(event.id)
        .then((_res) => {
          setContent(_res.body)
        })
        .catch((err) => console.error(err))
    }
  }, [content, event])

  return content ? (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1,
        paddingBottom: 10
      }}
    >
      <PopupActionSheet
        actionSheetRef={actionSheetRef}
        submit={submit}
        title={"คุณต้องการเข้าร่วมกิจกรรม?"}
        subTitle={
          user ? "กรุณากดปุ่มยืนยัน" : "คุณจำเป็นต้องเข้าสู่ระบบเข้าใช้งาน"
        }
        btnTitle={user ? "เข้าร่วม" : t("login")}
      />
      <Header
        arrow
        navigation={navigation}
        title={t("activity_calendar")}
      />
      <View
        style={{
          paddingHorizontal: 24,
          flex: 1
        }}
      >
        <ScrollView>
          <View>
            <View
              style={{
                alignItems: "center"
              }}
            >
              <FastImage
                source={{
                  uri:
                    content.cover ??
                    Image.resolveAssetSource(
                      require("../assets/placeholder.png")
                    ).uri
                }}
                style={{
                  width: "100%",
                  height: 184,
                  borderRadius: 18,
                  marginBottom: 24
                }}
                resizeMode={"cover"}
              />
            </View>
            <Text
              style={{
                marginTop: 6,
                ...Styled.contextBold,
                color: Colors.titleday
              }}
            >
              {content.title ?? "No title"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  ...Font.smalll,
                  color: Colors.detailTextDay
                }}
              >
                {dayjs(content.start_date).format("D MMM YYYY")} -{" "}
                {dayjs(content.end_date).format("D MMM YYYY")}
              </Text>
              <View
                style={{
                  borderWidth: 0.5,
                  height: 12,
                  width: 0,
                  borderColor: Colors.placeholderDay,
                  marginHorizontal: 8
                }}
              />
              <ViewIcon />
              <Text
                style={{
                  marginLeft: 4,
                  ...Font.small,
                  color: Colors.detailTextDay
                }}
              >
                {content?.hits ?? 0}
              </Text>
            </View>
            <RenderHtml
              contentWidth={width - 48}
              source={{
                html: content.body
              }}
            />
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: isActive ? "space-between" : "flex-end",
            paddingTop: 10
          }}
        >
          {/* {isActive ? (
            <Button
              onPress={() => actionSheetRef.current?.show()}
              label={t("joinactivity")}
            />
          ) : null} */}
          <TouchableOpacity
            onPress={() => {
              Share.open({
                url: content.sharelink
              })
            }}
          >
            <ShareIcon width={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <></>
  )
}
