import React, { useContext, useEffect, useState } from "react"
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { AppContext } from "../Context"
import { t } from "i18n-js"
import { Colors, Styled } from "../Styled"
import { useWindowDimensions } from "react-native"
import RenderHtml from "react-native-render-html"
import ShareIcon from "../assets/menu/share.svg"
import Share from "react-native-share"
import { api } from "../api"
import ViewIcon from "../assets/ViewIcon.svg"
import FastImage from "react-native-fast-image"
import Header from "../components/Header"

const removeTags = (str) => {
  str = str.toString()
  return str.replace(/(<([^>]+)>)/gi, "")
}

export default function ReadNews({ navigation, route }) {
  const id = route.params.id
  const { user } = useContext(AppContext)
  const [content, setContent] = useState(null)
  useEffect(() => {
    if (!user) {
      navigation.push("LoginScreen")
    }
    if (id) {
      api.get("contents/view/" + id).then((res) => {
        setContent(res.data.item)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (content) {
    console.log(removeTags(content.description))
  }

  const { width } = useWindowDimensions()
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1,
        marginBottom: 10
      }}
    >
      <Header
        arrow
        navigation={navigation}
        title={t("knowledge")}
      />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 24,
            flex: 1
          }}
        >
          <View
            style={{
              alignItems: "center"
            }}
          >
            <FastImage
              source={{
                uri: content?.image
              }}
              style={{
                width: "100%",
                height: 184,
                borderRadius: 18,
                marginBottom: 24
              }}
              resizeMode={"cover"}
            />
          </View>
          <Text
            style={{
              marginTop: 6,
              ...Styled.contextBold,
              color: Colors.titleday
            }}
          >
            {content?.title ?? "No title"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center"
            }}
          >
            <Text
              style={{
                ...Styled.small,
                color: Colors.detailTextDay
              }}
            >
              {content?.time}
            </Text>
            <View
              style={{
                borderWidth: 0.5,
                height: 12,
                width: 0,
                borderColor: Colors.placeholderDay,
                marginHorizontal: 8
              }}
            />
            <ViewIcon />
            <Text
              style={{
                marginLeft: 4,
                ...Styled.small,
                color: Colors.detailTextDay
              }}
            >
              {content?.hits ?? 0}
            </Text>
          </View>
          <RenderHtml
            contentWidth={width - 48}
            source={{
              html: content?.description
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 10,
          marginRight: 26,
          marginBottom: 26
        }}
      >
        {console.log(content)}
        <TouchableOpacity
          onPress={() => {
            Share.open({
              title: content?.title,
              message: content?.title
            })
          }}
        >
          <ShareIcon width={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
