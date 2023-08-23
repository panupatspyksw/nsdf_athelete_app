import React from "react"
import { View, Text, Platform } from "react-native"
import dayjs from "dayjs"
import { BackButton } from "../components/Button"
import { Colors } from "../Styled"

const buddhistEra = require("dayjs/plugin/buddhistEra")
const localeData = require("dayjs/plugin/localeData")
const localizedFormat = require("dayjs/plugin/localizedFormat")
const customParseFormat = require("dayjs/plugin/customParseFormat")
dayjs.extend(buddhistEra)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(customParseFormat)

const Header = ({
  arrow = false,
  navigation,
  title,
  rightSection,
  onPress
}) => {
  return (
    <View
      style={{
        marginBottom: 20,
        paddingTop: Platform.OS === "android" ? 30 : 0,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24
      }}
    >
      <View
        style={{
          flex: 1
        }}
      >
        {arrow && (
          <BackButton
            navigation={navigation}
            onPress={onPress}
          />
        )}
      </View>
      {title && (
        <View>
          <Text
            style={{
              fontFamily: "NotoSansThai-Bold",
              fontWeight: "600",
              fontSize: 18,
              color: Colors.titleday
            }}
          >
            {title}
          </Text>
        </View>
      )}
      {/* filter */}
      {rightSection ? (
        rightSection
      ) : (
        <View
          style={{
            flex: 1
          }}
        />
      )}
    </View>
  )
}

export default Header
