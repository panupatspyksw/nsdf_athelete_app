import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import dayjs from "dayjs"
import { Colors, Styled } from "../Styled"
import ActivityIcon from "../assets/calendar.svg"
import BackArrow from "../assets/back.svg"

const buddhistEra = require("dayjs/plugin/buddhistEra")
const localeData = require("dayjs/plugin/localeData")
const localizedFormat = require("dayjs/plugin/localizedFormat")
const customParseFormat = require("dayjs/plugin/customParseFormat")
dayjs.extend(buddhistEra)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(customParseFormat)

const getDaysInWeek = (weekStartDate) => {
  const daysInWeek = []
  for (let i = 0; i < 7; i++) {
    daysInWeek.push(weekStartDate.add(i, "day"))
  }
  return daysInWeek
}

function getDaysInMonth(month) {
  const firstDayOfMonth = dayjs(month).startOf("month")
  const firstDayOfWeek = dayjs(firstDayOfMonth).startOf("week")
  const days = []
  for (let i = 0; i < 42; i++) {
    const day = dayjs(firstDayOfWeek).add(i, "days")
    const isCurrentMonth = day.month() === month.month()
    days.push({ day, isCurrentMonth })
  }
  return days
}

const CalendarComponent = ({
  setSelectedDate,
  selectedDate,
  setIsFilterDate,
  onClickAtCalendarIcon,
  events,
  calendarMode,
  setCalendarMode,
  style
}) => {
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const weekStartDates = getDaysInWeek(selectedDate.startOf("week"))
  const monthStartDates = getDaysInMonth(selectedDate.startOf("month"))

  const handleTouchableOpacityPress = (index) => {
    setSelectedDate(weekStartDates[index])
    setIsFilterDate(true)
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 24,
          backgroundColor: "white",
          ...style
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(selectedDate.subtract(1, "week"))
            }}
          >
            <BackArrow height={10} />
          </TouchableOpacity>
          <Text
            style={{
              marginHorizontal: 10,
              fontFamily: "NotoSansThai-Bold",
              fontWeight: "600",
              fontSize: 16,
              color: Colors.titleday
            }}
          >
            {selectedDate.format("MMMM BBBB")}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(selectedDate.add(1, "week"))
            }}
            style={{
              transform: [{ rotate: "180deg" }]
            }}
          >
            <BackArrow height={10} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (calendarMode === "month") {
              setCalendarMode("week")
            } else {
              setCalendarMode("month")
            }
            setIsFilterDate(false)
            onClickAtCalendarIcon ? onClickAtCalendarIcon() : null
          }}
        >
          <ActivityIcon
            style={{
              color: Colors.spotlightDay
            }}
          />
        </TouchableOpacity>
      </View>
      {/* calendar */}
      {calendarMode === "week" ? (
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 24,
            width: "100%",
            marginTop: 10,
            overflow: "hidden",
            alignItems: "center"
          }}
        >
          {week.map((day, index) => {
            const isSelected = selectedDate.isSame(weekStartDates[index], "d")
            return (
              <TouchableOpacity
                onPress={() => {
                  handleTouchableOpacityPress(index)
                }}
              >
                <View
                  key={day}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isSelected ? Colors.spotlightDay : null
                  }}
                >
                  <View
                    style={{
                      backgroundColor: isSelected
                        ? null
                        : Colors.softDisableDay,
                      width: "100%"
                    }}
                  >
                    <Text
                      style={{
                        ...Styled.context,
                        color: isSelected ? "#FFF" : Colors.detailTextDay,
                        width: "100%",
                        textAlign: "center"
                      }}
                    >
                      {day}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontFamily: "NotoSansThai-Bold",
                      color: isSelected
                        ? "#FFF"
                        : events
                        ? events.find(
                            (_event) =>
                              dayjs(_event.start_date)
                                .locale("th")
                                .format("dd-mm-yyy") ===
                              dayjs(weekStartDates[index])
                                .locale("th")
                                .format("dd-mm-yyy")
                          )
                          ? Colors.greenDay
                          : Colors.titleday
                        : Colors.titleday,
                      width: "100%",
                      textAlign: "center",
                      fontWeight: "600"
                    }}
                  >
                    {weekStartDates[index].format("D")}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      ) : (
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            borderColor: 1
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              overflow: "hidden"
            }}
          >
            {week.map((day, index) => {
              const isSelected = selectedDate.isSame(weekStartDates[index])
              return (
                <View
                  key={day}
                  style={{
                    width: 50,
                    height: 25,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isSelected ? Colors.spotlightDay : null
                  }}
                >
                  <Text
                    style={{
                      ...Styled.context,
                      color: isSelected ? "#FFF" : Colors.detailTextDay,

                      width: "100%",
                      textAlign: "center"
                    }}
                  >
                    {day}
                  </Text>
                </View>
              )
            })}
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: Colors.softDisableDay,
              borderRadius: 10
            }}
          >
            {monthStartDates.map((date, index) => {
              const isSelected = selectedDate.isSame(date.day, "d")
              return (
                <TouchableOpacity
                  disabled={!date.isCurrentMonth}
                  onPress={() => {
                    setSelectedDate(date.day)
                    setIsFilterDate(true)
                  }}
                >
                  <View
                    style={{
                      width: 50,
                      height: 40,
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isSelected ? Colors.spotlightDay : null
                    }}
                  >
                    {date.isCurrentMonth ? (
                      <Text
                        style={{
                          fontFamily: "NotoSansThai-Bold",
                          fontWeight: "600",
                          color: isSelected
                            ? "#FFF"
                            : events
                            ? events.find(
                                (_event) =>
                                  dayjs(_event.start_date)
                                    .locale("th")
                                    .format("DD/MM/YYYY") ===
                                  dayjs(date.day)
                                    .locale("th")
                                    .format("DD/MM/YYYY")
                              )
                              ? Colors.greenDay
                              : Colors.titleday
                            : Colors.titleday
                        }}
                      >
                        {date.day.format("DD")}
                      </Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      )}
    </View>
  )
}

export default CalendarComponent
