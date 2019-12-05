import {
    GET_POST,
    GET_NEW_POSTS,
    GET_POPULAR_POSTS,
    SEARCH_POSTS,
    GET_USER_POSTS,
    GET_FAVORITE_POSTS,
    SET_PREVIEW,
    NEXT_NEW_POSTS,
    PREV_NEW_POSTS,
    NEXT_SEARCH_POSTS,
    PREV_SEARCH_POSTS,
    NEXT_POPULAR_POSTS,
    PREV_POPULAR_POSTS,
    NEXT_FAVORITE_POSTS,
    PREV_FAVORITE_POSTS,
    NEXT_USER_POSTS,
    PREV_USER_POSTS
} from '../actions/types';

const initialState = {
    user: [],
    search: [],
    new: [],
    popular: [],
    current: {},
    preview: []
}

export default function (state = initialState, action) {
    switch (action.type) {
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
                case GET_POPULAR_POSTS:
                    return {
                        ...state,
                        popular: action.payload
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
                                case NEXT_NEW_POSTS:
                                    return {
                                        ...state,
                                        new: {...action.payload, data: [...state.new.data, ...action.payload.data]}
                                    }
                                    default:
                                        return state;
    }
}