import React from "react"
import { SafeAreaView, Text, View } from "react-native"
import { t } from "i18n-js"
import Button, { BackButton } from "../components/Button"
import { Colors, Styled } from "../Styled"
import { InputForm } from "../components/Form"
import { useForm } from "react-hook-form"
import ForgetIcon from "../assets/passwordIcon.svg"

export default function NewPassword({ navigation }) {
  const Form = useForm({
    defaultValues: {
      email: ""
    }
  })
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = Form

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
            marginBottom: 36,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <BackButton navigation={navigation} />
        </View>
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
            label={t("email")}
            onChange={() => {}}
            value={""}
            Form={Form}
            inputMode={"email"}
            name={"email"}
            placeholder={"NSDF@example.com"}
            error={t("NO_EMAIL")}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end"
          }}
        >
          <Button
            onPress={() => {}}
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
