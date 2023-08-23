import React, { useRef, useState } from "react"
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import Button, { BackButton, DefaultButton } from "../components/Button"
import Carousel, { Pagination } from "react-native-snap-carousel"
import _ from "lodash"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ({ navigation }) {
  const carouselRef = useRef()
  const { width } = Dimensions.get("screen")
  const [activeSlide, setActiveSlide] = useState(0)
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
            paddingTop: Platform.OS === "android" ? 30 : 0,
            marginBottom: 36,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <BackButton navigation={navigation} />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Pagination
              dotsLength={3}
              activeDotIndex={activeSlide}
              containerStyle={{
                paddingVertical: 0
              }}
              dotStyle={{
                height: 5.83,
                width: 14,
                borderRadius: 5,
                marginHorizontal: 1,
                backgroundColor: Colors.spotlightDay
              }}
              inactiveDotStyle={{
                width: 12,
                height: 12,
                backgroundColor: "#D9E0FF"
              }}
              inactiveDotOpacity={1}
              inactiveDotScale={0.5}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              carouselRef.current.snapToNext()
            }}
          >
            <Text
              style={{
                ...Styled.context,
                color: Colors.spotlightDay
              }}
            >
              {t("next")}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 256,
            overflow: "hidden",
            alignItems: "center"
          }}
        >
          <Carousel
            ref={carouselRef}
            data={_.times(3, (n) => {
              return n
            })}
            onSnapToItem={(i) => {
              setActiveSlide(i)
            }}
            renderItem={(i) => {
              return (
                <View>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 16
                    }}
                    resizeMode={"cover"}
                    source={require("../assets/img.png")}
                  />
                </View>
              )
            }}
            autoplay={true}
            activeSlideAlignment={"start"}
            sliderWidth={width - 60}
            itemWidth={width - 60}
          />
        </View>
        <ScrollView>
          <View
            style={{
              marginTop: 24,
              alignItems: "center"
            }}
          >
            <Text
              style={{
                ...Styled.bigHead,
                color: Colors.spotlightDay,
                fontWeight: "600"
              }}
            >
              Hello, Welcome
            </Text>
            <Text
              style={{
                ...Styled.context,
                color: Colors.gray3
              }}
            >
              ยินดีต้อนรับเข้าสู่ โมบายแอปพลิเคชัน
            </Text>
            <Text
              style={{
                ...Styled.context,
                color: Colors.textday,
                marginTop: 13,
                textAlign: "center",
                fontWeight: "400"
              }}
            >
              Mobile App หรือที่เรียกว่า Mobile Application
              จึงเป็นการพัฒนาโปรแกรมประยุกต์ เพื่อให้ใช้งานบน อุปกรณ์สื่อสาร
              เคลื่อนที่หรือสมาร์ทโฟนโดยเฉพาะนั่นเอง เพื่อตอบสนองความ
              ต้องการของผู้บริโภค พร้อมทั้งยัง
              สนับสนุนให้ผู้ใช้สมาร์ทโฟนได้ใช้งานง่ายยิ่งขึ้น ซึ่งมีหลาย
              ระบบปฏิบัติการที่พัฒนาออกมาให้ผู้บริโภคได้ใช้งานกัน
            </Text>
          </View>
          <Button
            style={{
              width: "100%",
              marginVertical: 15
            }}
            onPress={async () => {
              await AsyncStorage.setItem("finish_onboarding", "true")
              navigation.push("LoginScreen")
            }}
            label={t("sign_up")}
          />
          <DefaultButton
            style={{
              width: "100%"
            }}
            textStyle={{
              color: Colors.spotlightDay
            }}
            color={Colors.softDisableDay}
            onPress={async () => {
              await AsyncStorage.setItem("finish_onboarding", "true")
              navigation.replace("HomeTab")
            }}
            label={t("later")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
