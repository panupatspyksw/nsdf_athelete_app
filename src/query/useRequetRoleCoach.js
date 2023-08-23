import { requestRoleCoach } from "../apiNew"
const { useMutation } = require("@tanstack/react-query")

const useRequestRoleCoach = () => {
  const { data, mutateAsync } = useMutation(requestRoleCoach, {
    retry: false
  })

  return {
    mutateRequestRoleCoach: mutateAsync,
    response: data
  }
}

export default useRequestRoleCoach
