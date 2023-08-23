import React, { useContext, useEffect, useRef, useState } from "react"
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import Header from "../components/Header"
import SearchComponent from "../components/SearchComponent"
import { Colors, Font } from "../Styled"
import { getAthletes } from "../api"
import Male from "../assets/male.svg"
import { AppContext } from "../Context"
import { ScrollView } from "react-native"
import CheckBox from "@react-native-community/checkbox"
import Button from "../components/Button"
import { t } from "i18n-js"
import PopupSheetSuccess from "../components/PopupSheetSuccess"
import { coachAssignment, getThatCoachAthlete } from "../apiNew"
import FastImage from "react-native-fast-image"

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
  height: 80,
  paddingVertical: 12,
  paddingHorizontal: 24,
  marginBottom: 12,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between"
}

const AssignmentTraningAssign = ({ navigation, route }) => {
  const { user } = useContext(AppContext)

  const [members, setMembers] = useState([])
  const [selectedList, setSelectedList] = useState([])
  const actionSheetRef = useRef(null)
  const [msg, setMsg] = useState()
  const [isError, setIsError] = useState()

  const [text, setText] = useState("")
  const [keyword, setKeyword] = useState("")

  const prevParams = route.params

  const fetchGetThatCoach = () => {
    getThatCoachAthlete().then((res) => {
      setMembers(res.body.lists)
    })
  }

  useEffect(() => {
    if (user && keyword === "") {
      fetchGetThatCoach()
    }
  }, [keyword, user])

  const handleKeywordChange = (value) => {
    setKeyword(value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword) {
        getThatCoachAthlete().then((res) => {
          const filteredMembers =
            keyword === ""
              ? res.body.lists
              : res.body.lists.filter(
                  (member) =>
                    member.first_name.includes(keyword) ||
                    member.sporttype.includes(keyword)
                )
          setMembers(filteredMembers)
        })
      }
    }, 200)

    return () => clearTimeout(timer)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  const handleCheckboxChange = (item) => {
    if (selectedList.includes(item.athleteID)) {
      setSelectedList(selectedList.filter((id) => id !== item.athleteID))
    } else {
      setSelectedList([...selectedList, item.athleteID])
    }
  }

  const onSubmit = async () => {
    if (prevParams) {
      const args = {
        ...prevParams,
        athleteIDs: selectedList
      }
      await coachAssignment(args)
        .then((_res) => {
          if (_res.status === 200) {
            setIsError(false)
            setMsg(_res.message)
            actionSheetRef.current?.show()
          } else {
            setIsError(true)
          }
        })
        .catch((err) => {
          setIsError(true)
          setMsg(err.message)
        })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        arrow
        navigation={navigation}
        title="มอบหมายการฝึกซ้อม"
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          marginBottom: 24,
          width: "100%"
        }}
      >
        <SearchComponent
          onChangeText={(v) => {
            setText(v)
            handleKeywordChange(v)
          }}
          value={text}
          onPress={() => {
            setText("")
            handleKeywordChange("")
            fetchGetThatCoach()
          }}
        />
        <View style={{ marginTop: 13 }}>
          <Text style={{ ...Font.head, color: Colors.spotlightDay }}>
            Training Assign
          </Text>
          <Text style={{ ...Font.context, color: Colors.detailTextDay }}>
            เลือกนักกีฬาที่จะมอบหมายการฝึกซ้อม
          </Text>
        </View>
        <ScrollView style={{ marginTop: 12, marginBottom: 10 }}>
          {members &&
            members.length > 0 &&
            members.map((_data) => (
              <TouchableOpacity
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
                  value={selectedList.includes(_data.athleteID)}
                  onValueChange={() => handleCheckboxChange(_data)}
                  style={{ marginRight: 17 }}
                />
                <FastImage
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                  source={{
                    uri: _data.image,
                    priority: FastImage.priority.normal
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ ...Font.contextBold, color: Colors.titleday }}>
                    {_data.first_name} {_data.last_name}
                  </Text>
                  <Text>
                    {t("athele")}
                    {_data.sporttype}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
        {selectedList.length > 0 && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              width: "100%"
            }}
          >
            <Button
              onPress={() => onSubmit()}
              label={t("next")}
            />
          </View>
        )}
      </View>
      <PopupSheetSuccess
        actionSheetRef={actionSheetRef}
        title={isError ? t("error") : "การมอบหมายสำเร็จ!"}
        subTitle="นักกีฬาได้รับมอบหมายการฝึกซ้อมแล้วคุณสามารถดูสถิติหลังการฝึกซ้อมเสร็จสิ้นได้"
        onClose={() => (isError ? null : navigation.push("Assignment"))}
      />
    </SafeAreaView>
  )
}

export default AssignmentTraningAssign
