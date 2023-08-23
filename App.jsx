/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useRef, useState } from "react"
import Toast from "react-native-toast-message"
import "react-native-gesture-handler"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, StackActions } from "@react-navigation/native"
import HomeScreen from "./src/pages/Home"
import { createStackNavigator } from "@react-navigation/stack"
import Landing from "./src/pages/Landing"
import i18n from "./src/i18n"
import Term from "./src/pages/Term"
import AsyncStorage from "@react-native-async-storage/async-storage"
import SplashScreen from "./src/pages/SplashScreen"
import { AppContext } from "./src/Context"
import RegisterScreen from "./src/pages/Register"
import LoginScreen from "./src/pages/Login"
import ForgetPassword from "./src/pages/ForgetPassword"
import Spinner from "react-native-loading-spinner-overlay"
import NewPassword from "./src/pages/NewPassword"
import ActivityIcon from "./src/assets/calendar.svg"
import MissionIcon from "./src/assets/competition.svg"
import { api } from "./src/api"
import { Alert, PermissionsAndroid, Platform, View } from "react-native"
import _ from "lodash"
import HomeIcon from "./src/assets/home.svg"
import KnowledgeIcon from "./src/assets/knowledge.svg"
import OtherIcon from "./src/assets/other.svg"
import { Colors, Styled } from "./src/Styled"
import SmartWearScreen from "./src/pages/SmartWearScreen"
import { LogBox } from "react-native"
import KnowledgeScreen from "./src/pages/KnowledgeScreen"
import "dayjs/locale/th"
import "dayjs/locale/en"
import dayjs from "dayjs"
import RequestScreen from "./src/pages/Request"
import messaging from "@react-native-firebase/messaging"
import MoreScreen from "./src/pages/MoreScreen"
import ReadNews from "./src/pages/ReadNews"
import NotificationScreen from "./src/pages/Notification"
import AboutUS from "./src/pages/AboutUS"
import ContactUS from "./src/pages/ContactUS"
import LangSetting from "./src/pages/LangSetting"
import UserProfile from "./src/pages/MyProfile"
import EditProfile from "./src/pages/EditProfile"
import ChangePassword from "./src/pages/ChangePassword"
import Privacy from "./src/pages/Privacy"
import PendingScreen from "./src/pages/PendingScreen"
import Stat from "./src/pages/Stat"
import AppleHealthKit from "react-native-health"
import database from "@react-native-firebase/database"
import Athlete from "./src/pages/Athlete"
import AddAthlete from "./src/pages/AddAthlete"
import GoogleFit, { BucketUnit, Scopes } from "react-native-google-fit"
import Calendar from "./src/pages/Calendar"
import ReadActivity from "./src/pages/ReadActivity"
import Report from "./src/pages/Report"
import Competition from "./src/pages/Competition"
import CompetitionDetail from "./src/pages/CompetitionDetail"
import Assignment from "./src/pages/Assignment"
import AssignmentList from "./src/pages/AssignmentList"
import AssignmentTraningAssign from "./src/pages/AssignmentTraningAssign"
import { NativeBaseProvider } from "native-base"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import NewsAnnouce from "./src/pages/NewsAnnouce"
import TrainingList from "./src/pages/TrainingList"
import useProfileContext from "./src/useProfileContext"
import Mission from "./src/pages/Mission"
import RegisterPassword from "./src/pages/RegisterPassword"
import RegisterOTP from "./src/pages/RegisterOTP"
import AthleteStatCoachView from "./src/pages/AthleteStatCoachView"
import TrainingListId from "./src/pages/TrainingListId"
import TrainingSave from "./src/pages/TrainingSave"
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown"
import useSelectContext from "./src/useSelectContext"

if (__DEV__) {
  // Ignore log notification by message:
  LogBox.ignoreLogs(["Warning: ..."])
  // Ignore all log notifications:
  LogBox.ignoreAllLogs()
}

