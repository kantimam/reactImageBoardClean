import {
  GET_POST,
  GET_NEW_POSTS,
  SEARCH_POSTS
} from './types';
import axios from 'axios';
const BASEURL = process.env.REACT_APP_BE_URL

export const getPost = (id) => dispatch => {
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

export function getUserPosts(bucket, id) {
  return (dispatch, getState)=>{
    const {posts}=getState();
    if(posts[bucket] && posts[bucket].data && posts[bucket].data.length>0){
      const currentPosts=posts[bucket].data;
      const postId=currentPosts.findIndex((e)=>e.id===id);
      const postPreview=[currentPosts[postId-2],currentPosts[postId-1],currentPosts[postId],currentPosts[postId+1],currentPosts[postId+2]];

      console.log(postPreview, "/posts/id/nextPage")
    }
  }
}

export const searchPosts = (searchString, searchUrl = "search") => dispatch => {
  axios.get(`${BASEURL}/posts/${searchUrl}/${searchString}`)
    .then(res =>
      dispatch({
        type: SEARCH_POSTS,
        payload: res.data
      }))
}