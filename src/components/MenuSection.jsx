import { View, Text, TouchableOpacity, Dimensions } from "react-native"
import React, { useContext } from "react"
import { t } from "i18n-js"
import { Colors, Font, Styled } from "../Styled"
import WearIcon from "../assets/watch.svg"
import TrainingIcon from "../assets/stat.svg"
import RequestIcon from "../assets/request.svg"
import _ from "lodash"
import { AppContext } from "../Context"
import Button from "./Button"
import AssignIcon from "../assets/assignments.svg"
import ConnectionIcon from "../assets/connection.svg"
// import useGetCheckRoleRequest from "../query/useGetCheckRoleRequest"

export default function ({ navigation }) {
  const { width } = Dimensions.get("screen")
  // const { requestData } = useGetCheckRoleRequest()
  const { user } = useContext(AppContext)

  const GENERAL_MENU = [
    {
      title: t("request"),
      subtitle: t("athele_register"),
      Icon: RequestIcon,
      screen: "RequestScreen",
      params: {
        type: 1,
        title: `${t("request")}${t("athele_register")}`
      },
      type: 2
    },
    {
      title: t("request"),
      subtitle: t("coach_register"),
      Icon: RequestIcon,
      screen: "RequestScreen",
      params: {
        type: 2,
        title: `${t("request")}${t("coach_register")}`
      },
      type: 3
    }
  ]

  const USER_MENU = [
    {
      title: "เชื่อมต่อกับ",
      subtitle: "Wearable Device",
      Icon: WearIcon,
      screen: "SmartWearScreen"
    },
    {
      title: "สถิติการฝึกซ้อม",
      subtitle: "Training Statistic",
      Icon: TrainingIcon,
      screen: "Stat"
    },
    {
      title: "รายการฝึกซ้อมจากโค้ช",
      subtitle: "Training List",
      Icon: ConnectionIcon,
      screen: "TraningList"
    }
  ]

  const COACH_MENU = [
    {
      title: "ดูสถิติของนักกีฬา",
      subtitle: "Athlete Stats View",
      Icon: TrainingIcon,
      screen: "Athlete"
    },
    {
      title: "มอบหมายการฝึกซ้อม",
      subtitle: "Assignments",
      Icon: AssignIcon,
      screen: "Assignment"
    },
    {
      title: "ผูกนักกีฬาเข้าสังกัด",
      subtitle: "Connection",
      Icon: ConnectionIcon,
      screen: "AddAthlete"
    }
  ]

  let menu = GENERAL_MENU
  const isPending =
    user?.requestStatusName === "pending" ||
    user?.requestStatusName === "reject"

  if (user?.requestStatusName === "approve") {
    switch (user?.roleCode) {
      case 1:
        menu = GENERAL_MENU
        break
      case 2:
        menu = USER_MENU
        break
      default:
        menu = COACH_MENU
        break
    }
  } else {
    if (isPending) {
      menu = GENERAL_MENU.filter((i) => i.type === user?.requestRoleCode)
      menu.push({
        title: t("request"),
        subtitle: t("pending_title"),
        Icon: RequestIcon,
        screen: "PendingScreen"
      })
    }
  }

  return (
    <View
      style={{
        marginTop: 18,
        flex: 1
      }}
    >
      <Text
        style={{
          ...Styled.title,
          fontWeight: "600"
        }}
      >
        {t("menu")}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: 12,
          flex: 1,
          width: "100%"
        }}
      >
        {_.isEmpty(user.id) ? (
          <View
            style={{
              width: "100%"
            }}
          >
            <Button
              style={{
                width: "100%",
                marginVertical: 15
              }}
              onPress={async () => {
                navigation.push("LoginScreen")
              }}
              label={t("sign_up")}
            />
          </View>
        ) : null}
        {menu.map((i) => {
          const { Icon, title, subtitle } = i
          return (
            <TouchableOpacity
              key={i.subtitle}
              onPress={() => {
                navigation.push(i?.screen ?? "Home", i?.params ?? {})
              }}
            >
              <View
                style={{
                  width: width / 2 - 32.5,
                  marginBottom: 18,
                  backgroundColor: "#FFFFFF",
                  borderColor: "#D9E0FF",
                  borderWidth: 0.5,
                  borderRadius: 10,
                  shadowColor: "#3155F8",
                  shadowOffset: { width: 2, height: 4 },
                  shadowOpacity: 0.05,
                  shadowRadius: 12,
                  elevation: 3,
                  padding: 18
                }}
              >
                <Icon />
                <Text
                  style={{
                    marginTop: 7,
                    ...Styled.small,
                    color: Colors.detailTextDay
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    color: Colors.titleday,
                    fontWeight: "600",
                    ...Font.smallBold
                  }}
                >
                  {subtitle}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}
