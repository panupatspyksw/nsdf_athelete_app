import React from "react"
import { View, TouchableOpacity } from "react-native"
import { Border } from "../Styled"
import { t } from "i18n-js"
import SearchIcon from "../assets/SearchIcon.svg"
import Close from "../assets/close.svg"
import { TextInput } from "react-native-gesture-handler"

const SearchComponent = ({
  onChangeText,
  value,
  onEndEditing,
  isFilterDate,
  onPress,
  style
}) => {
  return (
    <View
      style={{
        borderRadius: 24,
        height: 38,
        borderWidth: 0.5,
        borderColor: "#D9E0FF",
        backgroundColor: "#ffff",
        elevation: 4,
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        ...Border.cardColorDay,
        ...style
      }}
    >
      <SearchIcon />
      <TextInput
        autoCapitalize={"none"}
        onChangeText={onChangeText}
        value={value}
        autoCorrect={false}
        style={{
          marginLeft: 13,
          height: "100%",
          flex: 1
        }}
        onEndEditing={onEndEditing}
        placeholder={t("search")}
      />
      {value || isFilterDate ? (
        <TouchableOpacity
          style={{
            height: "100%",
            width: 40,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: 22,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20
          }}
          onPress={onPress}
        >
          <Close color="#4B4B4B" />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

export default SearchComponent
