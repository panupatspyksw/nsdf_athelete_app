import { Platform, SafeAreaView, ScrollView, Text, View } from "react-native"
import { Colors, Font, Styled } from "../Styled"
import { t } from "i18n-js"
import React, { useCallback, useEffect, useState } from "react"
import _ from "lodash"
import Hicon from "../assets/h.svg"
import Wicon from "../assets/w.svg"
import LoveIcon from "../assets/loveIcon.svg"
import FastImage from "react-native-fast-image"
import dayjs from "dayjs"
import { PieChart } from "react-native-chart-kit"
import Header from "../components/Header"
import { getThatCoachAthleteById } from "../apiNew"
import PainComp from "../components/PainComp"
const isToday = require("dayjs/plugin/isToday")

dayjs.extend(isToday)

const AthleteStatCoachView = ({ navigation, route }) => {
  const id = route.params?.id
  const [athlete, setAthlete] = useState()
  const [calcTime, setCalcTime] = useState()
  const [heartDate, setHeartDate] = useState()
  const [pain, setPain] = useState()

  const getTimePass = useCallback(() => {
    const currentDate = dayjs()
    const diffInMinutes = currentDate.diff(heartDate, "minutes")
    const diffInHours = currentDate.diff(heartDate, "hours")
    const diffInDays = currentDate.diff(heartDate, "days")

    if (diffInMinutes < 60) {
      setCalcTime(`${diffInMinutes} นาที`)
    } else if (diffInHours < 24) {
      setCalcTime(`${diffInHours} ชม.`)
    } else {
      setCalcTime(`${diffInDays} วัน`)
    }
  }, [heartDate])

  useEffect(() => {
    if (!athlete && id && !pain) {
      getThatCoachAthleteById(id).then((res) => {
        setAthlete(res.body)
        setPain(res.body.accident)
      })
    }
  }, [athlete, id, pain])

  console.log(seriesData)

  const colors = ["#FF9559", "#FF6263", "#30DA9D", "#FFDF6C"]

  let seriesData =
    athlete &&
    athlete.training.map((i, key) => {
      return {
        time: i.duration,
        color: colors[Math.floor(Math.random() * 4)],
        name: i.typeName
      }
    })

  return athlete ? (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1
      }}
    >
      <Header
        arrow
        navigation={navigation}
        title={t("stat")}
      />
      <ScrollView style={{ marginBottom: 10 }}>
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              paddingHorizontal: 24,
              alignItems: "center"
            }}
          >
            <View>
              <FastImage
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={{
                  uri: athlete.profile[0].image,
                  priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <Text
              style={{
                ...Styled.head,
                marginTop: 13,
                fontWeight: 600,
                color: Colors.titleday
              }}
            >{`${athlete.profile[0].first_name} ${athlete.profile[0].last_name}`}</Text>
            <Text
              style={{
                ...Styled.small,
                color: Colors.detailTextDay
              }}
            >
              {athlete.profile[0].sporttypeName}
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: "#FFFFFF",
              shadowColor: "#7AAFDF",
              shadowOffset: { width: 4, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
              borderRadius: 10,
              marginHorizontal: 24,
              flexDirection: "row",
              paddingVertical: 15,
              paddingHorizontal: 35,
              justifyContent: "center",
              borderWidth: Platform.OS === "android" ? 0.2 : 0,
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                rowGap: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Hicon />
                <View
                  style={{
                    marginLeft: 10
                  }}
                >
                  <Text
                    style={{
                      ...Font.smallBold,
                      color: Colors.titleday,
                      fontWeight: "600"
                    }}
                  >
                    {athlete.profile[0].height} cm.
                  </Text>
                  <Text
                    style={{
                      ...Font.detail,
                      color: Colors.detailTextDay,
                      fontWeight: "600"
                    }}
                  >
                    Height
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Wicon />
                <View
                  style={{
                    marginLeft: 10
                  }}
                >
                  <Text
                    style={{
                      ...Font.smallBold,
                      color: Colors.titleday,
                      fontWeight: "600"
                    }}
                  >
                    {athlete.profile[0].weight} kg.
                  </Text>
                  <Text
                    style={{
                      ...Font.detail,
                      color: Colors.detailTextDay,
                      fontWeight: "600"
                    }}
                  >
                    Weight
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginLeft: 37.5
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <LoveIcon />

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        ...Font.bigHead,
                        color: Colors.redday,
                        fontWeight: "600",
                        marginRight: 5
                      }}
                    >
                      {athlete.profile[0].bpm || 0}
                    </Text>
                    <Text style={{ ...Font.smallBold, color: Colors.titleday }}>
                      bpm
                    </Text>
                  </View>
                  <Text style={{ ...Font.detail, color: Colors.detailTextDay }}>
                    {calcTime} ago
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* training */}
          <View
            style={{
              paddingHorizontal: 24,
              marginTop: 20
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                shadowColor: "#7AAFDF",
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 20,
                borderRadius: 10,
                padding: 15,
                borderWidth: Platform.OS === "android" ? 0.2 : 0
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    ...Styled.contextBold,
                    color: Colors.titleday
                  }}
                >
                  {t("workout", { defaultValue: "รายการฝึกซ้อม" })}
                </Text>
                {/* <TouchableOpacity
                onPress={() => {
                  // setOpen(true)
                }}
              >
                <View
                  style={{
                    backgroundColor: "#F2F5FF",
                    shadowColor: "#000000",
                    shadowOffset: { width: 4, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 25,
                    borderRadius: 6,
                    padding: 12,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      ...Styled.contextBold,
                      color: Colors.titleday,
                      marginRight: 15
                    }}
                  >
                    {dayjs(date).isToday()
                      ? "Today"
                      : dayjs(date).format("DD MMMM YYYY")}
                  </Text>
                  <DownIcon />
                </View>
              </TouchableOpacity> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 15
                }}
              >
                {seriesData && seriesData.length > 0 ? (
                  <PieChart
                    data={seriesData.map((item, index) => {
                      const totalMinutes = seriesData.reduce(
                        (total, _item) => total + _item.time,
                        0
                      )
                      return {
                        population: (item.time / totalMinutes) * 100,
                        color: item.color
                      }
                    })}
                    paddingLeft={150 / 4}
                    width={150}
                    height={150}
                    chartConfig={{
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                    }}
                    accessor={"population"}
                    absolute
                    backgroundColor="transparent"
                    hasLegend={false}
                  />
                ) : null}
                <ScrollView
                  contentContainerStyle={{
                    justifyContent: "flex-start"
                  }}
                >
                  {seriesData && seriesData.length > 0 ? (
                    seriesData.map((item, index) => {
                      return (
                        <View
                          key={"workout" + item.name}
                          style={{
                            flexDirection: "row",
                            marginBottom: 15,
                            alignItems: "center"
                          }}
                        >
                          <View
                            style={{
                              width: 15,
                              height: 15,
                              borderRadius: 7.5,
                              backgroundColor: item.color,
                              marginRight: 15,
                              flexDirection: "column"
                            }}
                          />
                          <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text
                              style={{
                                ...Font.small,
                                color: Colors.titleday,
                                flex: 1
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                ...Styled.small,
                                color: Colors.detailTextDay
                              }}
                            >
                              {item.time} min
                            </Text>
                          </View>
                        </View>
                      )
                    })
                  ) : (
                    <Text>ไม่มีข้อมูลในขณะนี้</Text>
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
          {/* pain */}
          <View
            style={{
              paddingHorizontal: 24,
              marginTop: 20
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                shadowColor: "#7AAFDF",
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 20,
                borderRadius: 10,
                padding: 15,
                borderWidth: Platform.OS === "android" ? 0.2 : 0
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    ...Styled.contextBold,
                    color: Colors.titleday
                  }}
                >
                  {t("pain")}
                </Text>
              </View>
              {pain && pain.length > 0 ? (
                <PainComp
                  ac1={pain.find((i) => i.accidentCode === 1)?.times || 0}
                  ac2={pain.find((i) => i.accidentCode === 2)?.times || 0}
                  ac3={pain.find((i) => i.accidentCode === 3)?.times || 0}
                />
              ) : (
                <PainComp
                  ac1={0}
                  ac2={0}
                  ac3={0}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <></>
  )
}

export default AthleteStatCoachView
