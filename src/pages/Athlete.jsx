import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import React, { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import Header from "../components/Header"
import { getThatCoachAthlete } from "../apiNew"
import FastImage from "react-native-fast-image"
import { AppContext } from "../Context"
const isToday = require("dayjs/plugin/isToday")

dayjs.extend(isToday)

export default function Athlete({ navigation }) {
  const { user } = useContext(AppContext)
  const [members, setMembers] = useState()

  useEffect(() => {
    if (!members && user) {
      getThatCoachAthlete()
        .then((res) => {
          setMembers(res.body.lists)
        })
        .catch((err) => console.error(err))
    }
  }, [members, user])

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
        title={`${t("stat")}${t("athlete")}`}
      />
      <ScrollView
        style={{
          paddingHorizontal: 24
        }}
      >
        <Text
          style={{
            ...Styled.small,
            color: Colors.gray3
          }}
        >
          {`นักกีฬาในสังกัด ${(members && members.length) || 0} คน`}
        </Text>
        {members &&
          members.length > 0 &&
          members.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push("AthleteStatCoachView", {
                    id: item.athleteID
                  })
                }}
              >
                <View
                  key={"member" + index}
                  style={{
                    marginTop: 18,
                    backgroundColor: "#FFFFFF",
                    shadowColor: "#3155F8",
                    shadowOffset: {
                      width: 2,
                      height: 4
                    },
                    shadowOpacity: 0.05,
                    shadowRadius: 12,
                    borderRadius: 10,
                    paddingVertical: 18,
                    paddingHorizontal: 12,
                    flexDirection: "row"
                  }}
                >
                  <View>
                    <FastImage
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                      source={{
                        uri: item.image,
                        priority: FastImage.priority.normal
                      }}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: 12
                    }}
                  >
                    <Text
                      style={{
                        ...Styled.contextBold,
                        color: Colors.textday
                      }}
                    >
                      {item.first_name} {item.last_name}
                    </Text>
                    <Text
                      style={{
                        ...Styled.small,
                        color: Colors.textday
                      }}
                    >
                      {t("athlete")} {item.sporttype}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
      </ScrollView>
    </SafeAreaView>
  )
}
