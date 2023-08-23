import { Text, TouchableOpacity, View } from "react-native"
import { Colors, Styled } from "../Styled"
import React from "react"
import ActionSheet from "react-native-actions-sheet"
import ConfirmIcon from "../assets/passChange.svg"
import SuccessIcon from "../assets/successPopup.svg"
import Close from "../assets/close.svg"

const PopupSheetSuccess = ({
  actionSheetRef,
  title,
  subTitle,
  onClose,
  isClose = false
}) => {
  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled={true}
      snapPoints={0}
      closeOnTouchBackdrop
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
          height: "100%",
          alignItems: "center"
        }}
      >
        <View
          style={{
            alignItems: "center",
            zIndex: 1,
            paddingTop: "100%",
            position: "absolute",
            width: "50%"
          }}
        >
          {isClose ? <ConfirmIcon /> : <SuccessIcon />}
        </View>
        <View
          style={{
            borderRadius: 20,
            marginTop: "65%",
            marginBottom: "70%",
            height: 200,
            backgroundColor: "#FFFFFF",
            flex: 1,
            padding: 28,
            width: "80%"
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
              top: -10,
              right: -10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current?.hide()
                onClose && onClose()
              }}
            >
              <View
                style={{
                  padding: 10
                }}
              >
                <Close />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "100%",
              marginTop: 20
            }}
          >
            <Text
              style={{
                ...Styled.bigHead,
                color: Colors.spotlightDay,
                fontWeight: "600",
                textAlign: "center"
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                ...Styled.context,
                color: Colors.textday,
                fontWeight: "600",
                textAlign: "center"
              }}
            >
              {subTitle}
            </Text>
          </View>
        </View>
      </View>
    </ActionSheet>
  )
}

export default PopupSheetSuccess
