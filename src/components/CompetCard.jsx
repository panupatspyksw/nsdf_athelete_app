/* eslint-disable react/react-in-jsx-scope */
import { Text, View } from "react-native"
import FastImage from "react-native-fast-image"
import { capitalizeText } from "../helper"
import { Border, Colors, Font } from "../Styled"
import dayjs from "dayjs"

const CompetImage = ({ left, pic, country, name, style }) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: left ? "row-reverse" : "row",
        ...style
      }}
    >
      <FastImage
        style={{ width: 30, height: 30, borderRadius: 50 }}
        source={{
          uri: pic,
          priority: FastImage.priority.normal
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View
        style={{
          alignItems: left ? "flex-end" : "flex-start",
          paddingRight: left ? 12 : 0,
          paddingLeft: left ? 0 : 12
        }}
      >
        <Text style={{ color: Colors.textday, ...Font.contextBold }}>
          {capitalizeText(country)}
        </Text>
        <Text style={{ color: Colors.textday, ...Font.detail }}>
          {capitalizeText(name)}!
        </Text>
      </View>
    </View>
  )
}

const CompetCard = ({
  status,
  compet_place,
  time,
  picLeft,
  countryLeft,
  nameLeft,
  picRight,
  countryRight,
  nameRight
}) => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        borderRadius: 12,
        alignItems: "center",
        paddingVertical: 12,
        ...Border.cardColorDay,
        flexDirection: "row",
        flexWrap: "nowrap",
        columnGap: 12
      }}
    >
      <CompetImage
        left
        style={{ flex: 1 }}
        pic={picLeft}
        country={countryLeft}
        name={nameLeft}
      />
      <View>
        <Text style={{ ...Font.smallBold, color: Colors.orange }}>
          {dayjs(time).format("HH.MM")}
        </Text>
        <Text style={{ color: Colors.detailTextDay, ...Font.detail }}>
          {dayjs(time).format("DD MMM")}!
        </Text>
      </View>
      <CompetImage
        style={{ flex: 1 }}
        pic={picRight}
        country={countryRight}
        name={nameRight}
      />
    </View>
  )
}

export default CompetCard
