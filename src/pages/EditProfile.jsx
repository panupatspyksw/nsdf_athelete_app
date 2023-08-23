import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform
} from "react-native"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import React, { Fragment, useContext, useEffect, useRef, useState } from "react"
import _ from "lodash"
import { useForm } from "react-hook-form"
import Male from "../assets/male.svg"
import Female from "../assets/female.svg"
import FastImage from "react-native-fast-image"
import { DateForm, InputForm, OptionsForm } from "../components/Form"
import Header from "../components/Header"
import dayjs from "dayjs"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { Image } from "native-base"
import { AppContext } from "../Context"
import PopupSheetSuccess from "../components/PopupSheetSuccess"

export default function EditProfile({ navigation }) {
  const { org, onSetUserId, pos, userType, selectData } = useContext(AppContext)
  const [menu, setMenu] = useState()
  const [photo, setPhoto] = useState()
  const [msg, setMsg] = useState()
  const actionSheetRef = useRef(null)
  const [isError, setIsError] = useState()

  const { user, editProfile } = useContext(AppContext)
  console.log(org)
  const Form = useForm({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      birth_date: user?.birth_date
        ? dayjs(user?.birth_date).format("YYYY-M-D")
        : dayjs().format("YYYY-M-D"),
      phone: user?.phone,
      user_type: user?.userTypeCode,
      organization: user?.organizationCode,
      position: user?.positionCode,
      ...(user?.roleCode === 2 && {
        status: user?.statusCode,
        address: user?.address,
        height: user?.height,
        weight: user?.weight
      }),
      ...(user?.roleCode === 3 && {
        status: user?.status,
        address: user?.address
      })
    }
  })

  const { watch, handleSubmit, setValue } = Form

  useEffect(() => {
    onSetUserId(watch("user_type", user?.userTypeCode))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("user_type")])

  const GENERAL_INPUT = [
    {
      label: t("firstname_thai", { defaultValue: "ชื่อ (ภาษาไทย)" }),
      name: "first_name",
      type: "text",
      pattern: /^[ก-๏\s]+$/,
      value: user?.first_name
    },
    {
      label: t("lastname_thai", { defaultValue: "นามสกุล (ภาษาไทย)" }),
      name: "last_name",
      type: "text",
      pattern: /^[ก-๏\s]+$/,
      value: user?.last_name
    },
    {
      label: t("birthday", { defaultValue: "วันเดือนปีเกิด" }),
      name: "birth_date",
      type: "date",
      value: user?.birth_date
        ? dayjs(user?.birth_date).toDate()
        : dayjs().toDate()
    },
    {
      label: t("phone"),
      name: "phone",
      type: "text",
      inputMode: "numeric",
      required: t("required"),
      value: user?.phone
    },
    {
      label: "ประเภทบุคคล",
      name: "user_type",
      type: "select",
      options: userType,
      required: t("required"),
      value: user?.userTypeCode,
      placeholder: "กรุณาเลือกประเภทบุคคล"
    },
    {
      label: "ตำแหน่ง",
      name: "position",
      type: "select",
      options: pos,
      required: t("required"),
      value: user?.positionCode,
      placeholder: "กรุณาเลือกตำแหน่ง"
    },
    {
      label: "สังกัด / หน่วยงาน",
      name: "organization",
      type: "select",
      options: org,
      required: t("required"),
      value: user?.organizationCode,
      placeholder: "กรุณาเลือกสังกัด / หน่วยงาน"
    }
  ]

  const COACH_INPUT = [
    {
      label: t("statusRelationship", { defaultValue: "สถานะ" }),
      name: "status",
      type: "select",
      options: selectData,
      required: t("required"),
      value: user?.statusCode,
      placeholder: "กรุณาเลือกสภานภาพ"
    },
    {
      label: t("address"),
      name: "address",
      type: "textarea",
      inputMode: "text",
      required: t("required"),
      value: user?.address
    }
  ]

  const ATHLETE_INPUT = [
    {
      label: t("height", { defaultValue: "ส่วนสูง" }),
      name: "height",
      type: "number",
      inputMode: "tel",
      required: t("required"),
      placeholder: "ซม.",
      value: String(user?.height)
    },
    {
      label: t("weight", { defaultValue: "น้ำหนัก" }),
      name: "weight",
      type: "number",
      inputMode: "tel",
      required: t("required"),
      placeholder: "กก.",
      value: String(user?.weight)
    }
  ]

  useEffect(() => {
    if (user) {
      setPhoto(user.image)
    }
  }, [user])

  useEffect(() => {
    if (selectData) {
      switch (user?.roleCode) {
        case 1:
          setMenu(GENERAL_INPUT)
          break
        case 2:
          setMenu([...GENERAL_INPUT, ...COACH_INPUT, ...ATHLETE_INPUT])
          break
        case 3:
          setMenu([...GENERAL_INPUT, ...COACH_INPUT])
          break
        default:
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectData])

  useEffect(() => {
    setValue("first_name", user?.first_name)
    setValue("last_name", user?.last_name)
    setValue(
      "birth_date",
      user?.birth_date
        ? dayjs(user?.birth_date).format("YYYY-M-D")
        : dayjs().format("YYYY-M-D")
    )
    setValue("phone", user?.phone)
    setValue("user_type", user?.userTypeCode)
    setValue("organization", user?.organizationCode)
    setValue("position", user?.positionCode)
    if (user?.roleCode === 2) {
      setValue("status", user?.statusCode)
      setValue("address", user?.address)
      setValue("height", user?.height)
      setValue("weight", user?.weight)
    }
    if (user?.roleCode === 3) {
      setValue("status", user?.statusCode)
      setValue("address", user?.address)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const createFormData = (_photo, _body = {}) => {
    const data = new FormData()

    if (_photo && _photo.assets) {
      data.append("imageCollection", {
        name: _photo.assets[0].fileName,
        type: _photo.assets[0].type,
        uri:
          Platform.OS === "ios"
            ? _photo.assets[0].uri.replace("file://", "")
            : _photo.assets[0].uri
      })
    }

    if (_body) {
      Object.keys(_body).forEach((key) => {
        data.append(key, _body[key])
      })
    }

    return data
  }

  const onSubmit = async (input) => {
    const args = {
      ...input,
      birth_date: dayjs(input.birth_date).format("YYYY-M-D")
    }

    console.log(args)

    await editProfile(
      photo,
      createFormData,
      args,
      setIsError,
      actionSheetRef,
      setMsg
    )
  }

  const handleChoosePhoto = () => {
    Alert.alert(
      "Choose Image",
      "Do you want to take a new photo or choose an existing one?",
      [
        {
          text: "Camera",
          onPress: () =>
            launchCamera(
              {
                cameraType: "front",
                noData: true
              },
              (response) => {
                if (response) {
                  setPhoto(response)
                }
              }
            )
        },
        {
          text: "Gallery",
          onPress: () =>
            launchImageLibrary(
              {
                includeBase64: true,
                selectionLimit: 1,
                mediaType: "photo",
                noData: true
              },
              (response) => {
                if (response) {
                  setPhoto(response)
                }
              }
            )
        }
      ]
    )
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1
      }}
    >
      <PopupSheetSuccess
        actionSheetRef={actionSheetRef}
        title={isError ? t("error") : t("success")}
        subTitle={msg}
        onClose={() => (isError ? null : navigation.goBack())}
      />
      <Header
        arrow
        navigation={navigation}
        title={t("profile")}
        rightSection={
          <View
            style={{
              flex: 1,
              alignItems: "flex-end"
            }}
          >
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <View>
                <Text
                  style={{
                    ...Styled.title,
                    color: Colors.spotlightDay
                  }}
                >
                  {t("save")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      />
      {selectData && menu ? (
        <ScrollView>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 24,
              alignItems: "center"
            }}
          >
            <View>
              {user ? (
                <Image
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  source={{
                    uri:
                      photo && photo.assets ? photo.assets[0].uri : user.image
                  }}
                  alt="profile"
                  resizeMode={FastImage.resizeMode.cover}
                />
              ) : user && user.gender === "ชาย" ? (
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
            <TouchableOpacity
              onPress={async () => {
                handleChoosePhoto()
              }}
            >
              <Text
                style={{
                  marginTop: 12,
                  ...Styled.title,
                  color: Colors.spotlightDay
                }}
              >
                {t("edit_picture")}
              </Text>
            </TouchableOpacity>

            {/* <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 24,
                shadowColor: "#3155F8",
                shadowOffset: {
                  width: 2,
                  height: 4
                },
                shadowOpacity: 0.05,
                shadowRadius: 12,
                elevation: 2,
                height: 40,
                width: "100%",
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                padding: 5
              }}
            >
              <>
                <TouchableOpacity
                  onPress={() => {
                    setMode(0)
                  }}
                  style={{
                    flex: 1
                  }}
                >
                  <LinearGradient
                    style={{
                      height: "100%",

                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 24
                    }}
                    colors={
                      mode === 1
                        ? ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
                        : ["#5081FF", "#5A88FE", "#6EA6FA"]
                    }
                  >
                    <Text
                      style={{
                        ...Styled.context,
                        color: mode === 1 ? Colors.gray3 : "#F2F5FF"
                      }}
                    >
                      {t("generalInfo")}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setMode(1)
                  }}
                  style={{
                    flex: 1
                  }}
                >
                  <LinearGradient
                    style={{
                      height: "100%",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 24
                    }}
                    colors={
                      mode === 0
                        ? ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
                        : ["#5081FF", "#5A88FE", "#6EA6FA"]
                    }
                  >
                    <Text
                      style={{
                        ...Styled.context,
                        color: mode === 0 ? Colors.gray3 : "#F2F5FF"
                      }}
                    >
                      {t("contactInfo")}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            </View> */}

            <>
              <View
                style={{
                  marginBottom: 23.5,
                  marginTop: 30,
                  width: "100%"
                }}
              >
                {userType.length > 0 &&
                  org.length > 0 &&
                  pos.length > 0 &&
                  menu.map((i) => {
                    if (i.type === "select") {
                      return (
                        <Fragment key={i.name}>
                          <OptionsForm
                            rules={{
                              required: t("required")
                            }}
                            options={i.options}
                            label={i.label}
                            Form={Form}
                            inputMode={i.inputMode ?? "text"}
                            name={i.name}
                            error={i.error ?? t("required")}
                            value={i.value}
                            placeholder={i.placeholder}
                          />
                        </Fragment>
                      )
                    }
                    if (i.type === "date") {
                      return (
                        <Fragment key={i.name}>
                          <DateForm
                            type={i.type}
                            label={i.label}
                            Form={Form}
                            name={i.name}
                            error={i.error ?? t("required")}
                            value={i.value}
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
                          value={i.value}
                        />
                      </Fragment>
                    )
                  })}
              </View>
            </>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  )
}
