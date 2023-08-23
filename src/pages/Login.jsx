import React, { useContext, useRef, useState } from "react"
import {
  Platform,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native"
import auth from "@react-native-firebase/auth"
import { appleAuth } from "@invertase/react-native-apple-authentication"

import LoginIcon from "../assets/loginIcon.svg"
import { t } from "i18n-js"
import Button, { BackButton } from "../components/Button"
import { Colors, Styled } from "../Styled"
import { InputForm } from "../components/Form"
import { useForm } from "react-hook-form"
import GoogleIcon from "../assets/google.svg"
import FBIcon from "../assets/facebook.svg"
import AppleIcon from "../assets/apple.svg"
import { AppContext } from "../Context"
import { LoginManager, AccessToken, Settings } from "react-native-fbsdk-next"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { setAuthStorage } from "../helper"
import PopupSheetSuccess from "../components/PopupSheetSuccess"
import useLogin from "../query/useLogin"
import useRegister from "../query/useRegister"
import useGetProfile from "../query/useGetProfile"
import { getProfile } from "../apiNew"

GoogleSignin.configure({
  webClientId:
    "667071396486-bmu9qn3mdnhs60edl4b4i6stsvkeea9r.apps.googleusercontent.com"
})

Settings.initializeSDK()
Settings.setAppID("6202362566467351")

export default function LoginScreen({ navigation, route }) {
  const { setUser } = useContext(AppContext)
  const [errMsg, setErrMsg] = useState("")
  const actionSheetRef = useRef(null)
  const { mutateLogin } = useLogin()
  const { mutateGetProfile } = useGetProfile()
  const { mutateRegister } = useRegister()
  const { height } = Dimensions.get("window")

  const Form = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const { handleSubmit } = Form

  const setToStorage = async (_res, _auth_type) => {
    let body = _res
    const bodyWithoutToken = Object.fromEntries(
      Object.entries(body).filter(([key]) => key !== "token")
    )

    if (_res) {
      await setAuthStorage(body.token, _auth_type, bodyWithoutToken).then(
        () => {
          getProfile().then((_profile) => setUser(_profile.body))
        }
      )
    }
  }

  const onSubmit = async (input) => {
    const argsData = {
      auth_type: "email",
      ...input
    }
    await mutateLogin(argsData)
      .then(async (_res) => {
        setToStorage(_res.body, "email")
        navigation.replace("HomeTab")
      })
      .catch((_err) => {
        actionSheetRef.current?.show()
        setErrMsg(_err.message)
      })
  }

  const socialLogin = async (user) => {
    try {
      await mutateLogin({
        email: user.email,
        auth_type: user.auth_type,
        token: user.token
      }).then((_resLogin) => {
        setToStorage(_resLogin.body, user.auth_type)
        navigation.replace("HomeTab")
      })
    } catch (err) {
      try {
        await mutateRegister(user)
          .then(async (_res) => {
            await mutateLogin({
              email: user.email,
              auth_type: user.auth_type,
              token: user.token
            })
              .then((_resLoginAfterRegis) => {
                setToStorage(_resLoginAfterRegis.body, user.auth_type)
                navigation.replace("HomeTab")
              })
              .catch((error) => {
                actionSheetRef.current?.show()
                setErrMsg(error.message)
              })
          })
          .catch((errorRegis) => {
            actionSheetRef.current?.show()
            setErrMsg(errorRegis.message)
          })
      } catch {
        actionSheetRef.current?.show()
        setErrMsg(err.message)
      }
    }
  }

  const onSocialLogin = async (type) => {
    let user = {}
    switch (type) {
      case "google":
        try {
          await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true
          })
          const userInfo = await GoogleSignin.signIn()

          const newJson = {
            email: userInfo.user.email,
            auth_type: "google",
            token: userInfo.idToken,
            first_name: userInfo.user.givenName,
            last_name: userInfo.user.familyName
          }
          user = newJson
        } catch (err) {
          throw err
        }
        break
      case "facebook":
        const result = await LoginManager.logInWithPermissions([
          "public_profile",
          "email"
        ])

        if (result.isCancelled) {
          throw "User cancelled the login process"
        }

        const data = await AccessToken.getCurrentAccessToken()

        if (!data) {
          throw "Something went wrong obtaining access token"
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(
          data.accessToken
        )
        const { user: fbUser } = await auth().signInWithCredential(
          facebookCredential
        )
        const [firstName, lastName] = fbUser.displayName.split(" ")
        user = { ...fbUser._user, firstName, lastName }

        break
      case "apple":
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
        })

        if (!appleAuthRequestResponse.identityToken) {
          throw new Error("Apple Sign-In failed - no identify token returned")
        }

        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce
        )

        // Sign the user in with the credential
        const { user: appleUser } = await auth().signInWithCredential(
          appleCredential
        )
        console.log({ appleUser })
        user = { ...appleUser?._user, firstName: "Apple", lastName: "User" }

        break
    }

    if (user) {
      await socialLogin(user)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          contentContainerStyle={{ backgroundColor: "white" }}
        >
          <View style={{ minHeight: height }}>
            <PopupSheetSuccess
              actionSheetRef={actionSheetRef}
              title={t("error")}
              subTitle={errMsg}
              isClose
            />
            <View
              style={{
                paddingHorizontal: 24,
                height: "100%"
              }}
            >
              <View
                style={{
                  paddingTop: Platform.OS === "android" ? 30 : 0,

                  marginBottom: 36,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                {<BackButton onPress={() => navigation.replace("HomeTab")} />}
              </View>
              <View
                style={{
                  alignItems: "center"
                }}
              >
                <LoginIcon />
                <Text
                  style={{
                    marginTop: 15,
                    ...Styled.bigHead,
                    color: Colors.spotlightDay,
                    fontWeight: "600"
                  }}
                >
                  Sign In
                </Text>
                <Text
                  style={{
                    ...Styled.context,
                    color: Colors.gray3
                  }}
                >
                  เข้าสู่ระบบ
                </Text>
              </View>
              <View style={{ marginBottom: 23.5, marginTop: 30 }}>
                <InputForm
                  label={t("email")}
                  rules={{
                    required: t("NO_EMAIL"),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t("invalid")
                    }
                  }}
                  Form={Form}
                  inputMode={"email"}
                  name={"email"}
                  placeholder={"NSDF@example.com"}
                />
                <InputForm
                  label={t("password")}
                  rules={{
                    required: t("NO_PASSWORD")
                  }}
                  Form={Form}
                  inputMode={"text"}
                  name={"password"}
                  placeholder={"Password1234"}
                  secureTextEntry
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Forget")
                }}
                style={{
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Text
                  style={{
                    ...Styled.context,
                    color: Colors.gray3,
                    textAlign: "center"
                  }}
                >
                  {t("forgot_password")}
                </Text>
              </TouchableOpacity>
              <Button
                onPress={handleSubmit(onSubmit)}
                label={t("login")}
                color={Colors.softDisableDay}
                style={{
                  alignSelf: "center",
                  marginTop: 36
                }}
              />
              <View
                style={{
                  justifyContent: "flex-end",
                  marginTop: 15
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 15
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      onSocialLogin("facebook")
                    }}
                  >
                    <FBIcon
                      width={36}
                      height={36}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      onSocialLogin("google")
                    }}
                    style={{
                      marginHorizontal: 15
                    }}
                  >
                    <GoogleIcon
                      width={36}
                      height={36}
                    />
                  </TouchableOpacity>
                  {Platform.OS === "ios" ? (
                    <TouchableOpacity
                      onPress={() => {
                        onSocialLogin("apple")
                      }}
                      style={{
                        borderRadius: 18,
                        overflow: "hidden"
                      }}
                    >
                      <AppleIcon
                        width={36}
                        height={36}
                        style={{
                          backgroundColor: "black"
                        }}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      ...Styled.small,
                      color: Colors.detailTextDay
                    }}
                  >
                    {t("not_have_account")}{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push("Register")
                    }}
                  >
                    <Text
                      style={{
                        ...Styled.small,
                        color: Colors.spotlightDay
                      }}
                    >
                      {t("sign_up")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
