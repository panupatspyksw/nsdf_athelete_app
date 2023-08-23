import { useQuery } from "@tanstack/react-query"
import { getSelectData } from "../apiNew"

const useGetSelectData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getSelectData"],
    queryFn: getSelectData,
    retry: false,
    keepPreviousData: false,
    refetchInterval: false,
    refetchOnWindowFocus: false
  })

  return {
    selectData: data?.body,
    isLoading,
    error
  }
}

export default useGetSelectData
