import {GET_POST, GET_NEW_POSTS, SEARCH_POSTS, GET_USER_POSTS, GET_FAVORITE_POSTS, SET_PREVIEW} from '../actions/types';

const initialState={
    user: [],
    search: [],
    new: [],
    current: {},
    preview: []
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
        case SEARCH_POSTS:
            console.log(action)
            return {
                ...state,
                search: action.payload
            }
        case GET_USER_POSTS:
            return {
                ...state,
                user: action.payload
            }
        case GET_FAVORITE_POSTS:
            return {
                ...state,
                favorite: action.payload
            }
        case SET_PREVIEW:
            return {
                ...state,
                preview: action.payload,
            }
        default:
            return state;
    }
}