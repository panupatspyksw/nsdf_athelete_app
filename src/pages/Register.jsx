import React, { Fragment, useContext } from "react"
import { Platform, SafeAreaView, ScrollView, Text, View } from "react-native"
import { Colors, Font, Styled } from "../Styled"
import { t } from "i18n-js"
import Button, { BackButton } from "../components/Button"
import LoginIcon from "../assets/userIcon.svg"
import { DateForm, InputForm, OptionsForm } from "../components/Form"
import { useForm } from "react-hook-form"
import dayjs from "dayjs"
import { AppContext } from "../Context"

export default function RegisterScreen({ navigation }) {
  const { userType, org, pos, onSetUserId } = useContext(AppContext)

  const Form = useForm({
    defaultValues: {
      birth_date: new Date()
    }
  })

  const { watch } = Form

  onSetUserId(watch("user_type", 0))

  const INPUT = [
    {
      label: t("firstname_thai", { defaultValue: "ชื่อ (ภาษาไทย)" }),
      name: "first_name",
      type: "text",
      pattern: /^[ก-๏\s]+$/,
      placeholder: "e.g. สมชาย"
    },
    {
      label: t("lastname_thai", { defaultValue: "นามสกุล (ภาษาไทย)" }),
      name: "last_name",
      type: "text",
      pattern: /^[ก-๏\s]+$/,
      placeholder: "e.g. สุขสบาย"
    },

    {
      label: t("email"),
      name: "email",
      type: "text",
      inputMode: "email",
      required: t("NO_EMAIL"),
      error: t("NO_EMAIL"),
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      placeholder: "e.g. nsdf@gmail.com"
    },
    {
      label: t("birthday", { defaultValue: "วันเดือนปีเกิด" }),
      name: "birth_date",
      type: "date",
      required: t("required")
    },
    {
      label: t("phone"),
      name: "phone",
      type: "text",
      inputMode: "tel",
      required: t("required"),
      placeholder: "e.g. 090 0000000",
      pattern: /^\d{10}$/
    },
    {
      label: "ประเภทบุคคล",
      name: "user_type",
      type: "select",
      options: userType,
      required: t("required"),
      placeholder: "กรุณาเลือกประเภทบุคคล"
    },
    {
      label: t("club", { defaultValue: "สังกัด" }),
      name: "organization",
      type: "select",
      options: org,
      required: t("required"),
      placeholder: "กรุณาเลือกสังกัด"
    },
    {
      label: "ตำแหน่ง",
      name: "position",
      type: "select",
      options: pos,
      required: t("required"),
      placeholder: "กรุณาเลือกตำแหน่ง"
    }
  ]

  const onSubmit = async (data) => {
    const args = {
      ...data,
      birth_date: dayjs(data.birth_date).format("YYYY-M-D")
    }
    navigation.push("RegisterPassword", { ...args })
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff"
      }}
    >
      <View
        style={{
          paddingHorizontal: 24,
          flex: 1
        }}
      >
        <View
          style={{
            paddingTop: Platform.OS === "android" ? 30 : 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <BackButton navigation={navigation} />
        </View>
        <View
          style={{
            alignItems: "center",
            marginBottom: 10
          }}
        >
          <LoginIcon />
          <Text
            style={{
              marginTop: 15,
              ...Font.bigHead,
              color: Colors.spotlightDay,
              fontWeight: "600"
            }}
          >
            Sign Up
          </Text>
          <Text
            style={{
              ...Styled.context,
              color: Colors.gray3
            }}
          >
            ลงทะเบียนเข้าใช้งาน
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            width: "100%"
          }}
        >
          <View
            style={{
              marginBottom: 23.5,
              marginTop: 30,
              width: "100%"
            }}
          >
            {userType && userType.length > 0 && org && org.length > 0 ? (
              INPUT.map((i) => {
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
                      placeholder={i?.placeholder}
                    />
                  </Fragment>
                )
              })
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
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
            label={t("register")}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
