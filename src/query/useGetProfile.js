import { useMutation } from "@tanstack/react-query"
import { getProfile } from "../apiNew"

const useGetProfile = () => {
  const { data, isLoading, error, mutateAsync } = useMutation({
    mutationKey: ["getProfile"],
    mutationFn: getProfile,
    retry: false,
    keepPreviousData: false
  })

  return {
    profileData: data?.body,
    isLoading,
    error,
    mutateGetProfile: mutateAsync
  }
}

export default useGetProfile
