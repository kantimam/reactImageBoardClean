import {TOGGLE_FULLSCREEN} from '../actions/types';

const initialState={
    fullscreen: false
}

export default function(state=initialState, action){
    switch(action.type){
        case TOGGLE_FULLSCREEN:
            return {
                ...state,
                fullscreen: !state.fullscreen
            }
        default:
            return state;
    }
}