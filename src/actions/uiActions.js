import {TOGGLE_FULLSCREEN} from './types';

export const toggleFullscreen = () => dispatch => {
    dispatch({
        type: TOGGLE_FULLSCREEN,
    })
  }