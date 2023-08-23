import { Platform, SafeAreaView, ScrollView, Text, View } from "react-native"
import { t } from "i18n-js"
import React, { Fragment } from "react"
import Button, { BackButton } from "../components/Button"
import PassIcon from "../assets/passwordIcon.svg"
import { Colors, Font, Styled } from "../Styled"
import { InputForm } from "../components/Form"
import { useForm } from "react-hook-form"
import { requestOTPRegister } from "../apiNew"

const RegisterPassword = ({ navigation, route }) => {
  const previousParams = route.params

  const Form = useForm()

  const { watch } = Form

  const INPUT = [
    {
      label: t("password"),
      name: "password",
      type: "text",
      inputMode: "text",
      secureTextEntry: true,
      required: t("NO_PASSWORD"),
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      helper:
        "*กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัว และประกอบไปด้วยภาษาอังกฤษตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และตัวเลข",
      placeholder: "e.g. A12345678a"
    },
    {
      label: t("confirm_password"),
      name: "confirmpassword",
      type: "text",
      inputMode: "text",
      secureTextEntry: true,
      match: {
        value: "password",
        message: t("PASSWORD_NOT_MATCH")
      },
      required: t("NO_PASSWORD"),
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      helper: "*กรุณากรอกรหัสผ่านให้ตรงกับด้านบน",
      placeholder: "e.g. A12345678a"
    }
  ]

  const onSubmit = async (data) => {
    const args = {
      ...previousParams,
      ...data
    }
    await requestOTPRegister({ email: args.email }).then((_res) => {
      if (_res.status === 200) {
        navigation.push("RegisterOTP", { ...args })
      }
    })
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
          <PassIcon />
          <Text
            style={{
              marginTop: 15,
              ...Font.bigHead,
              color: Colors.spotlightDay,
              fontWeight: "600"
            }}
          >
            Set Password
          </Text>
          <Text
            style={{
              ...Styled.context,
              color: Colors.gray3
            }}
          >
            ตั้งค่ารหัสผ่าน
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
            {INPUT.map((i) => {
              return (
                <Fragment key={i.name}>
                  <InputForm
                    rules={{
                      required: i.required ?? t("required"),
                      pattern: i?.pattern && {
                        value: i?.pattern
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
                    helper={i.helper}
                  />
                </Fragment>
              )
            })}
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
              const { password, confirmpassword } = watch()
              if (password !== confirmpassword) {
                Form.setError("confirmpassword", {
                  type: "custom",
                  message: t("PASSWORD_NOT_MATCH")
                })
                console.log("here")
              } else {
                Form.handleSubmit(onSubmit)()
                console.log("her2")
              }
            }}
            label={t("submit")}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RegisterPassword
