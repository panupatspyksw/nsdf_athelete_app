import {
  Dimensions,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import React, { useRef } from "react"
import MapView, { Marker } from "react-native-maps"
import MarkerIcon from "../assets/marker.svg"
import Header from "../components/Header"
import Call from "../assets/call.svg"
import Face from "../assets/face.svg"
import Email from "../assets/email.svg"
import Line from "../assets/line.svg"
import Tiktok from "../assets/tiktok.svg"
import Ig from "../assets/ig.svg"

export default function ContactUS({ navigation }) {
  const region = {
    latitude: 13.759290312369805,
    longitude: 100.62629067278914,
    latitudeDelta: 0.005,
    longitudeDelta:
      0.005 * (Dimensions.get("window").width / Dimensions.get("window").height)
  }
  const mapRef = useRef()

  // change : icon color
  const CONTACT = [
    {
      id: 1,
      icon: <Call />,
      link: "tel:021867111"
    },
    {
      id: 2,
      icon: <Face />,
      link: "https://www.facebook.com/nsdf.or.th"
    },
    {
      id: 3,
      icon: <Email />,
      link: "mailto:info@nsdf.or.th"
    },
    {
      id: 4,
      icon: <Line />,
      link: "https://page.line.me/169ygenp?openQrModal=true"
    },
    {
      id: 5,
      icon: <Tiktok />,
      link: "https://www.tiktok.com/@nsdfthailand"
    },
    {
      id: 6,
      icon: <Ig />,
      link: "https://www.instagram.com/nsdfthailand/"
    }
  ]

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
        title={t("contact")}
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
          <Text
            style={{
              ...Styled.head,
              color: Colors.spotlightDay,
              fontWeight: "600"
            }}
          >
            กองทุนพัฒนาการกีฬาแห่งชาติ
          </Text>
          <Text
            style={{
              ...Styled.title,
              color: Colors.detailTextDay
            }}
          >
            (NSDF) National Sports Development Fund
          </Text>
          <View
            style={{
              marginVertical: 15,
              height: 180
            }}
          >
            <MapView
              ref={mapRef}
              scrollEnabled={true}
              provider={"google"}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: "#D9D9D9",
                filter: "drop-shadow(4px 4px 25px rgba(71, 134, 255, 0.05))",
                overflow: "hidden"
              }}
              initialRegion={region}
              onPoiClick={async (e) => {
                await Linking.openURL("https://goo.gl/maps/q6bKGc4KfcA5SECm6")
              }}
              zoomEnabled={false}
            >
              <Marker
                onPress={async (e) => {
                  await Linking.openURL("https://goo.gl/maps/q6bKGc4KfcA5SECm6")
                }}
                coordinate={{
                  latitude: 13.759181451034014,
                  longitude: 100.62650815610068
                }}
              />
            </MapView>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "flex-start"
            }}
          >
            <MarkerIcon />

            <Text
              style={{
                marginTop: -8,
                marginLeft: 12,
                ...Styled.context,
                color: Colors.textday
              }}
            >
              อาคารเฉลิมพระเกียรติ 7 รอบพระชนมพรรษา ชั้น 3 เลขที่ 286 ถ.รามคำแหง
              แขวงหัวหมาก เขตบางกะปิ กรุงเทพมหานคร 10240
              {"\n"}
              โทร: 0 2186 7111 | โทรสาร: 0 2186 7545
              {"\n"}E-mail: info@nsdf.or.th
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://nsdf.or.th/")
            }}
          >
            <Text
              style={{
                marginLeft: 24,
                ...Styled.context,
                color: Colors.textday
              }}
            >
              เว็บไซต์ : www.nsdf.or.th
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 80,
            width: "100%"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              columnGap: 50,
              width: "100%",
              alignItems: "center"
            }}
          >
            <FlatList
              data={CONTACT}
              renderItem={({ item }, index) => {
                return (
                  <View
                    key={item.id}
                    style={{
                      flex: 1,
                      paddingVertical: 10
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => Linking.openURL(item.link)}
                    >
                      <View
                        style={{
                          width: 55,
                          height: 55,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: Colors.softDisableDay,
                          borderColor: "#D9E0FF",
                          borderWidth: 0.5,
                          boxShadow: "4px 4px 20px rgba(122, 175, 255, 0.15)",
                          borderRadius: 55 / 2,
                          display: "flex",
                          alignSelf: "center"
                        }}
                      >
                        {item.icon}
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              }}
              numColumns={3}
              keyExtractor={(_item, index) => index}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
