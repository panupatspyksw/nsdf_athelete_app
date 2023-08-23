import { useCallback, useEffect, useState } from "react"
import {
  getOrganize,
  getSelectData,
  getSelectPosition,
  getTrainingType,
  getUserType
} from "./apiNew"

const useSelectContext = () => {
  const [userType, setUserType] = useState([])
  const [userId, setUserId] = useState(0)
  const [org, setOrg] = useState([])
  const [pos, setPos] = useState([])
  const [selectData, setSelectData] = useState([])
  const [selectDataAll, setSelectDataAll] = useState([])
  const [trainingType, setTrainingType] = useState([])

  const onSetUserId = useCallback((id) => {
    setUserId(id)
  }, [])

  //   userType
  useEffect(() => {
    const fetchUserType = async () => {
      const response = await getUserType()
      if (response.status === 200) {
        const convert = response.body.map((i) => {
          return {
            id: i.value,
            title: i.label
          }
        })
        if (convert) setUserType(convert)
      }
    }
    fetchUserType()
  }, [])

  //   position
  useEffect(() => {
    const fetchData = async () => {
      const response = await getSelectPosition(userId)
      if (response.status === 200) {
        const convert = response.body.map((i) => {
          return {
            id: i.value,
            title: i.label
          }
        })
        if (convert) setPos(convert)
      }
    }

    fetchData()
  }, [userId])

  //   organization
  useEffect(() => {
    const fetchOrg = async () => {
      const response = await getOrganize(userId)
      if (response.status === 200) {
        const convert = response.body.map((i) => {
          return {
            id: i.value,
            title: i.label
          }
        })
        if (convert) setOrg(convert)
      }
    }
    fetchOrg()
  }, [userId])

  //   traning type
  useEffect(() => {
    const fetchTtype = async () => {
      const response = await getTrainingType()
      if (response.status === 200) {
        const convert = response.body.map((i) => {
          return {
            id: i.value,
            title: i.label
          }
        })
        if (convert) setTrainingType(convert)
      }
    }
    fetchTtype()
  }, [])

  //   select data
  useEffect(() => {
    const fetchResSelect = async () => {
      const resSelect = await getSelectData()
      if (resSelect.status === 200) {
        const convert = await resSelect.body.status.map((i) => {
          return {
            id: i.value,
            title: i.label
          }
        })
        if (convert) setSelectData(convert)
      }
    }
    fetchResSelect()
  }, [])

  useEffect(() => {
    const fetchResSelectAll = async () => {
      const resSelect = await getSelectData()
      if (resSelect.status === 200) {
        setSelectDataAll(resSelect.body)
      }
    }
    fetchResSelectAll()
  }, [])

  return {
    userType,
    org,
    pos,
    onSetUserId,
    trainingType,
    selectDataAll,
    selectData
  }
}

export default useSelectContext
