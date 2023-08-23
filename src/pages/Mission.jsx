import React from "react"
import { t } from "i18n-js"
import Header from "../components/Header"
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Linking
} from "react-native"
import SingleWindow from "../assets/singleWindow.svg"
import RequestIcon from "../assets/requestIcon.svg"
import { Colors, Font } from "../Styled"

const Mission = ({ navigation }) => {
  const { width } = Dimensions.get("screen")

  const MISSION_MENU = [
    {
      id: 1,
      title: "e-Learning",
      icon: <SingleWindow />,
      link: "https://bi.nsdf.or.th/",
      bgColor: Colors.orange
    },
    {
      id: 2,
      title: "ระบบคำขอ",
      icon: <RequestIcon />,
      link: "https://sportfund.nsdf.or.th/Login.aspx?ReturnUrl=%2f",
      bgColor: Colors.greenNight
    }
  ]
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        arrow
        navigation={navigation}
        title={t("mission")}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          columnGap: 15,
          width: width,
          flexWrap: "wrap"
        }}
      >
        {MISSION_MENU.map((_data) => (
          <TouchableOpacity
            key={_data.id}
            onPress={() => Linking.openURL(_data.link)}
          >
            <View
              style={{
                width: width / 2 - 32.5,
                marginBottom: 15,
                backgroundColor: _data.bgColor,
                borderRadius: 10,
                padding: 18
              }}
            >
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "flex-end"
                }}
              >
                {_data.icon}
              </View>
              <Text
                style={{
                  color: Colors.titlenight,
                  fontWeight: "600",
                  ...Font.contextBold,
                  marginTop: 25
                }}
              >
                {_data.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default Mission
