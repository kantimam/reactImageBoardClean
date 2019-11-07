import axios from 'axios';
import {LOGIN, LOGOUT} from './types';
const BASEURL = process.env.REACT_APP_BE_URL

export const logInUser = (email, password) => dispatch => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    axios.post(`${BASEURL}/login`, formData/* , {credentials: true} */)
        .then(res =>
            dispatch({
                type: LOGIN,
                payload: res.data
            }).then).catch(error => {
            window.alert("failure")
            console.log(error)
        })
}