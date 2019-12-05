import {
  GET_POST,
  GET_NEW_POSTS,
  GET_POPULAR_POSTS,
  SEARCH_POSTS,
  GET_FAVORITE_POSTS,
  GET_USER_POSTS,
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
} from './types';
import axios from 'axios';
const BASEURL = process.env.REACT_APP_BE_URL



export const getPostWithPreview = (id, bucket) => {
  return (dispatch, getState) => {
    const {
      posts
    } = getState();
    if (posts[bucket]) {
      dispatch(getPost(id));
      if (posts[bucket].data && posts[bucket].data.length > 0) {
        const currentPosts = posts[bucket].data;
        const postId = currentPosts.findIndex((e) => e.id == id);
        console.log(currentPosts)
        if (postId < 2) dispatch(getPrevPage(posts[bucket].prev_page_url, bucket))
        if (postId > currentPosts.length - 2) dispatch(getNextPage(posts[bucket].next_page_url, bucket))

        console.log(getState())
        dispatch(getPreview(currentPosts, postId))

      }

    } else {
      console.log("please check your route")
    }
  }
}

const getPreview = (currentPosts, postId) => dispatch => {
  console.log("preview was called")
  let postPreview = [currentPosts[postId - 2], currentPosts[postId - 1], currentPosts[postId], currentPosts[postId + 1], currentPosts[postId + 2]];
  dispatch({
    type: SET_PREVIEW,
    payload: postPreview,
  })
}

export const getNextPage = (url, bucket) => {
  console.log("get next page")
  if (url) {
    axios(url)
      .then(res => {
          dispatchNewer(bucket, res.data)
        }
      )
  }
}


export const getPrevPage = (url, bucket) => {
  if (url) {
    axios(url)
      .then(res => {
          dispatchOlder(bucket, res.data)
        }
      )
  }

}

const dispatchNewer = (bucket, data) => dispatch => {
  let type;
  switch (bucket) {
    case "new":
      type = PREV_NEW_POSTS;
      break;
    case "popular":
      type = PREV_POPULAR_POSTS;
      break;
    case "search":
      type = PREV_SEARCH_POSTS;
      break;
    case "user":
      type = PREV_USER_POSTS;
      break;
    case "favorite":
      type = PREV_FAVORITE_POSTS;
      break;
    default:
      return;
  }
  dispatch({
    type: type,
    payload: data
  })
}
const dispatchOlder = (bucket, data) => dispatch => {
  let type;
  switch (bucket) {
    case "new":
      type = NEXT_NEW_POSTS;
      break;
    case "popular":
      type = NEXT_POPULAR_POSTS;
      break;
    case "search":
      type = NEXT_SEARCH_POSTS;
      break;
    case "user":
      type = NEXT_USER_POSTS;
      break;
    case "favorite":
      type = NEXT_FAVORITE_POSTS;
      break;
    default:
      return;
  }
  dispatch({
    type: type,
    payload: data
  })
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