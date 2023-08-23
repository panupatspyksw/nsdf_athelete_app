import { View, Text } from "react-native"
import React from "react"
import PainIcon from "../assets/pain.svg"
import { Colors, Font } from "../Styled"

const PainComp = ({ ac1, ac2, ac3 }) => {
  return (
    <View style={{ alignItems: "center", flexDirection: "row" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PainIcon />
        <Text style={{ ...Font.smallBold, color: Colors.titleday }}>
          ข้อเท้าพลิก
        </Text>
        <Text style={{ ...Font.small, color: Colors.detailTextDay }}>
          {ac1} ครั้ง
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PainIcon />
        <Text style={{ ...Font.smallBold, color: Colors.titleday }}>
          กล้ามเนื้อฉีก
        </Text>
        <Text style={{ ...Font.small, color: Colors.detailTextDay }}>
          {ac2} ครั้ง
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PainIcon />
        <Text style={{ ...Font.smallBold, color: Colors.titleday }}>ฟกช้ำ</Text>
        <Text style={{ ...Font.small, color: Colors.detailTextDay }}>
          {ac3} ครั้ง
        </Text>
      </View>
    </View>
  )
}

export default PainComp
