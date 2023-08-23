import React, { useEffect, useMemo, useState } from "react"
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native"
import Header from "../components/Header"
import { Border, Colors, Font } from "../Styled"
import Dumble from "../assets/dumble.svg"
import Wt from "../assets/whistle.svg"
import Pin from "../assets/pin.svg"
import MnC from "../assets/miniClock.svg"
import dayjs from "dayjs"
import { getMyTrainingListById } from "../apiNew"
import Button from "../components/Button"
import { t } from "i18n-js"

const TrainingListId = ({ navigation, route }) => {
  const [trainingList, setTrainingList] = useState()
  const [coachDetail, setCoachDetail] = useState()
  const id = route.params.id

  useEffect(() => {
    if (!trainingList && id) {
      getMyTrainingListById(id)
        .then((_res) => {
          setTrainingList(_res.body.trainingLists)
          setCoachDetail(_res.body.assignment)
        })
        .catch((err) => console.error(err))
    }
  }, [id, trainingList])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        arrow
        navigation={navigation}
        title="รายการฝึกซ้อม"
      />
      <View style={{ paddingHorizontal: 25 }}>
        <Text>
          รายละเอียดการฝึกซ้อมทั้งหมด{" "}
          {(trainingList && trainingList.length) || 0} รายการ
        </Text>
        <ScrollView style={{ marginTop: 18, height: "80%" }}>
          {trainingList &&
            trainingList.length > 0 &&
            trainingList.map((_data) => (
              <View
                key={_data.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  height: 120,
                  paddingVertical: 16,
                  paddingHorizontal: 24,
                  marginBottom: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  ...Border.cardColorDay
                }}
              >
                <View
                  style={{
                    flex: 1,
                    marginLeft: 12,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    columnGap: 12
                  }}
                >
                  <Dumble />
                  <View>
                    <Text
                      style={{
                        ...Font.contextBold,
                        color: Colors.titleday,
                        marginBottom: 6
                      }}
                    >
                      {_data.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        columnGap: 7,
                        alignItems: "center"
                      }}
                    >
                      <Wt />
                      <Text
                        style={{
                          ...Font.small,
                          color: Colors.textday
                        }}
                      >
                        {_data.typeName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        columnGap: 7,
                        alignItems: "center"
                      }}
                    >
                      <MnC />
                      <Text style={{ ...Font.small, color: Colors.textday }}>
                        <Text
                          style={{ color: Colors.greenDay, ...Font.smallBold }}
                        >
                          {_data.time}
                        </Text>{" "}
                        นาที
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        columnGap: 7,
                        alignItems: "center"
                      }}
                    >
                      <Pin />
                      <Text style={{ ...Font.small, color: Colors.textday }}>
                        {_data.location}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
      {coachDetail && coachDetail.statusCode === 1 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            position: "absolute",
            bottom: 10,
            width: "100%"
          }}
        >
          <Button
            onPress={() => navigation.push("TrainingSave", { id: id })}
            label={t("next")}
          />
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  )
}

export default TrainingListId
