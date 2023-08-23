import { useFocusEffect } from "@react-navigation/native"
import React, { useCallback, useState } from "react"
import WebView from "react-native-webview"
import { t } from "i18n-js"
import Header from "../components/Header"
import { SafeAreaView } from "react-native"

const NewsAnnouce = ({ navigation }) => {
  const [url, setUrl] = useState()
  const webURl = process.env.REACT_APP_WEB_NEWS

  const runFirst = `
  document.getElementsByClassName('td-header-template-wrap')[0].style.display = 'none'
  `

  useFocusEffect(
    useCallback(() => {
      setUrl(webURl)
      return () => {
        setUrl(undefined)
      }
    }, [webURl])
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        arrow
        navigation={navigation}
        title={t("news")}
      />
      <WebView
        source={{
          uri: url
        }}
        injectedJavaScript={runFirst}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  )
}

export default NewsAnnouce
