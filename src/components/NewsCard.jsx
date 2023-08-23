import { Text, View } from "react-native"
import FastImage from "react-native-fast-image"
import React from "react"
import dayjs from "dayjs"
import { Colors, Styled } from "../Styled"
import ViewIcon from "../assets/ViewIcon.svg"
export const NewsCard = ({ uri, date, view, title }) => {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        shadowColor: "#7AAFDF",
        shadowOffset: {
          width: 4,
          height: 4
        },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        borderRadius: 10,
        elevation: 4,
        height: 94,
        padding: 10,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <FastImage
        style={{ width: 103, height: 74, borderRadius: 8 }}
        source={{
          uri: uri ?? "https://unsplash.it/400/400?image=1",
          priority: FastImage.priority.normal
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View
        style={{
          height: "100%",
          flex: 1,
          justifyContent: "space-between",
          paddingHorizontal: 10
        }}
      >
        <Text
          style={{
            ...Styled.contextBold,
            color: Colors.titleday
          }}
        >
          {title ?? "No title"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              ...Styled.small,
              color: Colors.detailTextDay
            }}
          >
            {date ?? dayjs().format("DD MMM BBBB")}
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
              ...Styled.small,
              color: Colors.detailTextDay
            }}
          >
            {view ?? 0}
          </Text>
        </View>
      </View>
    </View>
  )
}
export const BigNewsCard = ({ uri, date, view, title }) => {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        shadowColor: "#7AAFDF",
        shadowOffset: {
          width: 4,
          height: 4
        },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        borderRadius: 10,
        elevation: 4,
        minHeight: 225,
        padding: 10,
        marginBottom: 12
      }}
    >
      <FastImage
        style={{ width: "100%", height: 150, borderRadius: 8 }}
        source={{
          uri: uri ?? "https://unsplash.it/400/400?image=1",
          priority: FastImage.priority.normal
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center"
        }}
      >
        <Text
          style={{
            ...Styled.small,
            color: Colors.detailTextDay
          }}
        >
          {date ?? dayjs().format("DD MMM BBBB")}
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
            ...Styled.small,
            color: Colors.detailTextDay
          }}
        >
          {view ?? 0}
        </Text>
      </View>
      <Text
        style={{
          marginTop: 6,
          ...Styled.contextBold,
          color: Colors.titleday
        }}
      >
        {title ?? "No title"}
      </Text>
    </View>
  )
}
