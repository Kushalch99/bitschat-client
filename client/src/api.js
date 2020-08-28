import axios from 'axios'

export const login = async function (userData) {
  var res =  await axios.post('/login',userData)
  // console.log("api call ",res)
  return res
}
export const signup = async function (newUserData) {
  var res = await axios.post('/signup',newUserData)
  return res
}

export const getMyDetails = async function () {
  var res = await axios.get('user/me')
  console.log("api get user",res)
  return res
}

// module.exports = { login, signup }
