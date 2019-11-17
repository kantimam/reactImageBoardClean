import  {combineReducers} from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';
import uiReducer from './uiReducer';


export default combineReducers({
    posts: postReducer,
    user: userReducer,
    ui: uiReducer
})