import { GET_POST, GET_NEW_POSTS } from './types';
import axios from 'axios';
const BASEURL = `${process.env.REACT_APP_BE_URL}`

export const getPost = (id) => dispatch => {
    console.log("fet")
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

export function getNewPosts() {

}

export function getUserPosts() {

}