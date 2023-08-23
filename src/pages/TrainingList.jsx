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
import { getMyTrainingList } from "../apiNew"

const TrainingList = ({ navigation }) => {
  const [trainingList, setTrainingList] = useState()

  useEffect(() => {
    if (!trainingList) {
      getMyTrainingList()
        .then((_res) => {
          setTrainingList(_res.body.lists)
        })
        .catch((err) => console.error(err))
    }
  }, [trainingList])

  console.log(trainingList)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        arrow
        navigation={navigation}
        title="รายการฝึกซ้อม"
      />
      <View style={{ paddingHorizontal: 25 }}>
        <Text>
          รายการฝึกซ้อม {(trainingList && trainingList.length) || 0} รายการ
        </Text>
        <ScrollView style={{ marginTop: 18, height: "80%" }}>
          {trainingList &&
            trainingList.length > 0 &&
            trainingList.map((_data) => (
              <TouchableOpacity
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
                onPress={() =>
                  navigation.push("TrainingListId", { id: _data.id })
                }
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
                      <MnC />
                      <Text style={{ ...Font.small, color: Colors.textday }}>
                        {_data.start_time} -{_data.end_time}
                      </Text>
                    </View>
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
                          color:
                            _data.statusCode === 1
                              ? Colors.redday
                              : Colors.greenDay
                        }}
                      >
                        {_data.statusCode === 1
                          ? "ยังไม่ได้บันทึกการฝึกซ้อม"
                          : "บันทึกการฝึกซ้อมแล้ว"}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default TrainingList
