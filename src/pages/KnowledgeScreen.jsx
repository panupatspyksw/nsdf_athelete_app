import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import {
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"
import { WebView } from "react-native-webview"
import { AppContext } from "../Context"
import { t } from "i18n-js"
import { Border, Styled } from "../Styled"
import SearchIcon from "../assets/SearchIcon.svg"
import BlueSearchIcon from "../assets/blueSearch.svg"
import Close from "../assets/close.svg"
import { BigNewsCard, NewsCard } from "../components/NewsCard"
import { api } from "../api"
import useAsyncStorage from "../useAsync"
import _ from "lodash"
import dayjs from "dayjs"
import Header from "../components/Header"
import { useFocusEffect } from "@react-navigation/native"

export default function KnowledgeScreen({ navigation }) {
  const { user } = useContext(AppContext)
  const [result, setResult] = useState([])
  const [newsList, setNews] = useState([])
  const [history = [], setHistory] = useAsyncStorage("searchHistory")
  const [text, setText] = useState("")
  const animatedHeight = useRef(new Animated.Value(0)).current
  const [page, setPage] = useState(1)
  const [height, setHeight] = useState(0)

  // handle webview
  const [currentUrl, setCurrentUrl] = useState("")

  const [url, setUrl] = useState()
  const isWebView = true

  const webURl = process.env.REACT_APP_WEB_KNOWLEDGE

  const runFirst = `
  document.getElementsByClassName('td-header-template-wrap')[0].style.display = 'none'
  document.getElementsByClassName('td-page-header td-container')[0].style.display = 'none'
  document.getElementsByClassName('td-crumb-container')[0].style.display = 'none'
  document.getElementsByClassName('td-category')[0].style.display = 'none'
  document.getElementsByClassName('td-footer-page td-footer-container td-container-wrap ')[0].style.display = 'none'
  `

  useFocusEffect(
    useCallback(() => {
      setUrl(webURl)
      return () => {
        setUrl(undefined)
      }
    }, [webURl])
  )

  const handleNavigationStateChange = (navState) => {
    setCurrentUrl(navState.url)
  }
  // handle webview

  useEffect(() => {
    api.get("/contents").then((res) => {
      setNews(res.data)
    })
  }, [])
  const searchNews = (value) => {
    const newHistory = new Map()
    history.forEach((i) => {
      newHistory.set(i.text, i)
    })

    newHistory.set(value, {
      text: value,
      when: dayjs().unix()
    })
    setHistory(Array.from(newHistory.values()))
    setPage(1)
    api
      .post("/contents", {
        page: 1,
        search: value
      })
      .then((res) => {
        setNews(res.data)
        expand(0)
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const expand = (_height) => {
    setHeight(_height)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF"
      }}
    >
      <View
        style={{
          flex: 1,
          paddingTop: 0,
          paddingHorizontal: isWebView ? 0 : 24
        }}
      >
        <Header
          arrow={currentUrl !== webURl}
          onPress={
            currentUrl !== webURl
              ? () => {
                  setUrl(webURl)
                  setCurrentUrl(webURl)
                }
              : null
          }
          navigation={navigation}
          title={t("knowledge")}
        />
        {isWebView ? (
          <WebView
            source={{
              uri: url
            }}
            injectedJavaScript={runFirst}
            onNavigationStateChange={handleNavigationStateChange}
            style={{ flex: 1 }}
          />
        ) : (
          <>
            <View style={{ overflow: "visible" }}>
              <View
                style={{
                  borderRadius: 24,
                  height: 38,
                  borderWidth: 0.5,
                  borderColor: "#D9E0FF",
                  backgroundColor: "#ffff",
                  ...Border.lightShadow,
                  elevation: 4,
                  paddingLeft: 20,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <SearchIcon />
                <TextInput
                  onFocus={() => {
                    expand(54 * (history.length > 4 ? 4 : history.length))
                  }}
                  autoCapitalize={"none"}
                  value={text}
                  onChangeText={(v) => {
                    expand(54 * (history.length > 4 ? 4 : history.length))

                    setText(v)
                  }}
                  autoCorrect={false}
                  style={{
                    marginLeft: 13,
                    height: "100%",
                    flex: 1
                  }}
                  placeholder={t("search")}
                  onEndEditing={(e) => {
                    if (e.nativeEvent.text !== "") {
                      searchNews(e.nativeEvent.text)
                    }
                  }}
                />
                <TouchableOpacity
                  style={{
                    height: "100%",
                    width: 30,
                    justifyContent: "center",
                    alignItems: "flex-end",
                    paddingRight: 22
                  }}
                  onPress={() => {
                    setText("")
                    expand(0)
                    searchNews("")
                  }}
                >
                  <Close />
                </TouchableOpacity>
              </View>
            </View>
            <Animated.View
              style={{
                marginTop: 8,
                borderWidth: height > 0 ? 0.5 : 0,
                borderColor: "#D9E0FF",
                borderRadius: 24,
                height: height,
                overflow: "hidden",
                justifyContent: "flex-start"
              }}
            >
              <ScrollView>
                {_.orderBy(history, ["when"], ["desc"])
                  .filter((_value) => _value.text !== "")
                  .map((i, index) => {
                    console.log(i)
                    return (
                      i.text !== "" && (
                        <TouchableOpacity
                          onPress={() => {
                            setText(i.text)
                            searchNews(i.text)
                          }}
                        >
                          <View
                            style={{
                              height: 54,
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderBottomWidth: 0.3,
                              borderColor: "#D9E0FF",
                              paddingLeft: 22
                            }}
                          >
                            <BlueSearchIcon />
                            <Text>{i.text}</Text>
                            <TouchableOpacity
                              style={{
                                height: "100%",
                                width: 30,
                                justifyContent: "center",
                                alignItems: "flex-end",
                                paddingRight: 22,
                                paddingLeft: 22
                              }}
                              onPress={() => {
                                setHistory(
                                  i.filter((item) => item.when !== i.when)
                                )
                                expand(54 * (i.length > 4 ? 4 : i.length - 1))
                              }}
                            >
                              <Close />
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      )
                    )
                  })}
              </ScrollView>
            </Animated.View>
            <FlatList
              style={{
                overflow: "visible"
              }}
              data={newsList.list}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      height: 100,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        ...Styled.title
                      }}
                    >
                      {t("no_content")}
                    </Text>
                  </View>
                )
              }}
              renderItem={({ item, index }) => {
                if (index === 0) {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Read", { id: item.id })
                      }}
                    >
                      <BigNewsCard
                        title={item.title}
                        date={item.time}
                        view={item.hits}
                        uri={item?.image}
                      />
                    </TouchableOpacity>
                  )
                }
                return (
                  <TouchableOpacity
                    key={"news" + item.id}
                    onPress={() => {
                      navigation.navigate("Read", { id: item.id })
                    }}
                  >
                    <NewsCard
                      title={item.title}
                      date={item.time}
                      view={item.hits}
                      uri={item?.image}
                    />
                  </TouchableOpacity>
                )
              }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  )
}
