import React, { useRef, useState } from "react"
import { SafeAreaView, Text, View } from "react-native"
import { t } from "i18n-js"
import Button from "../components/Button"
import { Colors, Styled } from "../Styled"
import { InputForm } from "../components/Form"
import { useForm } from "react-hook-form"
import ForgetIcon from "../assets/passwordIcon.svg"
import Toast from "react-native-toast-message"
import { getResetPassword } from "../api"
import Header from "../components/Header"
import { requestOTP } from "../apiNew"
import PopupSheetSuccess from "../components/PopupSheetSuccess"

export default function ForgetPassword({ navigation }) {
  const [title, setTitle] = useState("")
  const [msg, setMsg] = useState("")
  const [isError, setIserror] = useState(false)
  const actionRef = useRef(null)
  const [_email, _setEmail] = useState("")

  const Form = useForm({
    defaultValues: {
      email: ""
    }
  })
  const {
    handleSubmit,
    formState: { errors }
  } = Form

  console.log(_email)

  const onSubmit = async (data) => {
    _setEmail(data.email)
    await requestOTP({
      email: data.email
    })
      .then((_res) => {
        // success
        setMsg(_res.message)
        setTitle(_res.body)
        setIserror(false)
      })
      .catch((_err) => {
        setMsg(_err.message)
        setTitle(t("error"))
        setIserror(true)
      })
      .finally(() => {
        actionRef.current?.show()
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
        actionSheetRef={actionRef}
        onClose={() => {
          !isError &&
            navigation.replace("changePass", {
              isForget: true,
              email: _email
            })
        }}
        isClose={isError}
        title={title}
        subTitle={msg}
      />
      <View
        style={{
          paddingHorizontal: 24,
          flex: 1
        }}
      >
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
            Forgot Password?
          </Text>
          <Text
            style={{
              ...Styled.context,
              color: Colors.gray3,
              textAlign: "center"
            }}
          >
            กรอกอีเมลของคุณเพื่อรับรหัสยืนยัน{"\n"}สำหรับการเปลี่ยนรหัสผ่านใหม่
          </Text>
        </View>
        <View style={{ marginBottom: 23.5, marginTop: 30 }}>
          <InputForm
            rules={{
              required: t("NO_EMAIL"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t("INVALID_EMAIL")
              }
            }}
            label={t("email")}
            Form={Form}
            inputMode={"email"}
            name={"email"}
            placeholder={"NSDF@example.com"}
            error={t("NO_EMAIL")}
            onChange={(val) => _setEmail(val.target?.value)}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end"
          }}
        >
          <Button
            onPress={handleSubmit(onSubmit)}
            label={t("confirm")}
            color={Colors.softDisableDay}
            style={{
              alignSelf: "center",
              marginTop: 36,
              width: 240
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
