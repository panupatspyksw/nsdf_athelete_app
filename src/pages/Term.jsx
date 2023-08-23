import React from "react"
import { SafeAreaView, ScrollView, Text, View, Platform } from "react-native"
import GradientText from "../components/GradientText"
import { Styled } from "../Styled"
import { t } from "i18n-js"
import Button, { BackButton } from "../components/Button"

import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff"
      }}
    >
      <View
        style={{
          paddingHorizontal: 24,
          flex: 1
        }}
      >
        <View
          style={{
            marginBottom: 36,
            paddingTop: Platform.OS === "android" ? 30 : 0
          }}
        >
          <BackButton navigation={navigation} />
        </View>
        <View
          style={{
            marginBottom: 21
          }}
        >
          <GradientText
            colors={["#5081FF", "#5A88FE", "#6EA6FA"]}
            style={{
              ...Styled.head,
              fontWeight: "600"
            }}
          >
            Terms and Conditions
          </GradientText>
          <Text
            style={{
              ...Styled.context,
              color: "#BFBFBF"
            }}
          >
            ข้อตกลงและเงื่อนไขการใช้งาน
          </Text>
        </View>
        <ScrollView
          style={{
            height: "100%",
            flex: 1
          }}
        >
          <Text
            style={{
              ...Styled.context,
              color: "#4B4B4B"
            }}
          >
            {`ข้อกำหนดและเงื่อนไขการใช้งานแอปพลิเคชัน 

ข้อกำหนดและเงื่อนไขการใช้งานแอปพลิเคชันฉบับนี้ซึ่ง ต่อไปในข้อกำหนดนี้จะเรียกว่า "ข้อกำหนด" โดยมีราย ละเอียดดังต่อไปนี้

ข้อ 1 คำนิยาม ภายในข้อกำหนดนี้
(ก) "แอปพลิเคชัน" หมายความว่าแอปพลิเคชันชื่อว่า การจัดจ้างที่ปรึกษาโครงการโมบายแอปพลิเคชัน กองทุนพัฒนาการกีฬาแห่งชาติ (Mobile Application) ซึ่งดำเนินการและให้บริการ ในลักษณะดังต่อไปนี้

แอปพลิเคชันที่ใช้ตามภารกิจของกองทุนพัฒนาการกีฬาแห่งชาติและเพื่อเพิ่มช่องทางในเข้าถึง แหล่งข้อมูลต่าง ๆ และการส่งข้อมูลต่าง ๆ ของ กองทุนพัฒนาการกีฬาแห่ง ชาติผ่านแอปพลิเคชัน (Application) ที่ใช้งานผ่าน อุปกรณ์เคลื่อนที่ (Smart Device)ในรูปแบบ สื่ออิเล็กทรอนิกส์ที่ สามารถเข้าถึงบริการต่าง ๆ ได้สะดวกและ รวดเร็ว สำหรับนักกีฬา บุคลากร ในวงการกีฬา และผู้ที่เกี่ยวข้อง`}
          </Text>
        </ScrollView>
        <View
          style={{
            alignItems: "center",
            marginTop: 60
          }}
        >
          <Button
            onPress={async () => {
              await AsyncStorage.setItem("term", "agrees")
              navigation.push("Splash")
            }}
            label={t("accept")}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
