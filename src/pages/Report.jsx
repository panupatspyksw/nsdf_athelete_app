import {
  Linking,
  Text,
  Platform,
  TextInput,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView
} from "react-native"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import React, { useRef, useState } from "react"
import _ from "lodash"
import * as DeviceInfo from "react-native-device-info"
import CheckBox from "@react-native-community/checkbox"
import Header from "../components/Header"
import Button from "../components/Button"
import PopupSheetSuccess from "../components/PopupSheetSuccess"

export default function Report({ navigation }) {
  const [report, setReport] = useState({})
  const [reportText, setReportText] = useState("")
  const actionRef = useRef(null)

  const handleOnPress = async () => {
    let body = ""
    _.forEach(report, (value, key) => {
      const text = t(`report_${Number(key) + 1}`)
      if (value) {
        body += "- " + text + "\n"
      }
    })
    body += "\n ความคิดเห็น/ข้อเสนอแนะเพิ่มเติม : " + reportText + "\n"

    //get all device info
    body += "---------------------------\n"
    body += "Your system information\n"
    body += "Service : " + DeviceInfo.getBrand() + "\n"
    body += "Model : " + DeviceInfo.getModel() + "\n"
    body +=
      DeviceInfo.getSystemName() +
      " version : " +
      DeviceInfo.getSystemVersion() +
      "\n"
    await DeviceInfo.getUniqueId().then(
      (_res) => (body += "Unique Id : " + _res)
    )

    const encodedSubject = encodeURIComponent("Report")
    const encodedBody = encodeURIComponent(body)
    const mailtoLink = `${process.env.REACT_APP_MAILTO}?subject=${encodedSubject}&body=${encodedBody}`
    if (encodedSubject && encodedBody) {
      await Linking.openURL(mailtoLink)
    }
    actionRef.current?.show()
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.inner}>
              <PopupSheetSuccess
                actionSheetRef={actionRef}
                title="แจ้งปัญหาสำเร็จ"
                subTitle="ขอบคุณที่แจ้งปัญหาเข้ามาให้เราทราบ
              เราจะนำไปพัฒนาและปรับปรุงต่อไป"
              />
              <Header
                arrow
                navigation={navigation}
                title={t("report")}
              />
              <View
                style={{
                  flex: 1
                }}
              >
                <View
                  style={{
                    width: "100%",
                    paddingHorizontal: 24
                  }}
                >
                  {_.times(7, (n) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginVertical: 4
                        }}
                        key={"report" + n}
                      >
                        <CheckBox
                          boxType={"square"}
                          onCheckColor={"#FFF"}
                          onFillColor={Colors.greenDay}
                          onTintColor={Colors.greenDay}
                          onValueChange={(value) => {
                            setReport({
                              ...report,
                              [n]: value
                            })
                          }}
                          value={_.get(report, n, false)}
                        />
                        <Text
                          style={{
                            ...Styled.context,
                            marginLeft: 15
                          }}
                        >
                          {t(`report_${n + 1}`)}
                        </Text>
                      </View>
                    )
                  })}
                </View>
                <View
                  style={{
                    paddingHorizontal: 24,
                    marginTop: 15,
                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      color: Colors.titleday,
                      fontFamily: "NotoSansThai-Bold",
                      fontSize: 14,
                      marginBottom: 10
                    }}
                  >
                    {t("comment")}
                  </Text>
                  <TextInput
                    autoCorrect={false}
                    onChangeText={(text) => {
                      setReportText(text)
                    }}
                    multiline={true}
                    style={{
                      height: 250,
                      padding: 15,
                      borderWidth: 1,
                      borderColor: Colors.placeholderDay,
                      ...Styled.context,
                      borderRadius: 15,
                      textAlignVertical: "top"
                    }}
                    placeholder="พิมพ์ข้อความของคุณที่นี่..."
                    placeholderTextColor={Colors.placeholderDay}
                  />
                </View>
              </View>
            </View>
            <Button
              onPress={handleOnPress}
              label={t("confirm")}
              style={{
                alignSelf: "center",
                marginTop: 10
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  inner: {
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
})
