import { Linking } from "react-native"
import ActionButton from "react-native-action-button"
import React from "react"
import ShareIcon from "../assets/shareIcon.svg"
import ShareLine from "../assets/shareLine.svg"
import ShareFace from "../assets/shareFace.svg"
import ShareIg from "../assets/shareIg.svg"
import ShareTiktok from "../assets/shareTiktok.svg"

const FloatSocialShare = () => {
  const SHARE_LINK = [
    {
      id: 1,
      icon: <ShareTiktok />,
      link: "https://www.tiktok.com/@nsdfthailand?is_from_webapp=1&sender_device=pc"
    },
    {
      id: 2,
      icon: <ShareIg />,
      link: "https://www.instagram.com/nsdfthailand/"
    },
    {
      id: 3,
      icon: <ShareFace />,
      link: "https://www.facebook.com/nsdf.or.th"
    },
    {
      id: 4,
      icon: <ShareLine />,
      link: "https://page.line.me/169ygenp?openQrModal=true"
    }
  ]

  return (
    <ActionButton
      buttonColor="#6EA6FA"
      size={48}
      renderIcon={() => <ShareIcon />}
    >
      {SHARE_LINK.map((_data) => (
        <ActionButton.Item
          key={_data.id}
          onPress={() => Linking.openURL(_data.link)}
          buttonColor="#ffffff"
        >
          <>{_data.icon}</>
        </ActionButton.Item>
      ))}
    </ActionButton>
  )
}

export default FloatSocialShare