async function requestUserPermission() {
  //android
  if (Platform.OS === "android") {
    const authStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    )
    await PermissionsAndroid.request("android.permission.ACTIVITY_RECOGNITION")
    console.log("Authorization status:", authStatus)
  } else {
    const authStatus = await messaging().requestPermission()
    await messaging().registerDeviceForRemoteMessages()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    if (enabled) {
      console.log("Authorization status:", authStatus)
      const token = await messaging().getToken()
      console.log("token status:", token)
    }
  }
}

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === "android" ? 70 : 90,
          paddingTop: Platform.OS === "android" ? 0 : 20,
          borderTopWidth: 0,
          backgroundColor: "white"
        },

        tabBarItemStyle: {
          justifyContent: "center"
        },
        tabBarLabelStyle: {
          marginTop: Platform.OS === "android" ? 0 : 5,
          paddingBottom: Platform.OS === "android" ? 15 : 0,
          ...Styled.small
        },
        tabBarShowLabel: true,
        tabBarInactiveTintColor: Colors.gray3,
        tabBarActiveTintColor: Colors.spotlightDay
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: i18n.t("home"),
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <HomeIcon
                style={{
                  color: color
                }}
              />
            )
          }
        }}
      />
      <Tab.Screen
        name="News"
        component={KnowledgeScreen}
        options={{
          tabBarLabel: i18n.t("knowledge"),
          headerShown: false,

          tabBarIcon: ({ focused, color, size }) => {
            return (
              <KnowledgeIcon
                style={{
                  color: color
                }}
              />
            )
          }
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Calendar}
        options={{
          tabBarLabel: i18n.t("activity_calendar"),
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <ActivityIcon
                style={{
                  color: color
                }}
              />
            )
          }
        }}
      />
      <Tab.Screen
        name="Mission"
        component={Mission}
        options={{
          tabBarLabel: i18n.t("mission"),
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MissionIcon
                style={{
                  color: color
                }}
              />
            )
          }
        }}
      />
      <Tab.Screen
        name="Others"
        component={MoreScreen}
        options={{
          tabBarLabel: i18n.t("more"),
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <OtherIcon
                style={{
                  color: color
                }}
              />
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}

function App() {
  const navigationRef = useRef(null)
  const [lang, setLang] = useState("en")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  dayjs.locale(i18n.t("lang"))

  const queryClient = new QueryClient()

  const changeLang = (l) => {
    i18n.setdefault(l, setLang)
  }

  useEffect(() => {
    const init = async () => {
      const l = await AsyncStorage.getItem("lang")

      changeLang(l ?? "en")
    }
    init()
    requestUserPermission()

    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   console.log(remoteMessage)
    //   //handle fcm message
    //   const time = dayjs(remoteMessage.sentTime).format("YYYY-MM-DD HH:mm:ss")
    //   //convert remoteMessage to local notification param
    //   PushNotification.localNotification({
    //     channelId: "default",
    //     message: remoteMessage.notification.body,
    //     title: remoteMessage.notification.title
    //   })
    //   const notificationList = JSON.parse(
    //     (await AsyncStorage.getItem("notificationList")) ?? "[]"
    //   )
    //   notificationList.push({
    //     ...remoteMessage,
    //     date: time
    //   })
    //   await AsyncStorage.setItem(
    //     "notificationList",
    //     JSON.stringify(notificationList)
    //   )
    // })

    // return unsubscribe
  }, [])

  useEffect(() => {
    const getSelected = async () => {
      const id = await AsyncStorage.getItem("pick")
      if (Platform.OS === "ios" && id) {
        const permissions = {
          permissions: {
            read: [
              AppleHealthKit.Constants.Permissions.HeartRate,
              AppleHealthKit.Constants.Permissions.Height,
              AppleHealthKit.Constants.Permissions.Weight,
              AppleHealthKit.Constants.Permissions.Workout
            ]
          }
        }
        AppleHealthKit.initHealthKit(permissions, (error) => {
          /* Called after we receive a response from the system */

          if (error) {
            console.log("[ERROR] Cannot grant permissions!")
          } else {
            const options = {
              startDate: dayjs().startOf("days").toDate().toISOString()
            }

            AppleHealthKit.getHeartRateSamples(
              options,
              async (callbackError, results) => {
                const avg =
                  results.reduce((acc, cur) => {
                    if (id === cur.sourceId) {
                      return acc + cur.value
                    } else {
                      return acc
                    }
                  }, 0) / results.length

                await database()
                  .ref(`/user/${user.member_id}/heath/heartRate`)
                  .update(avg.toFixed(2))
              }
            )
            AppleHealthKit.getHeightSamples(
              {
                unit: "cm",
                startDate: dayjs().startOf("year").toDate().toISOString()
              },
              async (callbackError, results) => {
                const avg = _.last(results).value
                await database()
                  .ref(`/user/${user.member_id}/heath/Height`)
                  .update(avg.toFixed(2))
              }
            )
            AppleHealthKit.getWeightSamples(
              {
                unit: "kg",
                startDate: dayjs().startOf("year").toDate().toISOString()
              },
              async (callbackError, results) => {
                console.log({ results })
                const avg = _.last(results).value

                console.log("Current getWeightSamples: ", avg)
                await database()
                  .ref(`/user/${user.member_id}/heath/Weight`)
                  .update(avg.toFixed(2))
              }
            )
          }
        })
      } else {
      }
      if (Platform.OS === "android" && id) {
        const options = {
          scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_LOCATION_READ,
            Scopes.FITNESS_HEART_RATE_READ
          ]
        }
        GoogleFit.authorize(options).then(async (authResult) => {
          if (authResult.success) {
            const opt = {
              startDate: dayjs().startOf("month"), // required ISO8601Timestamp
              endDate: new Date().toISOString(), // required ISO8601Timestamp
              bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
              bucketInterval: 1 // optional - default 1.
            }

            const Heart = await GoogleFit.getHeartRateSamples({
              ...opt,
              startDate: dayjs().startOf("day")
            })
            const Height = await GoogleFit.getHeightSamples({
              ...opt
            })
            const Weight = await GoogleFit.getWeightSamples({
              startDate: dayjs().startOf("month"), // required ISO8601Timestamp
              unit: "kg"
            })

            //set average
            await database()
              .ref(`/user/${user.member_id}/heath/`)
              .update({
                heartRate: _.mean(Heart.map((i) => i.value)).toFixed(2),
                Weight: _.mean(Weight.map((i) => i.value)).toFixed(2),
                Height: _.mean(Height.map((i) => i.value)).toFixed(2) * 100
              })
          }
        })
      }
    }
    if (user?.member_id) {
      getSelected()
    }
  }, [user])

  const context = useProfileContext()
  const selectContext = useSelectContext()

  return (
    <AppContext.Provider
      value={{
        changeLang,
        setLoading,
        ...context,
        ...selectContext
      }}
    >
      <NativeBaseProvider>
        <QueryClientProvider client={queryClient}>
          <AutocompleteDropdownContextProvider>
            <View
              style={{
                flex: 1,
                paddingBottom: Platform.OS === "android" ? 10 : 0,
                backgroundColor: "#FFF"
              }}
            >
              <Spinner visible={loading} />
              <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: "#fff"
                    },
                    headerShadowVisible: false, // applied here
                    headerBackTitleVisible: false,
                    headerShown: false
                  }}
                >
                  <Stack.Screen
                    name="Landing"
                    component={Landing}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name="Term"
                    component={Term}
                  />
                  <Stack.Screen
                    name="viewActivity"
                    component={ReadActivity}
                  />
                  <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                  />
                  <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                  />
                  <Stack.Screen
                    name="RegisterPassword"
                    component={RegisterPassword}
                  />
                  <Stack.Screen
                    name="RegisterOTP"
                    component={RegisterOTP}
                  />
                  <Stack.Screen
                    name="Forget"
                    component={ForgetPassword}
                  />
                  <Stack.Screen
                    name="NewPassword"
                    component={NewPassword}
                  />
                  <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                  />
                  <Stack.Screen
                    name="HomeTab"
                    component={HomeTabs}
                  />
                  <Stack.Screen
                    name="about"
                    component={AboutUS}
                  />
                  <Stack.Screen
                    name="lang"
                    component={LangSetting}
                  />
                  <Stack.Screen
                    name="contact"
                    component={ContactUS}
                  />
                  <Stack.Screen
                    name="RequestScreen"
                    component={RequestScreen}
                  />
                  <Stack.Screen
                    name="SmartWearScreen"
                    component={SmartWearScreen}
                  />
                  <Stack.Screen
                    name="Read"
                    component={ReadNews}
                  />
                  <Stack.Screen
                    name="profile"
                    component={UserProfile}
                  />
                  <Stack.Screen
                    name="editProfile"
                    component={EditProfile}
                  />
                  <Stack.Screen
                    name="Notification"
                    component={NotificationScreen}
                  />
                  <Stack.Screen
                    name="changePass"
                    component={ChangePassword}
                  />
                  <Stack.Screen
                    name="privacy"
                    component={Privacy}
                  />
                  <Stack.Screen
                    name="PendingScreen"
                    component={PendingScreen}
                  />
                  <Stack.Screen
                    name="Stat"
                    component={Stat}
                  />
                  <Stack.Screen
                    name="Athlete"
                    component={Athlete}
                  />
                  <Stack.Screen
                    name="AddAthlete"
                    component={AddAthlete}
                  />
                  <Stack.Screen
                    name="report"
                    component={Report}
                  />
                  <Stack.Screen
                    name="Competition"
                    component={Competition}
                  />
                  <Stack.Screen
                    name="CompetitionDetail"
                    component={CompetitionDetail}
                  />
                  <Stack.Screen
                    name="NewsAnnouce"
                    component={NewsAnnouce}
                  />
                  {/* assignment */}
                  <Stack.Screen
                    name="Assignment"
                    component={Assignment}
                  />
                  <Stack.Screen
                    name="AssignmentList"
                    component={AssignmentList}
                  />
                  <Stack.Screen
                    name="AssignmentTraningAssign"
                    component={AssignmentTraningAssign}
                  />
                  <Stack.Screen
                    name="TraningList"
                    component={TrainingList}
                  />
                  <Stack.Screen
                    name="TrainingListId"
                    component={TrainingListId}
                  />
                  <Stack.Screen
                    name="TrainingSave"
                    component={TrainingSave}
                  />
                  <Stack.Screen
                    name="AthleteStatCoachView"
                    component={AthleteStatCoachView}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
            <Toast />
          </AutocompleteDropdownContextProvider>
        </QueryClientProvider>
      </NativeBaseProvider>
    </AppContext.Provider>
  )
}

export default App
