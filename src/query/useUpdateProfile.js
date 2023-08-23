import { updateProfile } from "../apiNew"
const { useMutation } = require("@tanstack/react-query")

const useUpdateProfile = () => {
  const { data, mutateAsync } = useMutation(updateProfile, {
    retry: false
  })

  return {
    mutateUpdateProfile: mutateAsync,
    response: data
  }
}

export default useUpdateProfile
