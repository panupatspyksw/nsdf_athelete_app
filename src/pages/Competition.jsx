import React from "react"
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { t } from "i18n-js"
import Header from "../components/Header"
import { uniqueType } from "../constants/mockdata"
import { ScrollView } from "react-native"
import SearchComponent from "../components/SearchComponent"
import { capitalizeText } from "../helper"
import { Border } from "../Styled"

export default function Competition({ navigation }) {
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
          width: "100%",
          paddingHorizontal: 24
        }}
      >
        <Header
          navigation={navigation}
          title={t("competition")}
        />
        {/* <SearchComponent /> */}
        <ScrollView style={{ rowGap: 10, paddingVertical: 10 }}>
          {uniqueType.map((_data) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFFFFF",
                  ...Border.cardColorDay,
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 12,
                  flexDirection: "row",
                  alignItems: "center"
                }}
                onPress={() =>
                  navigation.navigate("CompetitionDetail", { id: _data })
                }
              >
                <Text>{capitalizeText(_data)}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
