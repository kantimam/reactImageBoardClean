import {
  GET_POST,
  GET_POSTS,
  GET_NEW_POSTS,
  SEARCH_POSTS,

  SET_PREVIEW,

  LOAD_NEXT_PAGE,
  LOAD_PREV_PAGE
} from './types';
import axios from 'axios';
const BASEURL = process.env.REACT_APP_BE_URL



export const getPostWithPreview = (id, bucket) => {
  return (dispatch, getState) => {
    const {
      posts
    } = getState();
    const postBucket = `${bucket}Posts`
    if (posts[postBucket]) {
      dispatch(getPost(id));
      if (posts[postBucket] && posts[postBucket].length > 0) {
        const currentPosts = posts[postBucket];
        const postId = currentPosts.findIndex((e) => e.id == id);
        if (postId >= 0) {
          /* if the post was found in the current data */

          /* check if the prev page needs to be loaded */
          /* if (postId < 2) dispatch(getPrevPage(posts[bucket].prev_page_url)) */
          /* check if the next page has to be loaded */
          /* if (postId > currentPosts.length - 2) dispatch(getNextPage(posts[bucket].next_page_url)) */
        }
        /* if post is not in the data get the page containing the post from backend */
        else return dispatch(getPosts(bucket, bucket, id));
      }
      /* if data is empty get page containing the post */
      else return dispatch(getPosts(bucket, bucket, id));
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

export const getNextPage = (url, bucket) => dispatch => {
  console.log("get next page")
  if (url) {
    axios(url)
      .then(res => {
        dispatch({
          type: LOAD_NEXT_PAGE,
          bucket: bucket,
          payload: res.data,
        })
      })
  }
}


export const getPrevPage = (url, bucket) => dispatch => {
  if (url) {
    axios(url)
      .then(res => {
        dispatch({
          type: LOAD_PREV_PAGE,
          bucket: bucket,
          payload: res.data,
        })
      })
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
}

export const getPosts = (url, bucket, postOffset) => dispatch => {
  axios(url)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        bucket: bucket,
        payload: res.data
      })
    )
}


export const getNewPosts = (postOffset) => dispatch => {
  dispatch(getPosts(`${BASEURL}/posts/new`, "new", postOffset));
}

export const getPopularPosts = (postOffset) => dispatch => {
  dispatch(getPosts(`${BASEURL}/posts/popular`, "popular", postOffset));
}
export const getFavoritePosts = (postOffset) => dispatch => {
  dispatch(getPosts(`${BASEURL}/posts/favorite`, "favorite", postOffset));
}
export const getUserPosts = (postOffset) => dispatch => {
  dispatch(getPosts(`${BASEURL}/posts/user`, "user", postOffset));
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