import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import Header from "../components/Header"
import { Colors, Font } from "../Styled"
import { t } from "i18n-js"
import { getTrainingAccident } from "../apiNew"
import Button from "../components/Button"
import CameraIcon from "../assets/camera.svg"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import FastImage from "react-native-fast-image"
import services from "../axiosConfig"
import PopupActionSheet from "../components/PopupActionSheet"
import { Select, CheckIcon } from "native-base"
import PopupSheetSuccess from "../components/PopupSheetSuccess"

const TrainingSave = ({ navigation, route }) => {
  const id = route.params?.id
  const [options, setOptions] = useState([])
  const [photo, setPhoto] = useState()
  const [msg, setMsg] = useState()
  const [isError, setIsError] = useState()
  const [pain, setPain] = useState()
  const [saveText, setSaveText] = useState("")
  const actionSheetRef = useRef(null)
  const actionSheetReffff = useRef(null)

  const fetchOptions = async () => {
    const response = await getTrainingAccident()
    if (response.status === 200) {
      setOptions(response.body)
    }
  }

  useEffect(() => {
    if (options.length === 0) {
      fetchOptions()
    }
  }, [options])

  const handleChoosePhoto = () => {
    Alert.alert(
      "Choose Image",
      "Do you want to take a new photo or choose an existing one?",
      [
        {
          text: "Camera",
          onPress: () =>
            launchCamera(
              {
                cameraType: "front",
                noData: true
              },
              (response) => {
                if (response) {
                  setPhoto(response)
                }
              }
            )
        },
        {
          text: "Gallery",
          onPress: () =>
            launchImageLibrary(
              {
                includeBase64: true,
                selectionLimit: 1,
                mediaType: "photo",
                noData: true
              },
              (response) => {
                if (response) {
                  setPhoto(response)
                }
              }
            )
        }
      ]
    )
  }

  const createFormData = (_photo, _body = {}) => {
    const data = new FormData()
    console.log(_photo)

    if (_photo && _photo.assets) {
      data.append("imageCollection", {
        name: _photo.assets[0].fileName,
        type: _photo.assets[0].type,
        uri:
          Platform.OS === "ios"
            ? _photo.assets[0].uri.replace("file://", "")
            : _photo.assets[0].uri
      })
    }

    if (_body) {
      Object.keys(_body).forEach((key) => {
        data.append(key, _body[key])
      })
    }

    return data
  }

  const onSubmit = async () => {
    const args = {
      training_log: saveText || "",
      training_status: 2,
      ...(pain && { training_accident: pain })
    }

    if (photo && args) {
      services
        .put(
          `/athlete/assignment/${id}`,
          photo && photo.assets
            ? createFormData(photo, { ...args })
            : { ...args },
          {
            headers: {
              "Content-Type": photo.assets
                ? "multipart/form-data"
                : "application/json"
            }
          }
        )
        .then(async (_res) => {
          actionSheetRef.current?.hide()
          if (_res.status === 200) {
            setIsError(false)
            setMsg(_res.message)
            actionSheetReffff.current?.show()
          }
        })
        .catch((_err) => {
          actionSheetRef.current?.hide()
          setMsg("กรุณากรอกบันทึกหลังการฝึกซ้อม เช่น เรียบร้อย")
          setIsError(true)
          actionSheetReffff.current?.show()
        })
    } else {
      actionSheetRef.current?.hide()
      setMsg("กรุณาแนบรูปการฝึกซ้อม และบันทึกหลังการฝึกซ้อม")
      setIsError(true)
      actionSheetReffff.current?.show()
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        arrow
        navigation={navigation}
        title="บันทึกการฝึกซ้อม"
      />
      <PopupSheetSuccess
        actionSheetRef={actionSheetReffff}
        title={isError ? t("error") : t("success")}
        subTitle={msg}
        onClose={() => (isError ? null : navigation.navigate("HomeTab"))}
        isClose={isError}
      />
      <PopupActionSheet
        actionSheetRef={actionSheetRef}
        submit={() => onSubmit()}
        title={"ยืนยันการส่งบันทึก?"}
        subTitle={"หากคุณยกเลิก บันทึกการฝึกซ้อมจะไม่ถูกนำส่ง"}
      />
      <View
        style={{
          paddingHorizontal: 24,
          marginBottom: 18
        }}
      >
        <Text style={{ ...Font.head, color: Colors.spotlightDay }}>
          Training Notes
        </Text>
        <Text style={{ ...Font.context, color: Colors.detailTextDay }}>
          กรุณากรอกบันทึกหลังการฝึกซ้อม
        </Text>

        <ScrollView style={{ marginTop: 20 }}>
          <Text style={{ ...Font.context, color: Colors.textday }}>
            อาการบาดเจ็บ
          </Text>
          <Select
            placeholder="กรุณาเลือกกลุ่มอาการบาดเจ็บ"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={2} />
            }}
            width="full"
            borderRadius={10}
            mb={3}
            onValueChange={(v) => setPain(v)}
            fontFamily="NotoSansThai-Regular"
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
          >
            {options.length > 0 &&
              options.map((i) => (
                <Select.Item
                  key={i.label}
                  label={i.label}
                  value={i.value}
                />
              ))}
          </Select>

          <Text
            style={{
              ...Font.context,
              color: Colors.titleday,
              marginBottom: 4
            }}
          >
            บันทึกหลังการฝึกซ้อม
          </Text>
          <TextInput
            autoCorrect={false}
            onChangeText={(text) => {
              setSaveText(text)
            }}
            multiline={true}
            style={{
              height: 135,
              padding: 15,
              borderWidth: 1,
              borderColor: Colors.placeholderDay,
              borderRadius: 15,
              textAlignVertical: "top"
            }}
            placeholder="พิมพ์ข้อความของคุณที่นี่..."
            placeholderTextColor={Colors.placeholderDay}
          />
          <Text
            style={{
              ...Font.context,
              color: Colors.titleday,
              marginBottom: 4,
              marginTop: 18
            }}
          >
            แนบรูปภาพ
          </Text>
          <TouchableOpacity
            style={{
              height: 200,
              borderRadius: 10,
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: Colors.placeholderDay,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => handleChoosePhoto()}
          >
            {photo ? (
              <FastImage
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: photo && photo.assets && photo.assets[0].uri
                }}
                alt="profile"
                resizeMode={FastImage.resizeMode.contain}
              />
            ) : (
              <CameraIcon />
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          position: "absolute",
          bottom: 10,
          width: "100%"
        }}
      >
        <Button
          onPress={() => actionSheetRef.current?.show()}
          label={t("save")}
        />
      </View>
    </SafeAreaView>
  )
}

export default TrainingSave
