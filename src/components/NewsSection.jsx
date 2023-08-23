import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { t } from "i18n-js"
import { Colors, Font, Styled } from "../Styled"
import Carousel, { Pagination } from "react-native-snap-carousel"
import _ from "lodash"
import { api } from "../api"

export default function ({ navigation }) {
  const carouselRef = useRef()
  const { width } = Dimensions.get("screen")
  const [newsList, setNews] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    api.get("/contents").then((res) => {
      setNews(res.data)
    })
  }, [])

  if (newsList.length === 0) {
    return null
  }

  return (
    <View
      style={{
        marginTop: 15
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text
          style={{
            ...Styled.title,
            color: Colors.titleday,
            fontWeight: "600"
          }}
        >
          {" "}
          {t("news")}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewsAnnouce")
          }}
        >
          <Text
            style={{
              ...Font.small,
              color: Colors.spotlightDay
            }}
          >
            {t("view_all")}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 8,
          height: 146,
          width: "100%",
          alignItems: "center"
        }}
      >
        <Carousel
          ref={carouselRef}
          data={_.take(newsList.list, 3)}
          onSnapToItem={(i) => {
            setActiveSlide(i)
          }}
          renderItem={(i) => {
            return (
              <TouchableOpacity
                key={"news" + i.item.id}
                onPress={() => {
                  navigation.navigate("Read", { id: i.item.id })
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 16
                  }}
                  resizeMode={"cover"}
                  source={{
                    uri: i.item.image
                  }}
                />
              </TouchableOpacity>
            )
          }}
          autoplay={true}
          activeSlideAlignment={"start"}
          sliderWidth={width - 60}
          itemWidth={width - 60}
        />
      </View>
      <Pagination
        dotsLength={_.take(newsList?.list ?? [], 3).length}
        activeDotIndex={activeSlide}
        containerStyle={{
          marginTop: 12,
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
  )
}
