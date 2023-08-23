import { useEffect, useRef, useState } from "react"
import {
  getCheckRoleRequest,
  getNotification,
  getProfile,
  getUserType,
  requestRoleAthlete,
  requestRoleCoach
} from "./apiNew"
import services from "./axiosConfig"

const useProfileContext = () => {
  const [userProfile, setUserProfile] = useState()
  const [requestData, setRequestData] = useState()
  const [isNoti, setIsNoti] = useState()

  const actionErrorRef = useRef(null)

  const fetchUserProfile = async () => {
    await getProfile().then((_res) => {
      setUserProfile(_res.body)
    })
  }

  const postReqRole = async (type, args, setErrorSubTitle) => {
    if (type === 1) {
      await requestRoleAthlete(args)
        .then(
          async () =>
            await getProfile().then((_resp) => setUserProfile(_resp.body))
        )
        .catch((_err) => {
          setErrorSubTitle(_err.message)
          actionErrorRef.current?.show()
        })
    } else {
      await requestRoleCoach(args)
        .then(async (_res) => {
          await getProfile().then((_resp) => setUserProfile(_resp.body))
        })
        .catch((_err) => {
          setErrorSubTitle(_err.message)
          actionErrorRef.current?.show()
        })
    }
  }

  const fetchNotiData = async () => {
    const { body } = await getNotification()
    if (body) {
      const check = body.find((_val) => _val.status !== 2)
      setIsNoti(check)
    }
  }

  const fetchNotification = async (navigation) => {
    try {
      if (userProfile.requestStatusCode) {
        console.log("check")
        const response = await getCheckRoleRequest()
        setRequestData(response.body)
      }
      fetchNotiData()

      const updateProfile = async () => {
        const res = await getProfile()
        setUserProfile(res.body)
      }

      if (requestData.statusCode !== userProfile.requestStatusCode) {
        updateProfile()
        console.log("updateProfile")
        navigation.replace("HomeTab")
      }
    } catch (error) {
      // Handle error
    }
  }

  const handleFocus = () => {
    if (userProfile) {
      fetchNotification()
      fetchNotiData()
    }
  }

  const editProfile = (
    photo,
    createFormData,
    args,
    setIsError,
    actionSheetRef,
    setMsg
  ) => {
    services
      .put(
        "/client_users/profile",
        photo.assets ? createFormData(photo, { ...args }) : { ...args },
        {
          headers: {
            "Content-Type": photo.assets
              ? "multipart/form-data"
              : "application/json"
          }
        }
      )
      .then(async (_res) => {
        if (_res) {
          await getProfile().then((_resp) => setUserProfile(_resp.body))
          setIsError(false)
          setMsg(_res.data.message)
          actionSheetRef.current?.show()
        }
      })
      .catch((_err) => {
        setMsg(_err.data.message)
        setIsError(true)
        actionSheetRef.current?.show()
      })
  }

  const [userType, setUserType] = useState([])
  const fetchUserType = async () => {
    const response = await getUserType()
    if (response.status === 200) {
      setUserType(response.body)
    }
  }

  useEffect(() => {
    if (userType.length === 0) {
      fetchUserType()
    }
  }, [userType])

  useEffect(() => {
    let cleanup = false

    if (!cleanup) {
      if (!userProfile) {
        fetchUserProfile()
      }
    }

    return () => {
      cleanup = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile])

  return {
    user: userProfile,
    setUser: setUserProfile,
    actionErrorRef,
    postReqRole,
    fetchNotification,
    editProfile,
    handleFocus,
    requestData,
    isNoti,
    fetchNotiData
  }
}

export default useProfileContext
