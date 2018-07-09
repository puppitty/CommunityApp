import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt_decode from 'jwt-decode'
import setAuthToken from './../utils/setAuthToken';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(regUser => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login Get User Token
export const loginUser = loginData => dispatch => {
  axios
    .post("/api/users/login", loginData)
    .then(user => {
        //save to localStorage
        const {token}=user.data
        //set token to localSttorage
        localStorage.setItem('jwtToken', token)
        // set Token to authHeader
        setAuthToken(token)
        //Decode the token
        const decoded = jwt_decode(token)
        //Set current user
        dispatch({
            type:SET_CURRENT_USER,
            payload:decoded
        })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
    return ({
        type:SET_CURRENT_USER,
        payload:decoded
    })
}

export const logoutUser = () => dispatch => {
    //remove token from local storage and set AuthToken accordingly
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    //setCurrent user to {} and is Authenticated to false
    dispatch(setCurrentUser({}))
}