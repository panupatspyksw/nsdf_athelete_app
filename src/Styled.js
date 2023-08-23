import { StyleSheet } from "react-native"

const fontFamily = "NotoSansThai-Regular"
const fontBold = "NotoSansThai-Bold"

export const Colors = {
  gray3: "#828282",
  main: "#63A1FF",
  greenDay: "#59D1A6",
  greenNight: "#30DA9D",
  palegreen: "#8AE0CB",
  redday: "#FF7D7E",
  rednight: "#FF6263",
  orange: "#FF9559",
  yellow: "#FFD859",
  titleday: "#222222",
  titlenight: "#FFFFFF",
  textday: "#4B4B4B",
  textNight: "#E9E9E9",
  cardday: "#FFFFFF",
  cardnight: "#0D1F6D",
  spotlightDay: "#5191F2",
  spotlightNight: "#4299Ff",
  softDisableDay: "#F2F5FF",
  softDisableNight: "#1D3185",
  detailTextDay: "#BFBFBF",
  detailTextNight: "#7685C5",
  placeholderDay: "#D9D9D9",
  placeholderNight: "#4C5B9B",
  disableDay: " #F4F4F4",
  disableNight: "#0A1657",
  linear: "linear-gradient(90deg, #5081FF 0%, #5A88FE 0.01%, #6EA6FA 100%);",
  backgroundColorLight: "#fcfcfc",
  backgroundColorDark: "#fcfcfc"
}

export const Gradient = {
  blue: ["#5081FF", "#5A88FE", "#6EA6FA"]
}

export const Border = {
  lightShadow: {
    elevation: 5,
    shadowColor: "#7aafff",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20
  },
  cardColorDay: {
    borderWidth: 0.25,
    borderColor: "#7aafff",
    backgroundColor: "#FFF"
  }
}

export const Font = StyleSheet.create({
  bigHead: {
    fontFamily: fontBold,
    fontWeight: 600,
    fontSize: 24,
    lineHeight: 36
  },
  head: {
    fontFamily: fontBold,
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 27
  },
  title: {
    fontFamily: fontBold,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24
  },
  contextBold: {
    fontFamily: fontBold,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 21
  },
  context: {
    fontFamily: fontFamily,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24
  },
  smallBold: {
    fontFamily: fontBold,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 18
  },
  small: {
    fontFamily: fontFamily,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 18
  },
  detail: {
    fontFamily: fontFamily,
    fontWeight: 400,
    fontSize: 8,
    lineHeight: 12
  }
})

export const Styled = StyleSheet.create({
  bigHead: {
    fontSize: 24,
    fontFamily
  },
  head: {
    fontSize: 18,
    fontFamily
  },
  title: {
    fontSize: 16,
    fontFamily
  },
  contextBold: {
    fontSize: 16,
    fontFamily: fontBold
  },
  context: {
    fontSize: 16,
    fontFamily
  },
  small: {
    fontSize: 12,
    fontFamily
  },
  smallBold: {
    fontFamily: fontBold
  },
  normal: {
    fontFamily
  },
  bold: {
    fontFamily: "NotoSansThai-Bold"
  }
})
