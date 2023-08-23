import axios from "axios"
const token = ""

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
})

export const getTournament = async ({ date, page, search }) => {
  return await axios
    .post(`${process.env.REACT_APP_BASE_API}/get-tournament`, {
      search: search || "",
      page: page || "1",
      date
    })
    .then((_res) => _res.data)
    .catch((_err) => _err)
}

export const checkOTP = async ({ member_id, otp }) => {
  return await axios
    .post(`${process.env.REACT_APP_BASE_API}/check-otp`, {
      member_id,
      otp
    })
    .then((_res) => _res.data)
    .catch((_err) => _err)
}

export const loginAPI = async ({ email, password }) => {
  return await api
    .post("/login", {
      email,
      password
    })
    .then((_res) => _res.data)
    .catch((_err) => _err)
}

export const changePassword = async ({
  userId,
  password,
  confirm_password
}) => {
  return await api
    .post(`change-password/${userId}`, {
      password,
      confirm_password
    })
    .then((_res) => _res.data)
    .catch((_err) => _err)
}

export const getResetPassword = async ({ email }) => {
  return await axios
    .post(`${process.env.REACT_APP_BASE_API}/get-reset-password`, {
      email
    })
    .then((_res) => _res.data)
    .catch((_err) => _err)
}

export const getAthletes = async (userId) => {
  return await api
    .get(`/get-athletes/${userId}`)
    .then((_res) => _res.data)
    .catch((_err) => _err)
}
