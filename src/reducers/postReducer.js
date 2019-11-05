import {GET_POST, GET_NEW_POSTS} from '../actions/types';

const initialState={
    items: [],
    item: {}
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_POST: 
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}