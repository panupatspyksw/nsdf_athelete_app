import { requestRoleAthlete } from "../apiNew"
const { useMutation } = require("@tanstack/react-query")

const useRequestRoleAthlete = () => {
  const { data, mutateAsync } = useMutation(requestRoleAthlete, {
    retry: false
  })

  return {
    mutateRequestRoleAthlete: mutateAsync,
    response: data
  }
}

export default useRequestRoleAthlete
