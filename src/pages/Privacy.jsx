import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import React from "react"
import Header from "../components/Header"

export default function Privacy({ navigation }) {
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
        title={t("privacy")}
      />
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView
          contentContainerStyle={{
            width: "100%",
            paddingHorizontal: 24
          }}
        >
          <Text
            style={{
              ...Styled.title,
              color: Colors.textday
            }}
          >
            {`ข้อกำหนดและเงื่อนไขการใช้งานแอปพลิเคชัน 

ข้อกำหนดและเงื่อนไขการใช้งานแอปพลิเคชันฉบับนี้ซึ่ง ต่อไปในข้อกำหนดนี้จะเรียกว่า "ข้อกำหนด" โดยมีราย ละเอียดดังต่อไปนี้

ข้อ 1 คำนิยาม ภายในข้อกำหนดนี้
(ก) "แอปพลิเคชัน" หมายความว่าแอปพลิเคชันชื่อว่า การจัดจ้างที่ปรึกษาโครงการโมบายแอปพลิเคชัน กองทุนพัฒนาการกีฬาแห่งชาติ (Mobile Application) ซึ่งดำเนินการและให้บริการ ในลักษณะดังต่อไปนี้

แอปพลิเคชันที่ใช้ตามภารกิจของกองทุนพัฒนาการกีฬาแห่งชาติและเพื่อเพิ่มช่องทางในเข้าถึง แหล่งข้อมูลต่าง ๆ และการส่งข้อมูลต่าง ๆ ของ กองทุนพัฒนาการกีฬาแห่ง ชาติผ่านแอปพลิเคชัน (Application) ที่ใช้งานผ่าน อุปกรณ์เคลื่อนที่ (Smart Device)ในรูปแบบ สื่ออิเล็กทรอนิกส์ที่ สามารถเข้าถึงบริการต่าง ๆ ได้สะดวกและ รวดเร็ว สำหรับนักกีฬา บุคลากร ในวงการกีฬา และผู้ที่เกี่ยวข้อง`}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
