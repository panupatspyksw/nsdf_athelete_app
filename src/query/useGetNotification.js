import { useQuery } from "@tanstack/react-query"
import { getNotification } from "../apiNew"
import PushNotification from "@react-native-community/push-notification-ios"
import { useContext } from "react"
import { AppContext } from "../Context"

const useGetNotification = () => {
  const { user } = useContext(AppContext)

  const { data, isLoading, error } = useQuery({
    queryKey: ["getNotification"],
    queryFn: getNotification,
    retry: true,
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    enabled: !!user,
    onSuccess(_res) {
      if (_res) {
        const check = _res.find((_val) => _val.status === 2)
        if (!check) {
          PushNotification.localNotification({
            channelId: "default",
            message: _res.msg,
            title: _res.msg
          })
        }
      }
    }
  })

  return {
    notiData: data?.body,
    isLoading,
    error
  }
}

export default useGetNotification
