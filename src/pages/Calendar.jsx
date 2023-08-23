import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native"
import dayjs from "dayjs"
import { Border, Colors, Font, Styled } from "../Styled"
import { t } from "i18n-js"
import ClockIcon from "../assets/clock.svg"
import MarkerIcon from "../assets/markerdisable.svg"
import SearchIcon from "../assets/SearchIcon.svg"
import Close from "../assets/close.svg"
import Header from "../components/Header"
import { TextInput } from "react-native-gesture-handler"
import CalendarComponent from "../components/CalendarComponent"
import { getPostActivity } from "../apiNew"

const buddhistEra = require("dayjs/plugin/buddhistEra")
const localeData = require("dayjs/plugin/localeData")
const localizedFormat = require("dayjs/plugin/localizedFormat")
const customParseFormat = require("dayjs/plugin/customParseFormat")
dayjs.extend(buddhistEra)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(customParseFormat)

const Calendar = ({ navigation }) => {
  const [keyword, setKeyword] = useState("")
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [isFilterDate, setIsFilterDate] = useState(false)
  const [events, setEvents] = useState([])
  const [calendarMode, setCalendarMode] = useState("week")

  // Handle keyword change with debounce
  const handleKeywordChange = (value) => {
    setKeyword(value)
  }

  // debouce
  useEffect(() => {
    if (keyword) {
      const getData = setTimeout(async () => {
        await getPostActivity({
          search: keyword
        }).then((res) => {
          setEvents(res.body.lists)
        })
      }, 200)

      return () => clearTimeout(getData)
    }
  }, [keyword])

  useEffect(() => {
    if (selectedDate && isFilterDate) {
      getPostActivity({
        date: selectedDate.format("YYYY-MM-DD")
      })
        .then((data) => {
          setEvents([...data.body.lists])
          setKeyword("")
        })
        .catch((error) => {
          console.error("Error fetching events:", error)
        })
    } else {
      getPostActivity().then((data) => {
        // console.log(data.body.lists)
        setEvents([...data.body.lists])
        setKeyword("")
      })
    }
  }, [isFilterDate, selectedDate])

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
          navigation={navigation}
          title={t("activity_calendar_list")}
        />
        <CalendarComponent
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          setIsFilterDate={setIsFilterDate}
          onClickAtCalendarIcon={async () => {
            await getPostActivity().then((data) => {
              setEvents([...data.body.lists])
              setKeyword("")
            })
          }}
          setCalendarMode={setCalendarMode}
          calendarMode={calendarMode}
          events={events}
        />

        {/* row */}
        <View>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 24,
              alignItems: "flex-start",
              width: "100%"
            }}
          >
            <Text
              style={{
                fontFamily: "NotoSansThai-Bold",
                fontWeight: "600",
                fontSize: 16,
                color: Colors.titleday
              }}
            >
              {t("activity_calendar")}
            </Text>
          </View>
          <View
            style={{
              marginTop: 15,
              paddingHorizontal: 24
            }}
          >
            <View
              style={{
                borderRadius: 24,
                height: 38,
                borderWidth: 0.5,
                borderColor: "#D9E0FF",
                backgroundColor: "#ffff",
                ...Border.cardColorDay,
                paddingLeft: 20,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <SearchIcon />
              <TextInput
                autoCapitalize={"none"}
                onChangeText={handleKeywordChange}
                value={keyword}
                autoCorrect={false}
                style={{
                  marginLeft: 13,
                  height: "100%",
                  flex: 1
                }}
                onEndEditing={async () => {
                  await getPostActivity({
                    search: keyword
                  }).then((res) => {
                    setEvents(res.body.lists)
                  })
                }}
                placeholder={t("search")}
              />
              {keyword || isFilterDate ? (
                <TouchableOpacity
                  style={{
                    height: "100%",
                    width: 40,
                    justifyContent: "center",
                    alignItems: "flex-end",
                    paddingRight: 22,
                    borderBottomRightRadius: 20,
                    borderTopRightRadius: 20
                  }}
                  onPress={async () => {
                    await getPostActivity().then((data) => {
                      setEvents([...data.body.lists])
                      setKeyword("")
                      setIsFilterDate(false)
                    })
                  }}
                >
                  <Close color="#4B4B4B" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <ScrollView
            style={{
              height: calendarMode === "week" ? "65%" : "30%",
              marginVertical: 12
            }}
            contentContainerStyle={{
              alignItems: "center",
              paddingHorizontal: 24
            }}
          >
            {events.map((event) => {
              const date = dayjs(event.start_date).locale("th")
              const end = dayjs(event.end_date).locale("th")
              const isActive = end.isAfter(dayjs())
              return (
                <TouchableOpacity
                  style={{
                    width: "100%",
                    marginBottom: 15,
                    backgroundColor: isActive ? "#ffffff" : "#f4f4f4",
                    borderRadius: 12,
                    overflow: "hidden",
                    ...Border.cardColorDay
                  }}
                  onPress={() => {
                    navigation.navigate("viewActivity", {
                      event
                    })
                  }}
                >
                  <View
                    style={{
                      shadowColor: "#4786FF",
                      shadowOffset: {
                        width: 4,
                        height: 4
                      },
                      shadowOpacity: 0.05,
                      shadowRadius: 25,
                      elevation: 5,
                      flex: 1,
                      overflow: "hidden",
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: isActive ? "#8AE0CB" : Colors.redday,
                        height: "100%",
                        width: 15,
                        borderTopLeftRadius: 15,
                        borderBottomLeftRadius: 15,
                        marginRight: 12
                      }}
                    />
                    <View
                      style={{
                        height: "100%",
                        width: "100%",
                        paddingVertical: 10,
                        flexDirection: "row"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start"
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            width: "10%"
                          }}
                        >
                          {isActive ? (
                            <>
                              <Text
                                style={{
                                  marginRight: 10,
                                  ...Styled.head,
                                  fontWeight: "600",
                                  color: "#8AE0CB"
                                }}
                              >
                                {date.format("DD")}
                              </Text>
                              <Text
                                style={{
                                  marginRight: 10,
                                  ...Styled.small,
                                  fontWeight: "600"
                                }}
                              >
                                {date.format("MMM")}
                              </Text>
                            </>
                          ) : (
                            <Text
                              style={{
                                marginRight: 10,
                                ...Font.contextBold,
                                color: Colors.detailTextDay,
                                writingDirection: "rtl", // for correct alignment in some cases
                                transform: [{ rotate: "90deg" }],
                                width: 60
                              }}
                            >
                              EXPIRED
                            </Text>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                            width: "90%",
                            paddingRight: 10
                          }}
                        >
                          <View style={{ paddingRight: 10 }}>
                            <Text
                              style={{
                                marginRight: 10,
                                ...Styled.head,
                                fontWeight: "600",
                                color: isActive
                                  ? Colors.textday
                                  : Colors.detailTextDay
                              }}
                            >
                              {event.title}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center"
                              }}
                            >
                              <ClockIcon />
                              <Text
                                style={{
                                  marginHorizontal: 10,
                                  ...Styled.small,
                                  color: isActive
                                    ? Colors.textday
                                    : Colors.detailTextDay
                                }}
                              >
                                {dayjs(event.start_date).format("D MMM YYYY")} -{" "}
                                {dayjs(event.end_date).format("D MMM YYYY")}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center"
                              }}
                            >
                              <MarkerIcon />
                              <Text
                                style={{
                                  marginHorizontal: 10,
                                  ...Styled.small,
                                  color: isActive
                                    ? Colors.textday
                                    : Colors.detailTextDay
                                }}
                              >
                                {event.location_name ?? t("no_content")}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Calendar
