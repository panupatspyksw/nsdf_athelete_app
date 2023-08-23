import React, { useContext, useEffect, useState } from "react"
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
import { Colors, Font } from "../Styled"
import AddIcon from "../assets/addIcon.svg"
import { AppContext } from "../Context"
import Male from "../assets/male.svg"
import { api, getAthletes } from "../api"
import FastImage from "react-native-fast-image"
import GreenReg from "../assets/greenReg.svg"
import GrayReg from "../assets/grayReg.svg"
import Button from "../components/Button"
import { getThatCoachAthlete } from "../apiNew"
import { t } from "i18n-js"

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

const Assignment = ({ navigation }) => {
  const { user } = useContext(AppContext)
  const [text, setText] = useState("")
  const [keyword, setKeyword] = useState("")
  const [members, setMembers] = useState([])

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
        onPress={() => navigation.replace("HomeTab")}
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
          fetchGetThatCoach()
        }}
      />
      <View
        style={{
          marginHorizontal: 24,
          marginTop: 24
        }}
      >
        <View
          style={{
            marginVertical: 12,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            width: "100%"
          }}
        >
          <Button
            onPress={() => navigation.push("AssignmentList")}
            label="มอบหมายการฝึกซ้อม"
          />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{ ...Font.title, color: Colors.titleday, marginTop: 12 }}
          >
            นักกีฬาในสังกัด
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("AddAthlete")}>
            <AddIcon />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginTop: 12 }}>
          {members &&
            members.length > 0 &&
            members.map((_data) => (
              <View
                style={{
                  ...touchStyle
                }}
                key={_data.first_name}
              >
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
              </View>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Assignment
