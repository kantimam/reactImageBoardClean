import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions'

import PostRating from './postView/PostRating.js'
import PostComments from './postView/PostComments.js'
import CommentForm from './postView/CommentFormTwo.js'
import PostNavigation from './PostNavigation.jsx';
import PostPreview from './PostPreview.jsx';


const PostView = ({ getPost, post }) => {
  const params = useParams();
  useEffect(() => {
    getPost(params.id || 0);
    return () => {

    };
  }, [params])

  return (
    <div className={`postView`}>

      {/* <PostPreview
      next={this.state.next}
      prev={this.state.prev}
      post={this.state.post}
    /> */}

      {
        <div className={'imageWrapper'}>
          {<img alt='no img' src={post.resourceurl} />}

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

export default connect(mapStateToProps, { getPost })(PostView)



