import React, { Fragment, useContext, useEffect, useState } from "react"
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import Header from "../components/Header"
import SearchComponent from "../components/SearchComponent"
import CalendarComponent from "../components/CalendarComponent"
import dayjs from "dayjs"
import { Colors, Font, Styled } from "../Styled"
import AddIcon from "../assets/addIcon.svg"
import { AppContext } from "../Context"
import CheckBox from "@react-native-community/checkbox"
import Button from "../components/Button"
import { t } from "i18n-js"
import Pin from "../assets/pin.svg"
import MnC from "../assets/miniClock.svg"
import { coachCreateTrainingList, getCoachTrainingList } from "../apiNew"
import { Modal, Select } from "native-base"
import { InputForm, OptionsForm } from "../components/Form"
import { Controller, useForm } from "react-hook-form"
import DatePicker from "react-native-date-picker"

const touchStyle = {
  backgroundColor: "#FFFFFF",
  shadowColor: "#7AAFDF",
  shadowOffset: {
    width: 4,
    height: 4
  },
  shadowOpacity: 1,
  shadowRadius: 20,
  borderRadius: 10,
  elevation: 8,
  height: 120,
  paddingVertical: 16,
  paddingHorizontal: 24,
  marginBottom: 12,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between"
}
const AssignmentList = ({ navigation }) => {
  const { user, trainingType } = useContext(AppContext)
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [calendarMode, setCalendarMode] = useState("week")
  const [selectedList, setSelectedList] = useState([])
  const [trainingList, setTrainingList] = useState([])
  const [isFilterDate, setIsFilterDate] = useState(false)

  const [open, setOpen] = useState(false)
  const [timeStart, setTimeStart] = useState(new Date())
  const [timeEnd, setTimeEnd] = useState(new Date())

  const [text, setText] = useState("")
  const [keyword, setKeyword] = useState("")

  const fetchTrainingList = () => {
    getCoachTrainingList().then((res) => {
      setTrainingList(res.body.lists)
    })
  }

  useEffect(() => {
    if (user && keyword === "") {
      fetchTrainingList()
    }
  }, [keyword, user])

  const handleKeywordChange = (value) => {
    setKeyword(value)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword) {
        getCoachTrainingList().then((res) => {
          console.log(res.body.lists)
          const filteredMembers =
            keyword === ""
              ? res.body.lists
              : res.body.lists.filter((l) => l.name.includes(keyword))
          setTrainingList(filteredMembers)
        })
      }
    }, 200)

    return () => clearTimeout(timer)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  const handleCheckboxChange = (item) => {
    if (selectedList.includes(item.id)) {
      setSelectedList(selectedList.filter((id) => id !== item.id))
    } else {
      setSelectedList([...selectedList, item.id])
    }
  }

  const openModal = () => {
    setOpen(true)
  }

  const Form = useForm()

  const { watch, control } = Form

  const INPUT = [
    {
      label: "ประเภทการฝึกซ้อม",
      name: "type",
      type: "select",
      options: trainingType,
      required: t("required"),
      placeholder: "เลือกประเภทการฝึกซ้อม"
    },
    {
      label: "รายการฝึกซ้อม",
      name: "name",
      type: "text",
      required: t("required"),
      placeholder: "e.g. วิ่ง"
    },
    {
      label: "สถานที่",
      name: "location",
      type: "text",
      required: t("required"),
      placeholder: "อาคาร A"
    },
    {
      label: "เวลาการฝึก",
      name: "time",
      type: "text",
      inputMode: "tel",
      required: t("required"),
      placeholder: "นาที"
    }
  ]

  const onSubmit = async (data) => {
    const args = {
      ...data
    }
    const res = await coachCreateTrainingList(args)

    if (res.status === 200) {
      //
      fetchTrainingList()
    }
    setOpen(false)
  }

  const onNext = async () => {
    const args = {
      trainingListIDs: selectedList,
      training_date: dayjs(selectedDate).format("YYYY-MM-DD 00:00:00"),
      start_time: dayjs(timeStart).format("HH:mm"),
      end_time: dayjs(timeEnd).format("HH:mm")
    }

    navigation.push("AssignmentTraningAssign", { ...args })
  }
  // const sub
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
        title="มอบหมายการฝึกซ้อม"
      />
      <SearchComponent
        style={{ marginHorizontal: 24 }}
        onChangeText={(v) => {
          setText(v)
          handleKeywordChange(v)
        }}
        value={text}
        onPress={() => {
          setText("")
          handleKeywordChange("")
          fetchTrainingList()
        }}
      />
      <CalendarComponent
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        setCalendarMode={setCalendarMode}
        setIsFilterDate={setIsFilterDate}
        calendarMode={calendarMode}
        style={{
          marginTop: 15
        }}
      />
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 24,
          marginTop: 24,
          columnGap: 14
        }}
      >
        <DatePicker
          mode="time"
          date={dayjs(timeStart).toDate()}
          textColor={Colors.spotlightDay}
          onDateChange={(date) => {
            setTimeStart(date)
          }}
          style={{
            height: 90,
            width: 150
          }}
        />
        <Text style={{ ...Font.context, color: Colors.detailTextDay }}>
          ถึง
        </Text>
        <DatePicker
          mode="time"
          date={dayjs(timeEnd).toDate()}
          textColor={Colors.spotlightDay}
          onDateChange={(date) => {
            setTimeEnd(date)
          }}
          style={{
            height: 90,
            width: 150
          }}
        />
      </View>
      <View
        style={{
          height: calendarMode === "week" ? "50%" : "30%",
          marginHorizontal: 24,
          marginTop: 24
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ ...Font.title, color: Colors.titleday }}>
            รายการฝึกซ้อม
          </Text>
          <TouchableOpacity onPress={() => openModal()}>
            <AddIcon />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginTop: 12, marginBottom: 24 }}>
          {trainingList &&
            trainingList.length > 0 &&
            trainingList.map((_data) => (
              <TouchableOpacity
                key={_data.id}
                onPress={() => handleCheckboxChange(_data)}
                style={{
                  ...touchStyle
                }}
              >
                <CheckBox
                  boxType="square"
                  onCheckColor="#FCFCFC"
                  onFillColor="#8AE0CB"
                  onTintColor="#8AE0CB"
                  on
                  value={selectedList.includes(_data.id)}
                  onValueChange={() => handleCheckboxChange(_data)}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 7,
                      alignItems: "center",
                      marginBottom: 7
                    }}
                  >
                    <Text
                      style={{ ...Font.contextBold, color: Colors.titleday }}
                    >
                      {_data.name}
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
                      {_data.time} นาที
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
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      {selectedList.length > 0 && (
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
            onPress={() => onNext()}
            label={t("next")}
          />
        </View>
      )}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        safeAreaTop={true}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <Text style={{ ...Font.context, color: Colors.textday }}>
                เพิ่มรายการฝึกซ้อม
              </Text>
              <View style={{ flex: 1, width: "100%", marginTop: 25 }}>
                {trainingType &&
                  trainingType.length > 0 &&
                  INPUT.map((i) => {
                    if (i.type === "select") {
                      return (
                        <Fragment key={i.name}>
                          <Text
                            style={{
                              ...Styled.context,
                              color: Colors.textday,
                              marginBottom: 3
                            }}
                          >
                            {i.label}{" "}
                          </Text>
                          <Controller
                            control={control}
                            name={i.name}
                            render={({ field: { onChange, onBlur } }) => {
                              return (
                                <View style={{ marginBottom: 10 }}>
                                  <Select
                                    placeholder={i.placeholder}
                                    style={{
                                      fontFamily: "NotoSansThai-Regular",
                                      fontSize: 16,
                                      lineHeight: 24
                                    }}
                                    onValueChange={onChange}
                                    variant="underlined"
                                  >
                                    {i.options.map((_data) => (
                                      <Select.Item
                                        style={{
                                          fontFamily: "NotoSansThai-Regular",
                                          fontSize: 16,
                                          lineHeight: 24
                                        }}
                                        key={_data.id}
                                        label={_data.title}
                                        value={_data.id}
                                      />
                                    ))}
                                  </Select>
                                </View>
                              )
                            }}
                          />
                        </Fragment>
                      )
                    }
                    return (
                      <Fragment key={i.name}>
                        <InputForm
                          rules={{
                            required: i.required ?? t("required"),
                            pattern: i?.pattern && {
                              value: i?.pattern,
                              message: t("invalid")
                            }
                          }}
                          validate={(val) => {
                            if (i.match) {
                              // perform validation
                              if (watch(i?.match.value) !== val) {
                                return i?.match.message
                              }
                            }
                          }}
                          type={i.type}
                          label={i.label}
                          Form={Form}
                          inputMode={i.inputMode ?? "text"}
                          name={i.name}
                          error={i.error ?? t("required")}
                          // onSubmitEditing={handleSubmit(onSubmit)}
                          secureTextEntry={i?.secureTextEntry}
                          placeholder={i.placeholder}
                        />
                      </Fragment>
                    )
                  })}
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    marginVertical: 10
                  }}
                >
                  <Button
                    onPress={() => {
                      Form.handleSubmit(onSubmit)()
                    }}
                    label={t("confirm")}
                  />
                </View>
              </View>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  )
}

export default AssignmentList
