import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import React, { useContext } from "react"
import Male from "../assets/male.svg"
import Female from "../assets/female.svg"
import DataIcon from "../assets/data.svg"
import { AppContext } from "../Context"
import dayjs from "dayjs"
import FastImage from "react-native-fast-image"
import Header from "../components/Header"

const Info = ({ label, text }) => {
  return (
    <View
      style={{
        marginTop: 4,
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Text
        style={{
          width: 100,
          ...Styled.small,
          color: Colors.gray3
        }}
      >
        {label}:
      </Text>
      <Text
        style={{
          ...Styled.small,
          color: Colors.textday,
          flex: 1
        }}
      >
        {text}
      </Text>
    </View>
  )
}

export default function UserProfile({ navigation }) {
  const { user } = useContext(AppContext)
  console.log(user)

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
        title={t("profile")}
      />
      {user ? (
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingHorizontal: 24
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%"
              }}
            >
              <View
                style={{
                  marginRight: 13
                }}
              >
                {user.image ? (
                  <FastImage
                    style={{ width: 48, height: 48, borderRadius: 24 }}
                    source={{
                      uri: user.image,
                      priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : user.sex === "M" ? (
                  <Male
                    height={48}
                    width={48}
                  />
                ) : (
                  <Female
                    height={48}
                    width={48}
                  />
                )}
              </View>

              <View>
                <Text
                  style={{
                    ...Styled.contextBold,
                    color: Colors.textday
                  }}
                >
                  {user
                    ? t("welcome_username", {
                        username: user.first_name
                      })
                    : t("login")}
                </Text>
                {user ? (
                  <Text
                    style={{
                      ...Styled.small,
                      color: Colors.detailTextDay
                    }}
                  >
                    {user.userTypeName}
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("editProfile")
                  }}
                >
                  <View>
                    <Text
                      style={{
                        ...Styled.title,
                        color: Colors.spotlightDay
                      }}
                    >
                      {t("edit")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              paddingVertical: 24,
              paddingHorizontal: 24
            }}
          >
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    marginHorizontal: 12
                  }}
                >
                  <DataIcon />
                </View>
                <Text
                  style={{
                    ...Styled.title,
                    color: Colors.titleday,
                    fontWeight: "600"
                  }}
                >
                  {t("generalInfo")}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 18,
                  marginTop: 24,
                  minHeight: 134,
                  backgroundColor: "#FCFCFC",
                  borderColor: "#D9E0FF",
                  borderWidth: 0.5,
                  borderRadius: 10,
                  shadowColor: "#4786FF",
                  shadowOffset: {
                    width: 4,
                    height: 4
                  },
                  shadowOpacity: 0.05,
                  shadowRadius: 25,
                  elevation: 2
                }}
              >
                {user.first_name && user.last_name && (
                  <Info
                    label={`${t("firstname")} ${t("lastname")}`}
                    text={`${user.first_name} ${user.last_name}`}
                  />
                )}
                {user.nationality && (
                  <Info
                    label={t("nationality")}
                    text={user.nationality}
                  />
                )}
                {user.birth_date && (
                  <Info
                    label={t("birthday")}
                    text={dayjs(user.birth_date).format("D MMMM YYYY")}
                  />
                )}
                {user.birth_date && (
                  <Info
                    label={t("age")}
                    text={`${dayjs().diff(user.birth_date, "year")} ปี`}
                  />
                )}
                {user.gender && (
                  <Info
                    label={t("sex")}
                    text={user.gender}
                  />
                )}
                {user.status && (
                  <Info
                    label={t("statusRelationship")}
                    text={user.status}
                  />
                )}
                {user.height && user.weight && (
                  <Info
                    label={`${t("height")}/${t("weight")}`}
                    text={`${user.height} / ${user.weight}`}
                  />
                )}
                {user.sport_type && (
                  <Info
                    label={t("sportType")}
                    text={user.sport_type}
                  />
                )}
                {user.athlete_group && (
                  <Info
                    label="กลุ่มนักกีฬา"
                    text={user.athlete_group}
                  />
                )}
                {user.athlete_position && (
                  <Info
                    label="ตำแหน่ง/ระดับ"
                    text={user.athlete_position}
                  />
                )}
                {user.created_at && (
                  <Info
                    label="วันที่ขึ้นเบียน"
                    text={dayjs(user.created_at).format("D MMMM YYYY")}
                  />
                )}
                {user.userTypeName && (
                  <Info
                    label="ประเภทบุคคล"
                    text={user.userTypeName}
                  />
                )}
                {user.positionName && (
                  <Info
                    label="ตำแหน่ง"
                    text={user.positionName}
                  />
                )}
                {user.organizationName && (
                  <Info
                    label="สังกัด"
                    text={user.organizationName}
                  />
                )}
              </View>
            </View>
            <View style={{ marginTop: 21 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    marginHorizontal: 12
                  }}
                >
                  <DataIcon />
                </View>
                <Text
                  style={{
                    ...Styled.title,
                    color: Colors.titleday,
                    fontWeight: "600"
                  }}
                >
                  {t("contactInfo")}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 18,
                  marginTop: 24,
                  backgroundColor: "#FCFCFC",
                  borderColor: "#D9E0FF",
                  borderWidth: 0.5,
                  borderRadius: 10,
                  shadowColor: "#4786FF",
                  shadowOffset: {
                    width: 4,
                    height: 4
                  },
                  shadowOpacity: 0.05,
                  shadowRadius: 25,
                  elevation: 2
                }}
              >
                {user.address && (
                  <Info
                    label={t("address")}
                    text={user.address}
                  />
                )}
                {user.email && (
                  <Info
                    label={t("email")}
                    text={user.email}
                  />
                )}
                {user.phone && (
                  <Info
                    label={t("phone")}
                    text={user.phone}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  )
}
