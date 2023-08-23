import React, { useEffect, useState } from "react"
import { SafeAreaView, Text, View } from "react-native"
import { MOCK_COMPET_DATA } from "../constants/mockdata"
import Header from "../components/Header"
import { t } from "i18n-js"
import SearchComponent from "../components/SearchComponent"
import dayjs from "dayjs"
import { ScrollView } from "react-native"
import { Colors, Font } from "../Styled"
import CompetFirstCard from "../components/CompetFirstCard"
import CompetCard from "../components/CompetCard"

const CompetitionDetail = ({ navigation, route }) => {
  const id = route.params.id

  const competData = MOCK_COMPET_DATA.filter(
    (_data) => _data.compet_sport.toLowerCase() === id.toLowerCase()
  ).sort((a, b) => {
    const dateA = dayjs(a.compet_start)
    const dateB = dayjs(b.compet_start)
    return dateA - dateB
  })

  const competInComing = competData.filter(
    (_data) => _data.compet_status.toLowerCase() === "incoming"
  )

  const competDone = competData.filter(
    (_data) => _data.compet_status.toLowerCase() === "done"
  )

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        height: "100%",
        alignItems: "center"
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%"
        }}
      >
        <Header
          arrow
          title={t("competition")}
          navigation={navigation}
        />
        {/* content */}
        <View
          style={{
            flex: 1,
            width: "100%",
            paddingHorizontal: 24
          }}
        >
          {/* <SearchComponent /> */}
          {competInComing.length > 0 && (
            <ScrollView style={{ marginVertical: 24 }}>
              <View style={{ rowGap: 12 }}>
                <Text style={{ ...Font.title, color: Colors.titleday }}>
                  {competInComing[0].compet_name}
                </Text>
                {/* first Card */}
                <CompetFirstCard
                  status={competInComing[0].compet_status}
                  compet_place={competInComing[0].compet_place}
                  picLeft={competInComing[0].compet_p1_img}
                  countryLeft={competInComing[0].compet_p1_country}
                  nameLeft={competInComing[0].compet_p1_name}
                  picRight={competInComing[0].compet_p2_img}
                  countryRight={competInComing[0].compet_p2_country}
                  nameRight={competInComing[0].compet_p2_name}
                  time={competInComing[0].compet_start}
                />
                {competInComing.map((_data, _index) => {
                  return (
                    _index > 0 && (
                      <CompetCard
                        picLeft={_data.compet_p1_img}
                        countryLeft={_data.compet_p1_country}
                        nameLeft={_data.compet_p1_name}
                        picRight={_data.compet_p2_img}
                        countryRight={_data.compet_p2_country}
                        nameRight={_data.compet_p2_name}
                        status={_data.compet_status}
                        time={_data.compet_start}
                      />
                    )
                  )
                })}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CompetitionDetail
