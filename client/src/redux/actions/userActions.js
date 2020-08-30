import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from '../types'
import {
  login,
  signup,
  getMyDetails,
  updateMyDetails,
  uploadProfileImage
} from '../../api'
import axios from 'axios'

export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI })
  try {
    var res = await login(userData)
    setAuthorizationHeader(res.data.token)
    await dispatch(getUserData())
    dispatch({
      type: CLEAR_ERRORS
    })
    history.push('/')
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  }
}

export const signupUser = (newUserData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI })
  try {
    await signup(newUserData)
    dispatch(loginUser(newUserData, history))
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  }
}
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('AccessToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({
    type: SET_UNAUTHENTICATED
  })
}
export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER })
  try {
    var res = await getMyDetails()
    dispatch({
      type: SET_USER,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const uploadImage = (formData) => async (dispatch) => {
  dispatch({ type: LOADING_USER })
  try {
    await uploadProfileImage(formData)
    dispatch(getUserData())
  } catch (err) {
    console.log(err)
  }
}

export const editUserDetails = (userDetails) => async (dispatch) => {
  dispatch({ type: LOADING_USER })
  try {
    await updateMyDetails(userDetails)
    dispatch(getUserData())
  } catch (err) {
    console.log(err)
  }
}

const setAuthorizationHeader = (token) => {
  var AccessToken = `Bearer ${token}`
  localStorage.setItem('AccessToken', AccessToken)
  axios.defaults.headers.common['Authorization'] = AccessToken
}
