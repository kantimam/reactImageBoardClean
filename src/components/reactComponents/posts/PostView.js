import React, { Component } from 'react'
import PostRating from './postView/PostRating.js'
import PostComments from './postView/PostComments.js'
import PostItem from './PostItem.js';
import CommentForm from './postView/CommentFormTwo.js'
import PostNavigation from './PostNavigation.jsx';
import axios from 'axios';
const BASEURL=`${process.env.REACT_APP_BE_URL}`



export default class PostView extends Component {
  
  constructor(props) {
    super(props)
    this.scrollRef=React.createRef();
    this.img_url='https://img.pr0gramm.com/2019/05/15/159cd1cb97de3843.png'
    this.serverRating=0;

    this.loading=false;

    this.state = {
      post: {},
      postId: this.props.match.params.postId || 0,
      favorite: false,
      vote: 0,
      rating: 0,
      prev: [],
      next: []
    }
  }
  

  componentDidUpdate=()=>{
    /* if loading next or previous post dont listen for route and postId difference to avoid multiple reloads */
    if(!this.loading && this.props.match.params.postId!==this.state.postId){
      console.log("was called")
      this.getCurrentPost(this.props.match.params.postId  || 0)
      if(this.props.match.params.postId>=(this.props.posts[this.props.posts.length-1].id)){
        this.props.loadMore()
      }
    }
    
  }
  componentDidMount(){
    this.getCurrentPost(this.state.postId);
  }

  handleError=(error)=>{
    if(error && error.response && error.response.status===403){
      this.props.loggedOutByServer();
    }
    this.props.history.push('/') 
  }

  getPost=(id, apiPath)=>{
    const path=this.props.token? `/logged${this.props.pathUrl}/${apiPath}/` : `${this.props.pathUrl}/${apiPath}/`;
    const headers=this.props.token?{headers:{"Authorization":`Bearer ${this.props.token}`}}:{};
    return axios(`${BASEURL}${path}${id}`,headers)
    .then(res=>res.data)
  }


  getCurrentPost=(id)=>{
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
    
  }

  getNextPost=()=>{
    this.getPost(this.state.postId, "nextpost")
    .then(post=>{
      this.loading=true;
      this.props.history.push(`/post/${post.id}`) 
      this.setState({
        prev: [{id: this.state.post.id, thumbnail: this.state.post.thumbnail}, this.state.prev[0]],
        post: post,
        favorite: post.users_with_favorite,
        vote:  post.vote,
        rating: post.rating,
        postId: post.id,
        next: [this.state.next[1], post.next] || [],
      },()=>this.loading=false)
        this.serverRating=post.rating
      }).catch(error=>this.handleError(error))
    
  }

  getPrevPost=()=>{
    this.getPost(this.state.postId, "prevpost")
    .then(post=>{
      /* lock any further calls */
      this.loading=true;
      this.props.history.push(`/post/${post.id}`) 
      this.setState({
        next: [{id: this.state.post.id, thumbnail: this.state.post.thumbnail}, this.state.next[0]],
        post:post,
        favorite: post.users_with_favorite,
        vote:  post.vote,
        rating: post.rating,
        postId: post.id,
        prev: [this.state.prev[1], post.prev] || []
      },()=>this.loading=false)  //unlock further calls
        this.serverRating=post.rating
      }).catch(error=>this.handleError(error))
    
  }


  toggleFavorite=()=>{
    const id=this.state.postId;
    if(id && this.props.token){
      const headers={headers:{"Authorization":`Bearer ${this.props.token}`}};
      axios(`${BASEURL}${"/logged/favorite/"}${id}`,headers)
      .then(()=>{
        this.setState({
          favorite: !this.state.favorite
        })  
      }   
      ).catch(error=>{
        console.log(error)
      })
    }
  }

  ratePost=(vote)=>{
    const id=this.state.postId;
    if(id && this.props.token){
      const headers={headers:{"Authorization":`Bearer ${this.props.token}`}};
      const likeDislike=vote===1? "like" : "dislike";
      console.log(likeDislike)
      axios(`${BASEURL}/logged/${likeDislike}/${id}`,headers)
      .then((response)=>{
        console.log("vote"+this.state.vote, "serverrating"+this.serverRating, "staterating"+this.state.rating)
        this.setState({
          rating: (this.state.rating-this.state.vote)+response.data,
          vote: response.data

        })  
      }   
      ).catch(error=>{
        console.log(error)
      })
    }
  }

  
    
  render() {
    const {/* posts, */openFull,pathUrl,/* searchByTag, */ history,token}=this.props;
    const currentImage=this.state.post?this.state.post.resourceurl:"";
    const postPreview=[this.state.prev[1],this.state.prev[0], {id: this.state.post.id, thumbnail: this.state.post.thumbnail},this.state.next[0],this.state.next[1]]
    return (
        <div ref={this.scrollRef} className={`postView`}>
          <section id='postFeedSmall'>
              {postPreview.map((post, index)=>
                (post&&post.id)?
                <PostItem 
                  index={index} 
                  key={`preview${post.id}${index}`} 
                  post={post}
                  pathUrl={pathUrl}
                />:<div key={`preview${index}placeholder`}/>
                )
              }
          </section>
          {this.state.post.id&&
          <div className={'imageWrapper'}>
            <img alt='no img' src={currentImage}/>

            {/* button to show image in full screen */}
            <div onClick={()=>openFull(currentImage)} className={'fullScreenButton'}>
              <i className="material-icons">
                crop_free
              </i>
            </div>

            <PostNavigation 
              getNextPost={this.getNextPost}
              getPrevPost={this.getPrevPost}
              next={this.state.next[0]}
              prev={this.state.prev[0]}
            />
          </div>}
          
          <PostRating 
            tags={this.state.post.tags}
            token={token}
            postId={this.state.postId}
            rating={this.state.rating}
            vote={this.state.vote}
            favorite={this.state.favorite}
            toggleFavorite={this.toggleFavorite}
            ratePost={this.ratePost}
            /* searchByTag={searchByTag} */
            history={history}
          />
          
          <CommentForm 
            currentPost={this.state.post.id}
            refreshPost={()=>this.getPost(this.state.postId)}
            token={token}
          />
          <PostComments 
            comments={this.state.post.comments}
            postId={this.state.postId}
          />

        </div>     
 
        
    )
  }
}
