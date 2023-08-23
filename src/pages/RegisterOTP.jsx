import {
  Platform,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity
} from "react-native"
import { t } from "i18n-js"
import React, { useEffect, useRef, useState } from "react"
import Button, { BackButton } from "../components/Button"
import PhoneIcon from "../assets/otp.svg"
import { OTP } from "react-native-otp-form"
import { Colors, Font, Styled } from "../Styled"
import PopupSheetSuccess from "../components/PopupSheetSuccess"
import { confirmOTPRegister, requestOTPRegister } from "../apiNew"
import useRegister from "../query/useRegister"

export default function RegisterOTP({ navigation, route }) {
  const previousParams = route.params
  const actionRef = useRef(null)
  const actionErrorRef = useRef(null)
  const [otp, setOtp] = useState()
  const { mutateRegister } = useRegister()
  const [errorSubTitle, setErrorSubTitle] = useState()
  const [errorTitle, setErrorTitle] = useState()

  const [countdown, setCountdown] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    } else {
      setIsDisabled(false)
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [countdown])

  const onSubmit = async () => {
    const args = {
      ...previousParams
    }
    await confirmOTPRegister({ email: args.email, OTP: otp })
      .then(async (res) => {
        if (res.status === 200) {
          await mutateRegister({ auth_type: "email", ...args })
            .then((_res) => {
              actionRef.current?.show()
            })
            .catch((_err) => {
              console.log(_err.body)
              actionErrorRef.current?.show()
              if (_err.body && _err.body.length > 0) {
                setErrorTitle(_err.message)
                const errorMessages = _err.body
                  .map((error) => `- ${error.errormsg}`)
                  .join("\n")
                setErrorSubTitle(errorMessages)
              } else {
                setErrorTitle(_err.message)
              }
            })
        }
      })
      .catch((err) => {
        actionErrorRef.current?.show()
        setErrorTitle(t("error"))
        setErrorSubTitle(err.message)
      })
  }

  return previousParams ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff"
      }}
    >
      <PopupSheetSuccess
        actionSheetRef={actionRef}
        title="ลงทะเบียนสำเร็จ!"
        subTitle="ลงทะเบียนสำเร็จแล้ว
        สามารถเข้าสู่ระบบด้วยรหัสที่คุณสร้างได้เลย"
        onClose={() => navigation.replace("LoginScreen")}
      />
      <PopupSheetSuccess
        actionSheetRef={actionErrorRef}
        title={errorTitle}
        subTitle={errorSubTitle}
        isClose
      />
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
          <PhoneIcon />
          <Text
            style={{
              marginTop: 15,
              ...Font.bigHead,
              color: Colors.spotlightDay,
              fontWeight: "600"
            }}
          >
            Verification
          </Text>
          <Text
            style={{
              ...Styled.context,
              color: Colors.gray3
            }}
          >
            ยืนยันตัวตนด้วยอีเมล
          </Text>
          <Text
            style={{ ...Styled.context, color: Colors.textday, marginTop: 25 }}
          >{`ส่งรหัส OTP ไปที่ ${previousParams.email}`}</Text>
        </View>
        <View
          style={{
            marginBottom: 30,
            marginTop: 30,
            width: "100%"
          }}
        >
          <OTP
            codeCount={6}
            keyboardType="number-pad"
            onTyping={(val) => setOtp(val)}
          />
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
            // position: "absolute",
            // bottom: 40,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 20
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                requestOTPRegister({ email: previousParams.email })
                setIsDisabled(true)
                setCountdown(60)
              }}
              disabled={isDisabled}
            >
              <Text
                style={{
                  ...Styled.small,
                  color:
                    countdown > 0 ? Colors.detailTextDay : Colors.spotlightDay
                }}
              >
                ส่งรหัสอีกครั้ง
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                ...Styled.small,
                color: Colors.detailTextDay
              }}
            >
              {countdown > 0 && ` (${countdown} s)`}
            </Text>
          </View>
          <Button
            onPress={() => onSubmit()}
            label={t("confirm")}
          />
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <></>
  )
}
