import axios from 'axios';
import {
    LOGIN,
    LOGOUT,
    GET_USER_DATA
} from './types';
const BASEURL = process.env.REACT_APP_BE_URL

export const logInUser = (email, password) => dispatch => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    axios.post(`${BASEURL}/login`, formData)
        .then(res => {
            if (res.data.token) {
                dispatch(getUserData(res.data.token))
            }
        }).catch(error => {
            window.alert("failure")
            console.log(error)
        })
}

export const getUserData = (token) => dispatch => {
    axios.get(`${BASEURL}/user`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res =>
            dispatch({
                type: GET_USER_DATA,
                payload: res.data.user,
                token: token
            })).catch(error => {
            window.alert("failure")
            console.log(error)
        })
}