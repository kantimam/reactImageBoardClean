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
      if (posts[bucket].data && posts[bucket].data.length > 0) {
        dispatch(getPost(id));
        const currentPosts = posts[bucket].data;
        const postId = currentPosts.findIndex((e) => e.id == id);
        if (postId >= 0) {
          /* if the post was found in the current data */

          /* check if the prev page needs to be loaded */
          if (postId < 2) dispatch(getPrevPage(posts[bucket].prev_page_url, currentPosts.length))
          /* check if the next page has to be loaded */
          if (postId > currentPosts.length - 2) dispatch(getNextPage(posts[bucket].next_page_url, currentPosts.length))
        }
        /* if post is not in the data get the page containing the post from backend */
        else return dispatch(getPageWithPost(id, bucket));
      }
      /* if data is empty get page containing the post */
      else return dispatch(getPageWithPost(id, bucket));
    } else {
      console.log("please check your route")
    }
  }
}


const getPageWithPost = (id, bucket) => {
  switch (bucket) {
    case "new":
      getNewPosts(id);
      break;
    case "popular":
      getPopularPosts(id);
      break;
    case "search":
      searchPosts(id);
      break;
    case "user":
      getUserPosts(id);
      break;
    case "favorite":
      getFavoritePosts(id);
      break;
    default:
      return;
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

export const getNextPage = (url, bucket, bucketSize) => {
  console.log("get next page")
  if (url) {
    axios(url)
      .then(res => {
        dispatchNewer(bucket, res.data, bucketSize)
      })
  }
}


export const getPrevPage = (url, bucket, bucketSize) => {
  if (url) {
    axios(url)
      .then(res => {
        dispatchOlder(bucket, res.data, bucketSize)
      })
  }

}

const dispatchNewer = (bucket, data, bucketSize) => dispatch => {
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
    payload: data,
    insertPos: bucketSize
  })
}
const dispatchOlder = (bucket, data, bucketSize) => dispatch => {
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
    payload: data,
    insertPos: bucketSize
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




export const getNewPosts = (postOffset) => dispatch => {
  axios(`${BASEURL}/posts`)
    .then(res =>
      dispatch({
        type: GET_NEW_POSTS,
        payload: res.data
      })
    )
}

export const getPopularPosts = (postOffset) => dispatch => {
  axios(`${BASEURL}/posts`)
    .then(res =>
      dispatch({
        type: GET_NEW_POSTS,
        payload: res.data
      })
    )
}
export const getFavoritePosts = (postOffset) => dispatch => {
  axios(`${BASEURL}/posts`)
    .then(res =>
      dispatch({
        type: GET_NEW_POSTS,
        payload: res.data
      })
    )
}
export const getUserPosts = (postOffset) => dispatch => {
  axios(`${BASEURL}/posts`)
    .then(res =>
      dispatch({
        type: GET_NEW_POSTS,
        payload: res.data
      })
    )
}


export const getNextPosts = (postOffset) => dispatch => {
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