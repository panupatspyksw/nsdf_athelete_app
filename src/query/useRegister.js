import { useMutation } from "@tanstack/react-query"
import { signup } from "../apiNew"

const useRegister = () => {
  const { data, mutateAsync } = useMutation(signup, {
    retry: false
  })

  return {
    mutateRegister: mutateAsync,
    response: data
  }
}

export default useRegister
