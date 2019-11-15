import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostWithPreview } from '../../actions/postActions'

import PostRating from './postView/PostRating.js'
import PostComments from './postView/PostComments.js'
import CommentForm from './postView/CommentFormTwo.js'
import PostNavigation from './PostNavigation.jsx';
import PostPreview from './PostPreview.jsx';
import Loading from '../loading';


const PostView = ({ post, getPostWithPreview }) => {
  const [loading, setLoad]=useState(false);
  const params = useParams();
  useEffect(() => {
    getPostWithPreview(params.id || 0, "new");
    return () => {

    };
  }, [params])

  
  if(!post || post.id!=params.id) return <Loading/>
  
  return (
    <div className={`postView`}>

      {/* <PostPreview
      next={this.state.next}
      prev={this.state.prev}
      post={this.state.post}
    /> */}

      {
        <div className={'imageWrapper'}>
          <img alt='no img' src={post.resourceurl}/>
          <div /* onClick={()=>openFull(currentImage)} */ className={'fullScreenButton'}>
            <i className="material-icons">
              crop_free
        </i>
          </div>

          {/* <PostNavigation 
        getNextPost={this.getNextPost}
        getPrevPost={this.getPrevPost}
        next={this.state.next[0]}
        prev={this.state.prev[0]}
      /> */}
        </div>}

      {/* <PostRating 
      tags={this.state.post.tags}
      token={token}
      postId={this.state.postId}
      rating={this.state.rating}
      vote={this.state.vote}
      favorite={this.state.favorite}
      toggleFavorite={this.toggleFavorite}
      ratePost={this.ratePost}
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
    /> */}

    </div>
  )
}

const mapStateToProps = state => ({
  post: state.posts.current
});

export default connect(mapStateToProps, { getPostWithPreview })(PostView)



