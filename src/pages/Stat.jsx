import { Platform, SafeAreaView, ScrollView, Text, View } from "react-native"
import { Colors, Font, Styled } from "../Styled"
import { t } from "i18n-js"
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import _ from "lodash"
import Male from "../assets/male.svg"
import Female from "../assets/female.svg"
import Hicon from "../assets/h.svg"
import Wicon from "../assets/w.svg"
import LoveIcon from "../assets/loveIcon.svg"
import { AppContext } from "../Context"
import FastImage from "react-native-fast-image"
import dayjs from "dayjs"
import DatePicker from "react-native-date-picker"
import AppleHealthKit from "react-native-health"
import { PieChart } from "react-native-chart-kit"
import GoogleFit, { BucketUnit } from "react-native-google-fit"
import Header from "../components/Header"
import PopupSheetSuccess from "../components/PopupSheetSuccess"
import { Toast } from "react-native-toast-message/lib/src/Toast"
import { getMyTrainingStats } from "../apiNew"
import PainComp from "../components/PainComp"
const isToday = require("dayjs/plugin/isToday")

dayjs.extend(isToday)

export default function Stat({ navigation, route }) {
  const { user: mainUser } = useContext(AppContext)
  const [heartRate, setHeartRate] = useState(0)
  const [heartDate, setHeartDate] = useState()
  const [calcTime, setCalcTime] = useState()
  const actionRef = useRef(null)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [workout, setWorkout] = useState()
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

  const getHeartRateIOS = () => {
    AppleHealthKit.getHeartRateSamples(
      {
        unit: "bpm",
        startDate: new Date(2021, 1, 1).toISOString(),
        endDate: new Date().toISOString(),
        ascending: false
      },
      (_err, results) => {
        setHeartRate(results[0].value)
        setHeartDate(results[0].endDate)
        getTimePass()
      }
    )
  }

  const getHeartRateAndroid = async () => {
    const opt = {
      startDate: "2017-01-01T00:00:17.971Z", // required
      endDate: new Date().toISOString(), // required
      bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1 // optional - default 1.
    }

    GoogleFit.checkIsAuthorized().then(async () => {
      if (GoogleFit.isAuthorized) {
        const heartRateAd = await GoogleFit.getHeartRateSamples(opt)
        let hrSrt = heartRateAd.sort(
          (a, b) => new Date(a.end_date) - new Date(b.end_date)
        )
        setHeartRate(hrSrt[0].value)
        setHeartDate(hrSrt[0].endDate)
      } else {
        Toast.show({
          type: "error",
          text1: "Heart rate not authorized",
          text2: "Please give permission to Google Fit"
        })
      }
    })
  }

  // useEffect(() => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Platform.OS === "ios") {
        getHeartRateIOS()
      } else if (Platform.OS === "android") {
        GoogleFit.checkIsAuthorized().then(() => {
          if (GoogleFit.isAuthorized) {
            getHeartRateAndroid()
          }
        })
      }
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // }, [heartRate])

  useEffect(() => {
    if (Platform.OS === "ios") {
      getHeartRateIOS()
    } else if (Platform.OS === "android") {
      getHeartRateAndroid()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!workout && !pain) {
      getMyTrainingStats().then((res) => {
        setWorkout(res.body)
        setPain(res.body.accident)
      })
    }
  }, [pain, workout])

  // array of color in thailand in hex
  const colors = ["#FF9559", "#FF6263", "#30DA9D", "#FFDF6C"]

  let seriesData =
    workout &&
    workout.training.map((i, _key) => {
      return {
        time: i.duration,
        color: colors[Math.floor(Math.random() * 4)],
        name: i.typeName
      }
    })

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1
      }}
    >
      <DatePicker
        modal
        mode={"date"}
        open={open}
        date={dayjs(date).toDate()}
        onConfirm={(_date) => {
          setOpen(false)
          setDate(_date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        maximumDate={new Date()}
      />
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
              {mainUser ? (
                <FastImage
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  source={{
                    uri: mainUser.image,
                    priority: FastImage.priority.normal
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ) : mainUser && mainUser.gender === "ชาย" ? (
                <Male
                  height={100}
                  width={100}
                />
              ) : (
                <Female
                  height={100}
                  width={100}
                />
              )}
            </View>
            <Text
              style={{
                ...Styled.head,
                marginTop: 13,
                fontWeight: 600,
                color: Colors.titleday
              }}
            >{`${mainUser.first_name} ${mainUser.last_name}`}</Text>
            <Text
              style={{
                ...Styled.small,
                color: Colors.detailTextDay
              }}
            >
              {mainUser?.roleName}
              {mainUser?.sport_type ?? ""}
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
                    {mainUser?.height} cm.
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
                    {mainUser?.weight} kg.
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
                        fontWeight: "600"
                      }}
                    >
                      {heartRate ?? 0}{" "}
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
      <PopupSheetSuccess
        actionSheetRef={actionRef}
        title={
          mainUser.group === "athlete"
            ? "การบันทึกสำเร็จ!"
            : "การมอบหมายสำเร็จ!"
        }
        subTitle={
          mainUser.group === "athlete"
            ? "นักกีฬาได้บันทึกการฝึกซ้อมแล้วคุณสามารถดูสถิติการฝึกซ้อมได้!"
            : "นักกีฬาได้รับมอบหมายการฝึกซ้อมแล้วคุณสามารถดูสถิติหลังการฝึกซ้อมเสร็จสิ้นได้"
        }
      />
    </SafeAreaView>
  )
}
