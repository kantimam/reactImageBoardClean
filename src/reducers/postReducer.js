/* eslint-disable linebreak-style */
import {
    GET_POST,
    SEARCH_POSTS,
    SET_PREVIEW,
    NEXT_NEW_POSTS,
    LOAD_NEXT_PAGE,
    LOAD_PREV_PAGE,
    GET_POSTS,
} from '../actions/types';
import {
    metaProperty
} from '@babel/types';

const initialState = {
    user: [],
    search: [],
    new: [],
    popular: [],
    favorite: [],

    userPosts: [],
    searchPosts: [],
    newPosts: [],
    popularPosts: [],
    favoritePosts: [],

    current: {},
    preview: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POST:
            return {
                ...state,
                current: action.payload,
            };
        case GET_POSTS:
            const {
                data, ...rest
            } = action.payload;
            return {
                ...state,
                /* add the paginationdata to the bucket "new" for example */
                [action.bucket]: [...state[action.bucket], rest],
                /* add the actual posts to newPosts */
                [`${action.bucket}Posts`]: data
            };

        case SEARCH_POSTS:
            console.log(action);
            return {
                ...state,
                search: [action.payload],
            };

        case SET_PREVIEW:
            return {
                ...state,
                preview: action.payload,
            };
        case NEXT_NEW_POSTS:
            return {
                ...state,
                /* a1.splice(2, 0, ...a2); */
                new: {
                    ...action.payload,
                    data: state.new.data.splice(action.insertPos, 0, ...action.payload.data),
                },
            };
        case LOAD_NEXT_PAGE:
            return {
                ...state,
                [action.bucket]: [...state[action.bucket], action.payload],
            };
        case LOAD_PREV_PAGE:
            return {
                ...state,
                [action.bucket]: [action.payload, ...state[action.bucket]],
            };
        default:
            return state;
    }
}