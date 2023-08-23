import services from "./axiosConfig"

/**
 * post API
 */
export const signup = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/client_users/signup", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const requestOTPRegister = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/client_users/OTPemail", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const confirmOTPRegister = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/client_users/OTPemailconfirm", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const login = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/client_users/login", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const requestRoleAthlete = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/requestrole/athlete", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const requestRoleCoach = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/requestrole/coach", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const requestOTP = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/client_users/OTPpassword", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const requestChangePassWithOTP = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/client_users/OTPchangepassword", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const changePassword = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/client_users/changepassword", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const sendCoachRequest = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/coach/connects", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const coachCreateTrainingList = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/coach/training_list", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const coachAssignment = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .post("/coach/assignment", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}
/** ------------------ */

/**
 * get API
 */
export const getSportType = async () => {
  return new Promise((resolve, reject) => {
    services
      .get("/public/sporttype")
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getProfile = async () => {
  return new Promise((resolve, reject) => {
    services
      .get("/client_users/profile")
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getCheckRoleRequest = async () => {
  return new Promise((resolve, reject) => {
    services
      .get("/requestrole/myrequest")
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getSelectData = async () => {
  return new Promise((resolve, reject) => {
    services
      .get("/public/reqRoleAthlelte")
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getNotification = async () => {
  return new Promise((resolve, reject) => {
    services
      .get("/client_users/notification")
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getUserType = async () => {
  return new Promise((resolve, reject) => {
    services
      .get("/public/client_user_type")
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getOrganize = async (userTypeId) => {
  return new Promise((resolve, reject) => {
    services
      .get("/public/organization_by_usertype", {
        params: {
          usertype: userTypeId
        }
      })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getTrainingType = async () => {
  return new Promise((resolve, reject) => {
    services
      .get("/public/training_type")
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getTrainingAccident = async () => {
  return new Promise((resolve, reject) => {
    services
      .get("/public/training_accident")
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getSelectPosition = async (userTypeId) => {
  return new Promise((resolve, reject) => {
    services
      .get("/public/client_user_position_by_usertype", {
        params: {
          usertype: userTypeId
        }
      })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getPostActivity = async (query) => {
  return new Promise((resolve, reject) => {
    services
      .get("/post", {
        params: {
          post_type: 2,
          ...query
        }
      })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getPostById = async (id) => {
  return new Promise((resolve, reject) => {
    services
      .get(`/post/${id}`)
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getAllAthete = async ({ limit, search, offset }) => {
  return new Promise((resolve, reject) => {
    services
      .get(`/coach/connects`, {
        params: { limit: limit, search: search, offset: offset }
      })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getThatCoachAthlete = async () => {
  return new Promise((resolve, reject) => {
    services
      .get("/coach/trained_athletes")
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getThatCoachAthleteById = async (id) => {
  return new Promise((resolve, reject) => {
    services
      .get(`/coach/trained_athletes/${id}`)
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getMyTrainingList = async () => {
  return new Promise((resolve, reject) => {
    services
      .get(`/athlete/assignment`)
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getMyTrainingListById = async (id) => {
  return new Promise((resolve, reject) => {
    services
      .get(`/athlete/assignment/${id}`)
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getCoachTrainingList = async () => {
  return new Promise((resolve, reject) => {
    services
      .get(`/coach/training_list`)
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

export const getMyTrainingStats = async () => {
  return new Promise((resolve, reject) => {
    services
      .get(`/athlete/stats`)
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}

/** ------------------ */

/**
 * Put
 */
export const updateProfile = async (data) => {
  return new Promise((resolve, reject) => {
    services
      .put("/client_users/profile", { ...data })
      .then((_res) => resolve(_res.data))
      .catch((_err) => reject(_err.response.data))
  })
}
/** ------------------ */
