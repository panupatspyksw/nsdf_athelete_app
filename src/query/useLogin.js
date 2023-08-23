const { useMutation } = require("@tanstack/react-query")
const { login } = require("../apiNew")

const useLogin = () => {
  const { data, mutateAsync } = useMutation(login, {
    retry: false
  })

  return {
    mutateLogin: mutateAsync,
    response: data
  }
}

export default useLogin
