import { Text, TouchableOpacity, View } from "react-native"
import Button, { DefaultButton } from "../components/Button"
import { Colors, Styled } from "../Styled"
import { t } from "i18n-js"
import React from "react"
import ActionSheet from "react-native-actions-sheet"
import ConfirmIcon from "../assets/passChange.svg"
import Close from "../assets/close.svg"

const PopupActionSheet = ({
  actionSheetRef,
  submit,
  title,
  subTitle,
  btnTitle
}) => {
  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled={true}
      snapPoints={0}
      indicatorStyle={{
        opacity: 0
      }}
      containerStyle={{
        backgroundColor: "rgba(0,0,0,0)",
        shadowOpacity: 0, // This is for ios
        elevation: 0 // This is for android
      }}
    >
      <View
        style={{
          height: 400,
          alignItems: "center"
        }}
      >
        <View
          style={{
            alignItems: "center",
            zIndex: 1,
            width: "50%"
          }}
        >
          <ConfirmIcon />
        </View>
        <View
          style={{
            borderRadius: 20,
            marginTop: -70,
            backgroundColor: "#FFFFFF",
            flex: 1,
            padding: 28,
            width: "100%"
          }}
        >
          <View
            style={{
              alignItems: "flex-end"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current?.hide()
              }}
            >
              <View
                style={{
                  padding: 20
                }}
              >
                <Close />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "100%"
            }}
          >
            <Text
              style={{
                ...Styled.bigHead,
                color: Colors.spotlightDay,
                fontWeight: "600"
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                ...Styled.context,
                color: Colors.detailTextDay,
                fontWeight: "600",
                textAlign: "center"
              }}
            >
              {subTitle}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end"
            }}
          >
            <Button
              style={{
                width: "100%"
              }}
              label={btnTitle || t("confirm")}
              onPress={submit}
            />
            <DefaultButton
              style={{
                width: "100%",
                marginTop: 5
              }}
              textStyle={{
                ...Styled.context,
                color: Colors.textday
              }}
              onPress={() => {
                actionSheetRef.current.hide()
              }}
              label={t("cancel")}
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  )
}

export default PopupActionSheet
