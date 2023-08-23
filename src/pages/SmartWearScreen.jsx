import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native"
import Button, { BackButton } from "../components/Button"
import React, { useEffect, useState } from "react"
import { t } from "i18n-js"
import GoogleFit, {
  BucketUnit,
  dispatch,
  Scopes
} from "react-native-google-fit"
import _ from "lodash"
import { Colors, Styled } from "../Styled"
import SelectedIcon from "../assets/selected.svg"
import AppleHealthKit from "react-native-health"
import dayjs from "dayjs"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-toast-message"
// import BleManager from 'react-native-ble-manager';
// import {NativeModules, NativeEventEmitter} from 'react-native';
//
// const BleManagerModule = NativeModules.BleManager;
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

export default function ({ navigation }) {
  // const { width } = Dimensions.get("screen")
  const founds = new Map()
  const [selectedDevice, setDevice] = useState("")
  const [devices, setDevices] = useState([])

  useEffect(() => {}, [selectedDevice])

  useEffect(() => {
    const getSelected = async () => {
      const id = await AsyncStorage.getItem("pick")
      setDevice(id)
    }
    getSelected()
    const init = async () => {
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

      if (Platform.OS === "ios") {
        AppleHealthKit.initHealthKit(permissions, (error) => {
          /* Called after we receive a response from the system */

          if (error) {
            console.log("[ERROR] Cannot grant permissions!")
          }

          /* Can now read or write to HealthKit */

          const options = {
            startDate: dayjs().startOf("days").toDate().toISOString()
          }

          AppleHealthKit.getHeartRateSamples(
            options,
            (callbackError, results) => {
              /* Samples are now collected from HealthKit */
              results.forEach((result) => {
                founds.set(result.sourceId, result)
              })
              setDevices(Array.from(founds.values()))
            }
          )
        })
      } else {
        const options = {
          scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,
            Scopes.FITNESS_HEART_RATE_READ,
            Scopes.FITNESS_HEART_RATE_WRITE
          ]
        }

        const _googleFit = [
          {
            sourceId: 90,
            sourceName: "Google Fit"
          }
        ]

        GoogleFit.checkIsAuthorized().then(async () => {
          if (GoogleFit.isAuthorized) {
            setDevices([..._googleFit])
          } else {
            GoogleFit.authorize(options)
              .then(async (authResult) => {
                if (authResult.success) {
                  dispatch("AUTH_SUCCESS")
                  setDevices([..._googleFit])
                } else {
                  dispatch("AUTH_DENIED")
                }
              })
              .catch(() => {
                dispatch("AUTH_ERROR")
              })
          }
        })
      }
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff"
      }}
    >
      <View
        style={{
          paddingVertical: Platform.OS === "android" ? 15 : 0,
          paddingHorizontal: 24,
          flex: 1
        }}
      >
        <View
          style={{
            marginBottom: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <BackButton navigation={navigation} />
          </View>
          <Text
            style={{
              ...Styled.head,
              color: Colors.titleday,
              fontWeight: "600",
              alignSelf: "center"
            }}
          >
            {t("pairing")}
          </Text>
          <View
            style={{
              flex: 1
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View>
            <Text
              style={{
                ...Styled.head,
                fontWeight: "600",
                color: Colors.spotlightDay
              }}
            >
              Wearable Device {Platform.OS === "android" && "( Google Fit )"}
            </Text>
            <Text
              style={{
                ...Styled.context,
                color: Colors.detailTextDay
              }}
            >
              เลือกอุปกรณ์ที่ต้องการเชื่อมต่อ
            </Text>
          </View>
          <View>
            <Text>{selectedDevice !== "" ? "" : "Not"} Connected</Text>
          </View>
        </View>
        <ScrollView
          style={{
            marginTop: 20
          }}
        >
          {devices.map((i) => {
            const isSelected = true
            return (
              <TouchableOpacity
                onPress={async () => {
                  setDevice(i.sourceId)
                }}
                key={i.sourceId}
              >
                <View
                  style={{
                    height: 45,
                    width: "100%",
                    borderWidth: isSelected ? 2 : 0.5,
                    borderColor: isSelected
                      ? Colors.main
                      : Colors.detailTextDay,
                    borderRadius: 8,
                    marginBottom: 14,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row"
                  }}
                >
                  {isSelected && (
                    <View
                      style={{
                        marginRight: 12
                      }}
                    >
                      <SelectedIcon />
                    </View>
                  )}
                  <Text
                    style={{
                      ...Styled.normal,
                      color: isSelected ? Colors.textday : Colors.gray3
                    }}
                  >
                    {i.sourceName}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        <View
          style={{
            alignItems: "center"
          }}
        >
          <Button
            onPress={async () => {
              await AsyncStorage.setItem("pick", selectedDevice)
              Toast.show({
                type: "success",
                text1: t("pairing"),
                text2: t("pairingSuccess")
              })

              navigation.goBack()
            }}
            label={"เชื่อมต่อ"}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
