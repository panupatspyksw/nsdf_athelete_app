import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"
import Button from "../components/Button"
import { Colors, Font, Styled } from "../Styled"
import { t } from "i18n-js"
import React, { useContext, useEffect, useRef, useState } from "react"
import _ from "lodash"
import Male from "../assets/male.svg"
import { AppContext } from "../Context"
import { api } from "../api"
import dayjs from "dayjs"
import SearchIcon from "../assets/SearchIcon.svg"
import Close from "../assets/close.svg"
import Header from "../components/Header"
import PopupActionSheet from "../components/PopupActionSheet"
import PopupSheetSuccess from "../components/PopupSheetSuccess"
import SearchComponent from "../components/SearchComponent"
import { getAllAthete, sendCoachRequest } from "../apiNew"
import FastImage from "react-native-fast-image"

const isToday = require("dayjs/plugin/isToday")

dayjs.extend(isToday)

export default function AddAthlete({ navigation }) {
  const [keyword, setKeyword] = useState("")
  const [members, setMembers] = useState()
  const [text, setText] = useState("")
  const [selected, setSelected] = useState([])
  const actionSheetRef = useRef(null)
  const actionRef = useRef(null)

  const fetchAllAthlete = () => {
    getAllAthete({ limit: 1000 })
      .then((_res) => {
        setMembers(_res.body.lists)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    if (!members) {
      fetchAllAthlete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members])

  const handleKeywordChange = (value) => {
    setKeyword(value)
  }

  // debouce
  useEffect(() => {
    if (keyword) {
      const getData = setTimeout(async () => {
        await getAllAthete({
          search: keyword
        }).then((res) => {
          setMembers(res.body.lists)
        })
      }, 200)

      return () => clearTimeout(getData)
    }
  }, [keyword])

  const submit = async () => {
    await sendCoachRequest({
      athleteIDs: selected
    })
      .then((res) => {
        if (res.status === 200) {
          actionSheetRef.current?.hide()
          actionRef.current?.show()
        }
      })
      .catch((err) => console.error(err))
  }

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
        title={t("add_athlete")}
      />
      <View
        style={{
          paddingHorizontal: 24,
          marginBottom: 18
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
            fetchAllAthlete()
          }}
        />
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 24
        }}
      >
        <Text
          style={{
            ...Font.small,
            color: Colors.gray3,
            marginBottom: 12
          }}
        >
          เลือกนักกีฬาที่ต้องการผูกเข้าสังกัด
        </Text>
        {members &&
          members.length > 0 &&
          members.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  //unique
                  if (selected.includes(item.athleteID)) {
                    setSelected(selected.filter((v) => v !== item.athleteID))
                  } else {
                    setSelected(_.uniq([...selected, item.athleteID]))
                  }
                }}
                key={item.athleteID}
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
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      width: 14,
                      height: 14,
                      marginRight: 17,
                      backgroundColor: selected.includes(item.athleteID)
                        ? "#8AE0CB"
                        : "#FFFFFF",
                      borderWidth: 0.5,
                      borderColor: "#D9D9D9",
                      shadowColor: "#000000",
                      shadowOffset: {
                        width: 4,
                        height: 4
                      },
                      shadowOpacity: 0.05,
                      shadowRadius: 25,
                      borderRadius: 4
                    }}
                  />
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
                      marginLeft: 12,
                      width: "100%",
                      flexDirection: "column"
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
                    <Text
                      style={{
                        ...Styled.small,
                        color: Colors.detailTextDay,
                        flex: 1,
                        flexWrap: "wrap"
                      }}
                    >
                      {item.organization}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
      </ScrollView>
      {selected && selected.length > 0 && (
        <View
          style={{
            alignItems: "center",
            position: "absolute",
            bottom: 24,
            width: "100%"
          }}
        >
          <Button
            label={t("confirm")}
            onPress={() => {
              actionSheetRef.current?.show()
            }}
          />
        </View>
      )}

      <PopupActionSheet
        actionSheetRef={actionSheetRef}
        submit={submit}
        title={"ยืนยันการผูกนักกีฬา?"}
        subTitle={"หากคุณยกเลิก นักกีฬาจะไม่ถูกผูกเข้าสังกัด"}
      />
      <PopupSheetSuccess
        actionSheetRef={actionRef}
        title="การผูกนักกีฬาสำเร็จ!"
        subTitle="รายชื่อนักกีฬาใหม่จะผูกเข้าสังกัด
        หลังจากเจ้าหน้าที่ได้ทำการอนุมัติ
        กรุณารอติดตามผลการออนุมัติ 1-2 วันทำการ"
        onClose={() => navigation.goBack()}
      />
    </SafeAreaView>
  )
}
