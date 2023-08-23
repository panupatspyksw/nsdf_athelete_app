import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { Border, Card, Colors, Font } from "../Styled"
import { capitalizeText } from "../helper"
import FastImage from "react-native-fast-image"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration)

const CompetImage = ({ pic, country, name }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <FastImage
        style={{ width: 78, height: 78, borderRadius: 50 }}
        source={{
          uri: pic,
          priority: FastImage.priority.normal
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={{ color: Colors.spotlightDay, ...Font.contextBold }}>
        {capitalizeText(country)}
      </Text>
      <Text style={{ color: Colors.textday, ...Font.detail }}>
        {capitalizeText(name)}!
      </Text>
    </View>
  )
}

const CompetFirstCard = ({
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
  const [countdown, setCountdown] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = dayjs()
      const targetTime = dayjs(time)
      const timeDiff = targetTime.diff(currentTime)
      const countdownDuration = dayjs.duration(timeDiff)

      const days = countdownDuration.days()
      const hours = countdownDuration.hours()
      const minutes = countdownDuration.minutes()
      const seconds = countdownDuration.seconds()

      let countdownString = ""

      if (days > 0) {
        countdownString += `${days}d, `
      }
      if (hours > 0) {
        countdownString += `${hours}h, `
      }
      if (minutes > 0) {
        countdownString += `${minutes}m`
      }
      if (seconds > 0) {
        countdownString += `${seconds}s`
      }

      setCountdown(`${countdownString}`)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [time])

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        borderRadius: 12,
        alignItems: "center",
        paddingVertical: 12,
        ...Border.cardColorDay
      }}
    >
      <Text style={{ color: Colors.spotlightDay, ...Font.contextBold }}>
        {capitalizeText(status)}!
      </Text>
      <Text style={{ color: Colors.detailTextDay, ...Font.detail }}>
        {capitalizeText(compet_place)}!
      </Text>
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 14
        }}
      >
        <CompetImage
          pic={picLeft}
          country={countryLeft}
          name={nameLeft}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...Font.bigHead, color: Colors.orange }}>
            {dayjs(time).format("HH.MM")}
          </Text>
          <Text style={{ color: Colors.detailTextDay, ...Font.detail }}>
            {countdown || "now"}
          </Text>
        </View>
        <CompetImage
          pic={picRight}
          country={countryRight}
          name={nameRight}
        />
      </View>
    </View>
  )
}

export default CompetFirstCard
