import {GET_POST, GET_NEW_POSTS} from '../actions/types';

const initialState={
    new: [],
    current: {}
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_POST: 
            return {
                ...state,
                current: action.payload
            }
        case GET_NEW_POSTS:
            console.log(action.payload)
            return {
                ...state,
                new: action.payload
            }
        default:
            return state;
    }
}