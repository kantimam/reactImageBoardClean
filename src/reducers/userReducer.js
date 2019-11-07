import {LOGIN, GET_NEW_POSTS} from '../actions/types';

const initialState={
    user: {},
    token: null
}

export default function(state=initialState, action){
    switch(action.type){
        case LOGIN:
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