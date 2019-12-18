import {LOGIN, GET_USER_DATA, LOGOUT} from '../actions/types';

const initialState={
    user: {},
    token: null,
    loggedIn: false
}

export default function(state=initialState, action){
    switch(action.type){
        case LOGIN:
            return action.payload?
            {
                ...state,
                token: action.payload,
                loggedIn: true
            }:
            state
        case GET_USER_DATA:
            console.log(action)
            return {
                ...state,
                user: action.payload,
                token: action.token,
                loggedIn: true
            }
        case LOGOUT:
            return {
                ...state,
                user: {},
                token: null,
                loggedIn: false
            }
        default:
            return state;
    }
}