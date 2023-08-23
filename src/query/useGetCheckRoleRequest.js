import { useQuery } from "@tanstack/react-query"
import { getCheckRoleRequest } from "../apiNew"
import { useContext, useEffect, useRef } from "react"
import { AppContext } from "../Context"
import useGetProfile from "./useGetProfile"

const useGetCheckRoleRequest = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getCheckRoleRequest"],
    queryFn: getCheckRoleRequest,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: false,
    keepPreviousData: false
  })

  return {
    requestData: data?.body,
    isLoading,
    error
  }
}

export default useGetCheckRoleRequest
