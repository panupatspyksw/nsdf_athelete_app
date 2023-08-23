import { SafeAreaView, ScrollView, Text, View } from "react-native"
import Button from "../components/Button"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import React, { Fragment, useContext, useRef } from "react"
import { DateForm, InputForm, OptionsForm } from "../components/Form"
import { useForm } from "react-hook-form"
import { AppContext } from "../Context"
import ForgetIcon from "../assets/passwordIcon.svg"
import Header from "../components/Header"
import PopupActionSheet from "../components/PopupActionSheet"
import PopupSheetSuccess from "../components/PopupSheetSuccess"
import { requestChangePassWithOTP } from "../apiNew"
import { changePassword } from "../api"

export default function ChangePassword({ navigation, route }) {
  const { user } = useContext(AppContext)
  const isForget = route.params?.isForget ?? false

  const PASSWORD = [
    {
      label: isForget ? "OTP" : t("current_password"),
      name: isForget ? "OTP" : "oldpassword",
      type: "text",
      inputMode: "text",
      required: t("NO_PASSWORD"),
      secureTextEntry: !isForget
    },
    {
      label: t("password"),
      name: "password",
      type: "text",
      inputMode: "text",
      secureTextEntry: true,
      required: t("NO_PASSWORD")
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
      required: t("NO_PASSWORD")
    }
  ]
  const actionSheetRef = useRef(null)
  const actionRef = useRef(null)
  const actionReft = useRef(null)

  const Form = useForm({
    defaultValues: {
      password: ""
    }
  })

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = Form

  const _email = route.params?.email

  const onSubmit = async (data) => {
    actionSheetRef.current?.hide()
    const args = {
      email: _email,
      ...data
    }
    if (isForget) {
      await requestChangePassWithOTP(args)
        .then((_res) => {
          actionRef.current?.show()
        })
        .catch(() => {
          actionReft.current?.show()
        })
    } else {
      await changePassword(args)
        .then((_res) => {
          actionRef.current?.show()
        })
        .catch(() => {
          actionReft.current?.show()
        })
    }
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1
      }}
    >
      <PopupActionSheet
        actionSheetRef={actionSheetRef}
        submit={handleSubmit(onSubmit)}
        title={t("confirm_change_password")}
        subTitle={t("confirm_change_password_sub")}
      />
      <PopupSheetSuccess
        actionSheetRef={actionRef}
        title="เปลี่ยนรหัสผ่านสำเร็จ!"
        subTitle="รหัสผ่านของคุณได้รับการเปลี่ยนแปลงแล้ว
        คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้เลย"
        onClose={() => navigation.goBack()}
      />
      <PopupSheetSuccess
        actionSheetRef={actionReft}
        title="OTP หรือ รหัสผ่าน ไม่ถูกต้อง!"
        subTitle={
          <Text>
            - กรุณาตรวจสอบ OTP อีกครั้ง{"\n"}-
            กรุณาใส่รหัสผ่านที่มีตัวอักษรพิมพ์ใหญ่ พิมพ์เล็ก และ ตัวเลข
            อย่างน้อย 8 ตัว
          </Text>
        }
        isClose
      />
      <Header
        arrow
        navigation={navigation}
      />
      <View
        style={{
          alignItems: "center"
        }}
      >
        <ForgetIcon />
        <Text
          style={{
            marginTop: 15,
            ...Styled.bigHead,
            color: Colors.spotlightDay,
            fontWeight: "600"
          }}
        >
          New Password
        </Text>
        <Text
          style={{
            ...Styled.context,
            color: Colors.gray3,
            textAlign: "center"
          }}
        >
          {isForget
            ? "กรอกรหัสยืนยันที่ได้รับทางอีเมลและตั้งรหัสผ่านใหม่"
            : "กรอกรหัสปัจจุบันและรหัสผ่านใหม่"}
        </Text>
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView
          contentContainerStyle={{
            width: "100%",
            paddingHorizontal: 24,
            alignItems: "center"
          }}
        >
          <View
            style={{
              marginBottom: 23.5,
              marginTop: 30,
              width: "100%"
            }}
          >
            {PASSWORD.map((i) => {
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
                    onSubmitEditing={() => handleSubmit(onSubmit)}
                    secureTextEntry={i?.secureTextEntry}
                  />
                </Fragment>
              )
            })}
          </View>
          <Button
            onPress={() => {
              const validate = watch()

              console.log(validate)

              if (validate?.password !== validate?.confirmpassword) {
                Form.setError("confirmpassword", {
                  type: "custom",
                  message: t("PASSWORD_NOT_MATCH")
                })
              } else {
                actionSheetRef.current?.show()
              }
            }}
            label={t("confirm")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
