import React, { Fragment, useContext, useEffect, useRef, useState } from "react"
import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import Button from "../components/Button"
import { DateForm, InputForm, OptionsForm } from "../components/Form"
import { useForm } from "react-hook-form"
import _ from "lodash"
import { AppContext } from "../Context"
import Header from "../components/Header"
import dayjs from "dayjs"
import PopupSheetSuccess from "../components/PopupSheetSuccess"

export default function RequestScreen({ navigation, route }) {
  const {
    user,
    postReqRole,
    org,
    onSetUserId,
    selectDataAll: selectData
  } = useContext(AppContext)
  const [errorSubTitle, setErrorSubTitle] = useState("")
  const actionErrorRef = useRef(null)

  useEffect(() => {
    if (user) {
      onSetUserId(user.userTypeCode)
    }
  }, [onSetUserId, user])

  const atheleInput = [
    {
      label: t("height", { defaultValue: "ส่วนสูง" }),
      name: "height",
      type: "number",
      inputMode: "tel",
      required: t("required"),
      placeholder: "ซม."
    },
    {
      label: t("weight", { defaultValue: "น้ำหนัก" }),
      name: "weight",
      type: "number",
      inputMode: "tel",
      required: t("required"),
      placeholder: "กก."
    },
    {
      label: t("sports_group", { defaultValue: "กลุ่มนักกีฬา" }),
      name: "athlete_group",
      type: "select",
      options: selectData?.athlete_group.map((i) => {
        return {
          id: i.value,
          title: i.label
        }
      }),
      required: t("required"),
      placeholder: "กรุณาเลือกกลุ่มนักกีฬา"
    },
    {
      label: t("position", { defaultValue: "ตำแหน่ง" }),
      name: "athlete_position",
      type: "text",
      inputMode: "text",
      required: t("required"),
      placeholder: "ครูชำนาญการพิเศษ"
    }
  ]

  const INPUT = [
    {
      label: t("firstname_thai", { defaultValue: "ชื่อ (ภาษาไทย)" }),
      name: "first_name",
      type: "text",
      pattern: /^[ก-๏\s]+$/,
      required: t("required"),
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
      label: t("nationality"),
      name: "nationality",
      type: "select",
      options: selectData?.nationality.map((i) => {
        return {
          id: i.value,
          title: i.label
        }
      }),
      required: t("required"),
      placeholder: "กรุณาเลือกสัญชาติ"
    },
    {
      label: t("origin"),
      name: "race",
      type: "select",
      options: selectData?.race.map((i) => {
        return {
          id: i.value,
          title: i.label
        }
      }),
      required: t("required"),
      placeholder: "กรุณาเลือกเชื้อชาติ"
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
      label: t("sex"),
      name: "gender",
      type: "select",
      options: selectData?.gender.map((i) => {
        return {
          id: i.value,
          title: i.label
        }
      }),
      required: t("required"),
      placeholder: "กรุณาเลือกเพศ"
    },
    {
      label: t("statusRelationship", { defaultValue: "สถานะ" }),
      name: "status",
      type: "select",
      options: selectData?.status.map((i) => {
        return {
          id: i.value,
          title: i.label
        }
      }),
      required: t("required"),
      placeholder: "กรุณาเลือกสถานภาพ"
    },
    {
      label: t("id_card", { defaultValue: "เลขบัตรประชาชน" }),
      name: "CitizenID",
      type: "text",
      inputMode: "text",
      required: t("required"),
      pattern: /^\d{13}$/,
      placeholder: "1 1234 12312 12 1"
    },
    {
      label: t("address"),
      name: "address",
      type: "textarea",
      inputMode: "text",
      required: t("required"),
      placeholder: "ที่อยู่อาศัย"
    },
    {
      label: t("phone"),
      name: "phone",
      type: "text",
      inputMode: "tel",
      required: t("required"),
      placeholder: "090 0000000",
      pattern: /^\d{10}$/,
      value: user?.phone
    },
    {
      label: t("sports", { defaultValue: "ชนิดกีฬา" }),
      name: "sporttype",
      type: "select",
      options: selectData?.sporttype.map((i) => {
        return {
          id: i.value,
          title: i.label
        }
      }),
      required: t("required"),
      placeholder: "กรุณาเลือกประเภทกีฬา"
    },
    {
      label: t("club", { defaultValue: "สังกัด" }),
      name: "organization",
      type: "select",
      options: org,
      required: t("required"),
      value: user?.organizationCode,
      placeholder: "กรุณาเลือกสังกัด"
    }
  ]

  const Form = useForm({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      birth_date: dayjs(user?.birth_date).format("YYYY-M-D"),
      phone: user?.phone,
      organization: user?.organizationCode
    }
  })

  const { watch, setValue, handleSubmit } = Form

  useEffect(() => {
    setValue("first_name", user?.first_name)
    setValue("last_name", user?.last_name)
    setValue(
      "birth_date",
      user?.birth_date ? dayjs(user?.birth_date).toDate() : dayjs().toDate()
    )
    setValue("phone", user?.phone)
    setValue("organization", user?.organization)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (data) => {
    const args = {
      ...data,
      birth_date: dayjs(data.birth_date).format("YYYY-M-D")
    }

    console.log(args)

    await postReqRole(route.params.type, args, setErrorSubTitle).then(() => {
      navigation.replace("PendingScreen")
    })
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff"
      }}
    >
      <PopupSheetSuccess
        actionSheetRef={actionErrorRef}
        title={t("error")}
        subTitle={errorSubTitle}
        isClose
      />
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Header
            arrow
            navigation={navigation}
            title="ยื่นเรื่อง"
          />
        </View>
        <View style={{ paddingHorizontal: 24 }}>
          <Text
            style={{
              ...Styled.head,
              fontWeight: "600",
              color: Colors.spotlightDay
            }}
          >
            {route.params.title}
          </Text>
          <Text
            style={{
              ...Styled.context,
              color: Colors.detailTextDay
            }}
          >
            {t("required")}
          </Text>
          <View style={{ height: "80%" }}>
            {selectData && org && org.length > 0 && user ? (
              <ScrollView
                contentContainerStyle={{
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <View
                  style={{
                    marginTop: 30,
                    width: "100%"
                  }}
                >
                  {[
                    ...INPUT,
                    ...(route.params.type !== 2 ? atheleInput : [])
                  ].map((i) => {
                    if (i.type === "select") {
                      return (
                        <Fragment key={i.name}>
                          <OptionsForm
                            rules={{
                              required: t("required")
                            }}
                            options={i.options ? i.options : null}
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
                          style={{ textAlignVertical: "top" }}
                          value={i.value}
                          placeholder={i.placeholder}
                        />
                      </Fragment>
                    )
                  })}
                </View>
              </ScrollView>
            ) : null}
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              marginVertical: 10,
              flex: 1
            }}
          >
            <Button
              onPress={handleSubmit(onSubmit)}
              label={t("next")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
