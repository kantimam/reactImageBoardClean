import {
  GET_POST,
  GET_NEW_POSTS,
  GET_POPULAR_POSTS,
  SEARCH_POSTS,
  GET_FAVORITE_POSTS,
  GET_USER_POSTS,
  SET_PREVIEW
} from './types';
import axios from 'axios';
const BASEURL = process.env.REACT_APP_BE_URL



export const getPostWithPreview = (id, bucket) => {
  return (dispatch, getState) => {
    const {posts} = getState();
    if (posts[bucket]) {
      let postPreview = [];
      if (posts[bucket].data && posts[bucket].data.length > 0) {
        const currentPosts = posts[bucket].data;
        const postId = currentPosts.findIndex((e) => e.id == id);
        postPreview = [currentPosts[postId - 2], currentPosts[postId - 1], currentPosts[postId], currentPosts[postId + 1], currentPosts[postId + 2]];
      }
      dispatch({
        type: SET_PREVIEW,
        payload: postPreview,
      })
      if(bucket==="search") return dispatch(searchPosts(id));
      dispatch(getPost(id));
    }else{
      console.log("please check your route")
    }
  }
}

export const getPost = (id) => dispatch => {
  console.log("get was called")
  axios(`${BASEURL}/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )



  /* getCurrentPost=(id)=>{
    this.getPost(id, 'posts')
    .then(post=>{
      this.setState({
        post:post,
        favorite: post.users_with_favorite,
        vote:  post.vote,
        rating: post.rating,
        postId:this.props.match.params.postId,
        prev: post.prev || [],
        next: post.next || []
      })
        this.serverRating=post.rating
      }).catch(error=>this.handleError(error))
    
  } */
}




export const getNewPosts = () => dispatch => {
  axios(`${BASEURL}/posts`)
    .then(res =>
      dispatch({
        type: GET_NEW_POSTS,
        payload: res.data
      })
    )
}

export const getPopularPosts = () => dispatch => {
  axios(`${BASEURL}/posts`)
    .then(res =>
      dispatch({
        type: GET_NEW_POSTS,
        payload: res.data
      })
    )
}
export const getFavoritePosts = () => dispatch => {
  axios(`${BASEURL}/posts`)
    .then(res =>
      dispatch({
        type: GET_NEW_POSTS,
        payload: res.data
      })
    )
}
export const getUserPosts = () => dispatch => {
  axios(`${BASEURL}/posts`)
    .then(res =>
      dispatch({
        type: GET_NEW_POSTS,
        payload: res.data
      })
    )
}


export const getNextPosts = () => dispatch => {
  axios(`${BASEURL}/posts`)
    .then(res =>
      dispatch({
        type: GET_NEW_POSTS,
        payload: res.data
      })
    )
}


export const searchPosts = (searchString, searchUrl = "search") => dispatch => {
  axios.get(`${BASEURL}/posts/${searchUrl}/${searchString}`)
    .then(res =>
      dispatch({
        type: SEARCH_POSTS,
        payload: res.data
      }))
}