import {GET_POST, GET_NEW_POSTS} from '../actions/types';

const initialState={
    loggedIn: false,
    token: null
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_POST:
            return {
                ...state,
                current: action.payload
            }
        case GET_NEW_POSTS:
            return {
                ...state,
                new: action.payload
            }
        default:
            return state;
    }
}